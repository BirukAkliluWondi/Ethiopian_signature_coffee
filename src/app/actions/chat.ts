"use server";

import { supabase } from "@/lib/supabase";
import { isAdminAuthenticated } from "./admin-auth";

/**
 * Get or create a chat thread for a visitor identified by their local visitorToken
 */
export async function getOrCreateVisitorThreadAction(
  visitorToken: string,
  name?: string,
  contact?: string
) {
  try {
    if (!supabase) return { success: false, error: "Database not configured." };
    if (!visitorToken) return { success: false, error: "Missing visitor token." };

    // Check for existing thread
    const { data: existing, error: findError } = await supabase
      .from("chat_threads")
      .select("*")
      .eq("visitor_token", visitorToken)
      .maybeSingle();

    if (findError) throw findError;

    if (existing) {
      // Update contact details if newly provided
      if (name || contact) {
        const updatePayload: Record<string, string> = {};
        if (name) updatePayload.visitor_name = name.trim();
        if (contact) updatePayload.visitor_contact = contact.trim();

        await supabase
          .from("chat_threads")
          .update(updatePayload)
          .eq("id", existing.id);
      }
      return { success: true, thread: existing };
    }

    // Insert new thread
    const { data: newThread, error: insertError } = await supabase
      .from("chat_threads")
      .insert([
        {
          visitor_token: visitorToken,
          visitor_name: name ? name.trim() : null,
          visitor_contact: contact ? contact.trim() : null,
          status: "open",
          last_message_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (insertError) throw insertError;
    return { success: true, thread: newThread };
  } catch (err: unknown) {
    console.error("Error managing visitor thread:", err);
    return { success: false, error: "Unable to initialize chat session." };
  }
}

/**
 * Get all messages for a visitor thread
 */
export async function getThreadMessagesAction(visitorToken: string) {
  try {
    if (!supabase) return { success: false, messages: [] };

    const { data: thread } = await supabase
      .from("chat_threads")
      .select("id")
      .eq("visitor_token", visitorToken)
      .maybeSingle();

    if (!thread) return { success: true, messages: [] };

    const { data: messages, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("thread_id", thread.id)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return { success: true, messages: messages || [] };
  } catch (err: unknown) {
    console.error("Error loading chat messages:", err);
    return { success: false, messages: [] };
  }
}

/**
 * Dispatch a message from a website visitor
 */
export async function sendVisitorMessageAction(
  visitorToken: string,
  content: string,
  name?: string,
  contact?: string
) {
  try {
    if (!supabase) return { success: false, error: "Database unavailable." };
    if (!content || !content.trim()) {
      return { success: false, error: "Message cannot be empty." };
    }

    const threadRes = await getOrCreateVisitorThreadAction(visitorToken, name, contact);
    if (!threadRes.success || !threadRes.thread) {
      return { success: false, error: "Failed to establish thread." };
    }

    const threadId = threadRes.thread.id;

    const { error: msgErr } = await supabase.from("chat_messages").insert([
      {
        thread_id: threadId,
        sender_type: "visitor",
        content: content.trim(),
        is_read: false,
      },
    ]);

    if (msgErr) throw msgErr;

    // Update last_message_at and set status to open
    await supabase
      .from("chat_threads")
      .update({
        last_message_at: new Date().toISOString(),
        status: "open",
      })
      .eq("id", threadId);

    return { success: true };
  } catch (err: unknown) {
    console.error("Error sending visitor message:", err);
    return { success: false, error: "Could not send message." };
  }
}

/**
 * Admin: Fetch all chat threads with their message counts
 */
export async function getAdminChatThreadsAction() {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, data: [] };
    if (!supabase) return { success: false, data: [] };

    const { data: threads, error } = await supabase
      .from("chat_threads")
      .select("*, chat_messages(id, content, sender_type, is_read, created_at)")
      .order("last_message_at", { ascending: false });

    if (error) throw error;

    const formatted = (threads || []).map((t) => {
      const msgs = t.chat_messages || [];
      const unread = msgs.filter((m: { sender_type: string; is_read: boolean }) => m.sender_type === "visitor" && !m.is_read).length;
      const latestMsg = msgs.sort(
        (a: { created_at: string }, b: { created_at: string }) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0];

      return {
        id: t.id,
        visitor_name: t.visitor_name || "Guest Visitor",
        visitor_contact: t.visitor_contact,
        status: t.status,
        last_message_at: t.last_message_at,
        created_at: t.created_at,
        unread_count: unread,
        latest_message: latestMsg?.content || "No messages yet",
      };
    });

    return { success: true, data: formatted };
  } catch (err: unknown) {
    console.error("Error fetching admin chat threads:", err);
    return { success: false, data: [] };
  }
}

/**
 * Admin: Fetch conversation messages for a specific thread
 */
export async function getAdminThreadMessagesAction(threadId: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, messages: [] };
    if (!supabase) return { success: false, messages: [] };

    // Mark visitor messages as read
    await supabase
      .from("chat_messages")
      .update({ is_read: true })
      .eq("thread_id", threadId)
      .eq("sender_type", "visitor");

    const { data: messages, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("thread_id", threadId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return { success: true, messages: messages || [] };
  } catch (err: unknown) {
    console.error("Error fetching thread messages for admin:", err);
    return { success: false, messages: [] };
  }
}

/**
 * Admin: Dispatch a reply message to a thread
 */
export async function sendAdminReplyAction(threadId: string, content: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };
    if (!content || !content.trim()) {
      return { success: false, error: "Reply cannot be empty." };
    }

    const { error: msgErr } = await supabase.from("chat_messages").insert([
      {
        thread_id: threadId,
        sender_type: "admin",
        content: content.trim(),
        is_read: true,
      },
    ]);

    if (msgErr) throw msgErr;

    // Update last_message_at
    await supabase
      .from("chat_threads")
      .update({
        last_message_at: new Date().toISOString(),
        status: "pending", // Waiting on visitor
      })
      .eq("id", threadId);

    return { success: true };
  } catch (err: unknown) {
    console.error("Error sending admin reply:", err);
    return { success: false, error: "Could not send reply." };
  }
}
