import { supabase } from "@/lib/supabase";

export interface DashboardDataSnapshot {
  inquiries: {
    total: number;
    newCount: number;
    contactedCount: number;
    scheduledCount: number;
    recent: Array<{
      id: string;
      fullName: string;
      phone: string;
      service: string;
      status: string;
      date: string;
      notes?: string;
    }>;
  };
  programs: {
    total: number;
    list: Array<{
      id: string;
      title: string;
      level: string;
      duration: string;
      tuition: number;
    }>;
  };
  cohorts: {
    totalActive: number;
    list: Array<{
      id: string;
      sessionTime: string;
      startDate: string;
      endDate: string;
      seatsBooked: number;
      seatsTotal: number;
      status: string;
    }>;
  };
  enrollments: {
    total: number;
    pendingCount: number;
    confirmedCount: number;
    recent: Array<{
      id: string;
      studentName: string;
      phone: string;
      courseLevel: string;
      organization?: string;
      experience?: string;
      status: string;
      date: string;
    }>;
  };
  packages: {
    total: number;
    list: Array<{
      id: string;
      title: string;
      category: string;
      price: number;
      pricingModel: string;
      timeline: string;
    }>;
  };
  serviceBookings: {
    total: number;
    newCount: number;
    contactedCount: number;
    recent: Array<{
      id: string;
      clientName: string;
      phone: string;
      businessName: string;
      venueLocation: string;
      targetTimeline: string;
      status: string;
      date: string;
      notes?: string;
    }>;
  };
  timestamp: string;
}

/**
 * Fetches real-time operational data across all admin entities.
 */
export async function getLiveDashboardDataSnapshot(): Promise<DashboardDataSnapshot | null> {
  if (!supabase) return null;

  try {
    const [inqRes, progRes, schedRes, enrollRes, pkgRes, bookRes] = await Promise.all([
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(20),
      supabase.from("training_programs").select("*").order("display_order", { ascending: true }),
      supabase.from("training_schedules").select("*").order("start_date", { ascending: true }),
      supabase.from("academy_enrollments").select("*").order("created_at", { ascending: false }).limit(20),
      supabase.from("service_packages").select("*").order("created_at", { ascending: false }),
      supabase.from("service_bookings").select("*").order("created_at", { ascending: false }).limit(20),
    ]);

    const inquiries = inqRes.data || [];
    const programs = progRes.data || [];
    const schedules = schedRes.data || [];
    const enrollments = enrollRes.data || [];
    const packages = pkgRes.data || [];
    const bookings = bookRes.data || [];

    const newInquiries = inquiries.filter((i) => !i.status || i.status === "new" || i.status === "open").length;
    const contactedInquiries = inquiries.filter((i) => i.status === "contacted").length;
    const scheduledInquiries = inquiries.filter((i) => i.status === "scheduled").length;

    const pendingEnrollments = enrollments.filter((e) => !e.status || e.status === "pending").length;
    const confirmedEnrollments = enrollments.filter((e) => e.status === "confirmed").length;

    const newBookings = bookings.filter((b) => !b.status || b.status === "new" || b.status === "pending").length;
    const contactedBookings = bookings.filter((b) => b.status === "contacted").length;

    return {
      inquiries: {
        total: inquiries.length,
        newCount: newInquiries,
        contactedCount: contactedInquiries,
        scheduledCount: scheduledInquiries,
        recent: inquiries.slice(0, 5).map((i) => ({
          id: i.id,
          fullName: i.full_name || "Unknown",
          phone: i.phone || "",
          service: i.service || "General Inquiry",
          status: i.status || "new",
          date: i.created_at ? new Date(i.created_at).toLocaleDateString() : "",
          notes: i.notes || "",
        })),
      },
      programs: {
        total: programs.length,
        list: programs.map((p) => ({
          id: p.id,
          title: p.title || "",
          level: p.level || "",
          duration: p.duration || "",
          tuition: Number(p.tuition_etb) || 0,
        })),
      },
      cohorts: {
        totalActive: schedules.filter((s) => s.status !== "closed").length,
        list: schedules.map((s) => ({
          id: s.id,
          sessionTime: s.session_time || "",
          startDate: s.start_date || "",
          endDate: s.end_date || "",
          seatsBooked: Number(s.seats_booked) || 0,
          seatsTotal: Number(s.seats_total) || 8,
          status: s.status || "open",
        })),
      },
      enrollments: {
        total: enrollments.length,
        pendingCount: pendingEnrollments,
        confirmedCount: confirmedEnrollments,
        recent: enrollments.slice(0, 5).map((e) => ({
          id: e.id,
          studentName: e.student_name || "Student",
          phone: e.phone || "",
          courseLevel: e.course_level || "",
          organization: e.organization || "",
          experience: e.experience_level || "",
          status: e.status || "pending",
          date: e.created_at ? new Date(e.created_at).toLocaleDateString() : "",
        })),
      },
      packages: {
        total: packages.length,
        list: packages.map((p) => ({
          id: p.id,
          title: p.title || "",
          category: p.category || "",
          price: Number(p.price_etb) || 0,
          pricingModel: p.pricing_model || "fixed",
          timeline: p.timeline || "",
        })),
      },
      serviceBookings: {
        total: bookings.length,
        newCount: newBookings,
        contactedCount: contactedBookings,
        recent: bookings.slice(0, 5).map((b) => ({
          id: b.id,
          clientName: b.client_name || "Client",
          phone: b.phone || "",
          businessName: b.business_name || "",
          venueLocation: b.venue_location || "",
          targetTimeline: b.target_timeline || "",
          status: b.status || "pending",
          date: b.created_at ? new Date(b.created_at).toLocaleDateString() : "",
          notes: b.notes || "",
        })),
      },
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  } catch (err) {
    console.error("Error generating live dashboard data snapshot:", err);
    return null;
  }
}

/**
 * Converts the live snapshot into a structured markdown executive summary.
 */
export function formatLiveDashboardSummaryText(snapshot: DashboardDataSnapshot): string {
  const { inquiries, programs, cohorts, enrollments, packages, serviceBookings, timestamp } = snapshot;

  const urgentItems: string[] = [];
  if (inquiries.newCount > 0) {
    urgentItems.push(`**${inquiries.newCount} New Contact Inquiry(s)** awaiting response`);
  }
  if (serviceBookings.newCount > 0) {
    urgentItems.push(`**${serviceBookings.newCount} Pending Service Booking(s)** awaiting review`);
  }
  if (enrollments.pendingCount > 0) {
    urgentItems.push(`**${enrollments.pendingCount} Pending Student Registration(s)** to confirm`);
  }

  const urgentSection =
    urgentItems.length > 0
      ? `### ⚠️ Immediate Action Items:\n${urgentItems.map((item) => `- ${item}`).join("\n")}\n\n`
      : `### ✅ Status: All client inquiries and applications are up to date!\n\n`;

  let recentLeadsText = "";
  if (inquiries.recent.length > 0) {
    recentLeadsText = `#### 📩 Recent Contact Inquiries (${inquiries.total} Total, ${inquiries.newCount} New):
${inquiries.recent
  .map(
    (i) =>
      `- **${i.fullName}** (${i.phone || "No phone"}) — *${i.service}* [Status: \`${i.status.toUpperCase()}\`]${
        i.notes ? `\n  > "${i.notes.slice(0, 90)}${i.notes.length > 90 ? "..." : ""}"` : ""
      }`
  )
  .join("\n")}\n\n`;
  }

  let recentBookingsText = "";
  if (serviceBookings.recent.length > 0) {
    recentBookingsText = `#### 💼 Recent Service Bookings (${serviceBookings.total} Total, ${serviceBookings.newCount} Pending):
${serviceBookings.recent
  .map(
    (b) =>
      `- **${b.clientName}** (${b.phone || "No phone"})${b.businessName ? ` — *${b.businessName}*` : ""}${
        b.venueLocation ? ` in ${b.venueLocation}` : ""
      } [Status: \`${b.status.toUpperCase()}\`]${b.targetTimeline ? ` (Timeline: ${b.targetTimeline})` : ""}`
  )
  .join("\n")}\n\n`;
  }

  let recentStudentsText = "";
  if (enrollments.recent.length > 0) {
    recentStudentsText = `#### 🎓 Registered Students (${enrollments.total} Total, ${enrollments.pendingCount} Pending):
${enrollments.recent
  .map(
    (e) =>
      `- **${e.studentName}** (${e.phone || "No phone"}) — Course: *${e.courseLevel || "Specialty Course"}* [Status: \`${e.status.toUpperCase()}\`]`
  )
  .join("\n")}\n\n`;
  }

  let cohortsText = "";
  if (cohorts.list.length > 0) {
    const totalBooked = cohorts.list.reduce((acc, c) => acc + c.seatsBooked, 0);
    const totalCapacity = cohorts.list.reduce((acc, c) => acc + c.seatsTotal, 0);
    cohortsText = `#### 📅 Academy Cohort Capacity (${cohorts.totalActive} Active Sessions | ${totalBooked}/${totalCapacity} Total Seats Booked):
${cohorts.list
  .map(
    (c) =>
      `- **${c.sessionTime || "Daily Session"}** (${c.startDate} to ${c.endDate}): **${c.seatsBooked} / ${c.seatsTotal}** seats booked [\`${c.status.toUpperCase()}\`]`
  )
  .join("\n")}\n\n`;
  }

  let offeringsText = "";
  if (packages.list.length > 0 || programs.list.length > 0) {
    offeringsText = `#### 🏷️ Active Offerings & Pricing Catalog:
- **Commercial Service Packages (${packages.total})**:
${packages.list.map((p) => `  • **${p.title}** (${p.category}) — ${p.pricingModel === "fixed" ? "" : "Starting from "}${p.price.toLocaleString()} ETB [${p.timeline}]`).join("\n")}
- **Barista Academy Courses (${programs.total})**:
${programs.list.map((p) => `  • **${p.title}** (${p.level}) — ${p.tuition.toLocaleString()} ETB [${p.duration}]`).join("\n")}\n`;
  }

  return `### 📊 Live Executive Dashboard Summary (Updated at ${timestamp})

${urgentSection}${recentLeadsText}${recentBookingsText}${recentStudentsText}${cohortsText}${offeringsText}
---
*Reply with any client name or inquiry to see more details, or ask how to update their status or export to Excel!*`;
}

/**
 * Checks if a user's prompt is asking for a summary, overview, or report on dashboard data.
 */
export function isSummaryRequest(query: string): boolean {
  const q = query.toLowerCase();
  const summaryTriggers = [
    "summarize",
    "summary",
    "overview",
    "briefing",
    "dashboard data",
    "what's happening",
    "what is happening",
    "recent activity",
    "how many leads",
    "how many inquiries",
    "how many students",
    "how many bookings",
    "what needs attention",
    "action items",
    "status report",
    "give me a report",
    "daily report",
    "executive summary",
    "who applied",
    "show all data",
    "data report",
  ];
  return summaryTriggers.some((t) => q.includes(t));
}
