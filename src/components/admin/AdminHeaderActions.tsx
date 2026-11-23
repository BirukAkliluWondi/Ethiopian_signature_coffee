"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getAdminNotificationsAction,
  AdminNotification,
} from "@/app/actions/admin-cms";

export default function AdminHeaderActions() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifTab, setNotifTab] = useState<"all" | "new">("all");
  const [, startTransition] = useTransition();

  const filterRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Fetch real-time notifications on mount
  useEffect(() => {
    let isMounted = true;
    startTransition(async () => {
      const res = await getAdminNotificationsAction();
      if (isMounted && res.success) {
        setNotifications(res.notifications);
        setUnreadCount(res.unreadCount);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFilterOpen(false);
        setIsNotifOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMarkAllAsRead = () => {
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, isNew: false })));
  };

  const handleQuickSearch = (targetPath: "/admin/leads" | "/admin/training") => {
    if (!filterSearch.trim()) return;
    const query = encodeURIComponent(filterSearch.trim());
    setIsFilterOpen(false);
    if (targetPath === "/admin/leads") {
      router.push(`/admin/leads?search=${query}`);
    } else {
      router.push(`/admin/training?tab=applicants&search=${query}`);
    }
  };

  const filteredNotifications =
    notifTab === "new" ? notifications.filter((n) => n.isNew) : notifications;

  return (
    <div className="flex items-center gap-1.5 text-on-surface-variant relative">
      {/* 1. Quick Filters & View Console (Tune Icon) */}
      <div className="relative" ref={filterRef}>
        <button
          aria-expanded={isFilterOpen}
          aria-label="Quick Filters & Search Console"
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${
            isFilterOpen
              ? "bg-stitch-primary text-white shadow-sm ring-2 ring-stitch-primary/20"
              : "bg-surface-container-low text-on-surface-variant hover:text-stitch-primary hover:bg-surface-container"
          }`}
          title="Quick Filters & Workspace Scope"
          type="button"
          onClick={() => {
            setIsFilterOpen(!isFilterOpen);
            setIsNotifOpen(false);
          }}
        >
          <span className="material-symbols-outlined text-[19px]">tune</span>
        </button>

        {/* Quick Filter Popover Menu */}
        {isFilterOpen && (
          <div className="absolute right-0 top-11 w-80 sm:w-96 bg-surface-container-lowest border border-surface-container-highest rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-3.5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-surface-container-highest pb-2.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-stitch-primary text-lg">filter_alt</span>
                <span className="font-serif font-bold text-xs text-stitch-primary">
                  Admin Quick Filters &amp; Search
                </span>
              </div>
              <button
                className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-stitch-primary rounded transition-colors text-xs"
                type="button"
                onClick={() => setIsFilterOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Quick Search Box */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="filter-search-input">
                Universal Client &amp; Record Search
              </label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 pr-8 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface placeholder:text-on-surface-variant/60 outline-none focus:border-stitch-primary"
                  id="filter-search-input"
                  placeholder="Type name, phone, or service..."
                  type="text"
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleQuickSearch("/admin/leads");
                  }}
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-stitch-primary"
                  title="Search Inquiries"
                  type="button"
                  onClick={() => handleQuickSearch("/admin/leads")}
                >
                  <span className="material-symbols-outlined text-base">search</span>
                </button>
              </div>

              {filterSearch.trim() && (
                <div className="flex items-center gap-1.5 pt-1">
                  <button
                    className="flex-1 py-1 px-2 rounded bg-stitch-primary text-white text-[10px] font-bold hover:bg-stitch-primary-container transition-colors"
                    type="button"
                    onClick={() => handleQuickSearch("/admin/leads")}
                  >
                    Search in Inquiries
                  </button>
                  <button
                    className="flex-1 py-1 px-2 rounded bg-surface-container text-on-surface text-[10px] font-bold hover:bg-surface-container-high transition-colors border border-surface-container-highest"
                    type="button"
                    onClick={() => handleQuickSearch("/admin/training")}
                  >
                    Search in Offerings
                  </button>
                </div>
              )}
            </div>

            {/* Quick Status Presets */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                Quick View Presets
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <Link
                  className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center gap-2 transition-colors border border-surface-container-highest group"
                  href="/admin/leads?tab=new"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <span className="material-symbols-outlined text-stitch-primary text-base group-hover:scale-110 transition-transform">
                    mark_email_unread
                  </span>
                  <span className="text-[11px] font-semibold truncate">New Inquiries</span>
                </Link>

                <Link
                  className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center gap-2 transition-colors border border-surface-container-highest group"
                  href="/admin/leads?tab=with_notes"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <span className="material-symbols-outlined text-stitch-secondary text-base group-hover:scale-110 transition-transform">
                    notes
                  </span>
                  <span className="text-[11px] font-semibold truncate">With Notes</span>
                </Link>

                <Link
                  className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center gap-2 transition-colors border border-surface-container-highest group"
                  href="/admin/training?tab=courses"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <span className="material-symbols-outlined text-stitch-primary text-base group-hover:scale-110 transition-transform">
                    school
                  </span>
                  <span className="text-[11px] font-semibold truncate">Training Courses</span>
                </Link>

                <Link
                  className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center gap-2 transition-colors border border-surface-container-highest group"
                  href="/admin/training?tab=services"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <span className="material-symbols-outlined text-stitch-secondary text-base group-hover:scale-110 transition-transform">
                    business_center
                  </span>
                  <span className="text-[11px] font-semibold truncate">Service Packages</span>
                </Link>

                <Link
                  className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center gap-2 transition-colors border border-surface-container-highest group"
                  href="/admin/training?tab=applicants"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <span className="material-symbols-outlined text-stitch-tertiary-fixed-dim text-base group-hover:scale-110 transition-transform">
                    group
                  </span>
                  <span className="text-[11px] font-semibold truncate">All Registrations</span>
                </Link>

                <Link
                  className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center gap-2 transition-colors border border-surface-container-highest group"
                  href="/admin/media"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <span className="material-symbols-outlined text-stitch-primary text-base group-hover:scale-110 transition-transform">
                    photo_library
                  </span>
                  <span className="text-[11px] font-semibold truncate">Photo Studio</span>
                </Link>
              </div>
            </div>

            {/* Filter by Practice Domain */}
            <div className="flex flex-col gap-1.5 pt-1 border-t border-surface-container-highest">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                Filter Inquiries by Service Area
              </span>
              <div className="flex flex-wrap gap-1">
                {[
                  { label: "Turnkey Café Setup", service: "Turnkey Coffee Shop Setup & Organization" },
                  { label: "Barista Academy", service: "Barista Academy & Staff Training" },
                  { label: "Catering Hospitality", service: "Catering Services & Event Hospitality" },
                  { label: "Direct-Trade Sourcing", service: "Green Coffee Sourcing & Export Advisory" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    className="py-1 px-2.5 rounded-md text-[10px] font-semibold bg-surface-container-low hover:bg-stitch-primary hover:text-white text-on-surface-variant transition-colors border border-surface-container-highest"
                    href={`/admin/leads?service=${encodeURIComponent(item.service)}`}
                    onClick={() => setIsFilterOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Live Notification Bell (Notifications Icon) */}
      <div className="relative" ref={notifRef}>
        <button
          aria-expanded={isNotifOpen}
          aria-label={`Notifications (${unreadCount} unread)`}
          className={`w-9 h-9 flex items-center justify-center rounded-lg relative transition-all ${
            isNotifOpen
              ? "bg-stitch-primary text-white shadow-sm ring-2 ring-stitch-primary/20"
              : "bg-surface-container-low text-on-surface-variant hover:text-stitch-primary hover:bg-surface-container"
          }`}
          title="Live Notifications & Alerts"
          type="button"
          onClick={() => {
            setIsNotifOpen(!isNotifOpen);
            setIsFilterOpen(false);
          }}
        >
          <span className="material-symbols-outlined text-[19px]">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-error text-white font-bold text-[10px] flex items-center justify-center px-1 shadow-sm animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Notification Center Popover */}
        {isNotifOpen && (
          <div className="absolute right-0 top-11 w-80 sm:w-96 bg-surface-container-lowest border border-surface-container-highest rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-surface-container-highest pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm text-stitch-primary">Notifications</span>
                {unreadCount > 0 && (
                  <span className="bg-error/10 text-error font-bold text-[10px] px-1.5 py-0.5 rounded">
                    {unreadCount} New
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    className="text-[11px] font-semibold text-stitch-primary hover:underline"
                    type="button"
                    onClick={handleMarkAllAsRead}
                  >
                    Mark read
                  </button>
                )}
                <button
                  className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-stitch-primary rounded transition-colors text-xs"
                  type="button"
                  onClick={() => setIsNotifOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Notification Tabs */}
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
              <button
                className={`flex-1 py-1 rounded text-[11px] font-bold transition-colors ${
                  notifTab === "all"
                    ? "bg-white text-stitch-primary shadow-xs"
                    : "text-on-surface-variant hover:text-stitch-primary"
                }`}
                type="button"
                onClick={() => setNotifTab("all")}
              >
                All ({notifications.length})
              </button>
              <button
                className={`flex-1 py-1 rounded text-[11px] font-bold transition-colors ${
                  notifTab === "new"
                    ? "bg-white text-stitch-primary shadow-xs"
                    : "text-on-surface-variant hover:text-stitch-primary"
                }`}
                type="button"
                onClick={() => setNotifTab("new")}
              >
                Unread ({unreadCount})
              </button>
            </div>

            {/* Notifications List */}
            <div className="max-h-72 overflow-y-auto flex flex-col gap-2 pr-1 scrollbar-thin">
              {filteredNotifications.length === 0 ? (
                <div className="py-8 flex flex-col items-center text-center text-on-surface-variant gap-1.5">
                  <span className="material-symbols-outlined text-3xl text-outline">check_circle</span>
                  <span className="text-xs font-semibold">You&apos;re all caught up!</span>
                  <span className="text-[11px] text-on-surface-variant/70">
                    No unread inquiries or pending student registrations.
                  </span>
                </div>
              ) : (
                filteredNotifications.map((notif) => (
                  <Link
                    key={notif.id}
                    className={`p-2.5 rounded-xl border transition-all flex items-start gap-2.5 group ${
                      notif.isNew
                        ? "bg-stitch-primary-fixed/10 border-stitch-primary-fixed/40 hover:bg-stitch-primary-fixed/20"
                        : "bg-surface-container-low border-surface-container-highest hover:bg-surface-container"
                    }`}
                    href={notif.href}
                    onClick={() => {
                      setIsNotifOpen(false);
                      if (notif.isNew) {
                        setNotifications((prev) =>
                          prev.map((n) => (n.id === notif.id ? { ...n, isNew: false } : n))
                        );
                        setUnreadCount((c) => Math.max(0, c - 1));
                      }
                    }}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        notif.type === "inquiry"
                          ? "bg-stitch-primary text-white"
                          : notif.type === "enrollment"
                          ? "bg-stitch-secondary text-white"
                          : notif.type === "booking"
                          ? "bg-stitch-tertiary-fixed-dim text-white"
                          : "bg-error text-white"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {notif.type === "inquiry"
                          ? "mail"
                          : notif.type === "enrollment"
                          ? "school"
                          : notif.type === "booking"
                          ? "business_center"
                          : "event_busy"}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-xs text-on-surface truncate group-hover:text-stitch-primary transition-colors">
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-on-surface-variant shrink-0 font-medium">
                          {notif.timeAgo}
                        </span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant truncate mt-0.5">
                        {notif.subtitle}
                      </p>
                    </div>

                    {notif.isNew && (
                      <span className="w-2 h-2 rounded-full bg-stitch-primary shrink-0 mt-2" />
                    )}
                  </Link>
                ))
              )}
            </div>

            {/* Quick Links Footer */}
            <div className="pt-2 border-t border-surface-container-highest flex items-center justify-between text-[11px] font-semibold text-stitch-primary">
              <Link
                className="hover:underline flex items-center gap-0.5"
                href="/admin/leads"
                onClick={() => setIsNotifOpen(false)}
              >
                <span>All Messages</span>
                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </Link>
              <Link
                className="hover:underline flex items-center gap-0.5"
                href="/admin/training?tab=applicants"
                onClick={() => setIsNotifOpen(false)}
              >
                <span>All Registrations</span>
                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
