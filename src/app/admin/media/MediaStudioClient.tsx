"use client";

import { useState, useTransition, useRef } from "react";
import {
  uploadMediaFileAction,
  updateMediaSlotAction,
} from "@/app/actions/admin-cms";

interface MediaSlot {
  id: string;
  slot_key: string;
  section: string;
  title: string;
  image_url: string;
  alt_text: string;
  updated_at: string;
}

export default function MediaStudioClient({
  initialSlots,
}: {
  initialSlots: MediaSlot[];
}) {
  const [slots, setSlots] = useState<MediaSlot[]>(initialSlots);
  const [activeSlot, setActiveSlot] = useState<MediaSlot | null>(null);
  const [customUrl, setCustomUrl] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [customAlt, setCustomAlt] = useState("");
  const [uploadFeedback, setUploadFeedback] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sections = ["all", "hero", "services", "catering"];
  const [selectedSection, setSelectedSection] = useState("all");

  const filteredSlots = slots.filter(
    (s) => selectedSection === "all" || s.section === selectedSection
  );

  const handleOpenSlot = (slot: MediaSlot) => {
    setActiveSlot(slot);
    setCustomUrl(slot.image_url);
    setCustomTitle(slot.title);
    setCustomAlt(slot.alt_text);
    setUploadFeedback({ type: null, message: "" });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadFeedback({ type: null, message: "" });

    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadMediaFileAction(formData);
    setIsUploading(false);

    if (res.success && res.url) {
      setCustomUrl(res.url);
      setUploadFeedback({
        type: "success",
        message: `File uploaded successfully to local storage: ${res.url}`,
      });
    } else {
      setUploadFeedback({
        type: "error",
        message: res.error || "Failed to upload file.",
      });
    }
  };

  const handleSaveSlot = () => {
    if (!activeSlot || !customUrl.trim()) return;

    startTransition(async () => {
      const res = await updateMediaSlotAction(
        activeSlot.slot_key,
        customUrl.trim(),
        customTitle.trim(),
        customAlt.trim()
      );

      if (res.success) {
        setSlots((prev) =>
          prev.map((s) =>
            s.slot_key === activeSlot.slot_key
              ? {
                  ...s,
                  image_url: customUrl.trim(),
                  title: customTitle.trim() || s.title,
                  alt_text: customAlt.trim() || s.alt_text,
                  updated_at: new Date().toISOString(),
                }
              : s
          )
        );
        setActiveSlot(null);
      } else {
        setUploadFeedback({
          type: "error",
          message: res.error || "Failed to save media slot.",
        });
      }
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Standalone Upload Box */}
      <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-white">
            Upload Pictures to Local Server Storage
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            Upload high-resolution photography directly into <code className="text-brand-yellow font-mono text-[11px]">/public/uploads/</code> for website publishing.
          </p>
        </div>

        <div>
          <input
            ref={fileInputRef}
            accept=".jpg,.jpeg,.png,.webp,.mp4"
            className="hidden"
            type="file"
            onChange={handleFileUpload}
          />
          <button
            className="px-5 py-2.5 rounded-xl bg-brand-yellow hover:bg-brand-yellow-light text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-cozy flex items-center gap-2 active:scale-95 disabled:opacity-50"
            disabled={isUploading}
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="material-symbols-outlined text-base">cloud_upload</span>
            <span>{isUploading ? "Uploading..." : "Upload New File"}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-800">
        {sections.map((sec) => (
          <button
            key={sec}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              selectedSection === sec
                ? "bg-brand-green text-white border-brand-green shadow-cozy-sm"
                : "bg-stone-900 text-stone-400 border-stone-800 hover:text-white"
            }`}
            type="button"
            onClick={() => setSelectedSection(sec)}
          >
            <span>{sec}</span>
          </button>
        ))}
      </div>

      {/* Media Slots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSlots.map((slot) => {
          const isSlide0 = slot.slot_key === "hero_slide_0";

          return (
            <div
              key={slot.id}
              className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden flex flex-col justify-between group hover:border-brand-yellow/50 transition-all shadow-sm"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-video w-full bg-stone-950 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={slot.alt_text}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={slot.image_url}
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-stone-950/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-brand-yellow border border-white/10">
                  {slot.section}
                </div>
                {isSlide0 && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-emerald-900/90 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                    Pristine Baseline Protected
                  </div>
                )}
              </div>

              {/* Slot Details */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-sm text-white group-hover:text-brand-yellow transition-colors">
                    {slot.title}
                  </span>
                  <span className="text-[11px] font-mono text-stone-500 truncate mt-0.5">
                    {slot.slot_key}
                  </span>
                </div>

                <div className="text-[11px] text-stone-400 truncate">
                  <span className="text-stone-500">Current URL: </span>
                  <span className="text-stone-300 font-mono">{slot.image_url}</span>
                </div>

                <button
                  className="mt-2 w-full py-2.5 rounded-xl border border-stone-700 hover:border-brand-yellow hover:text-brand-yellow text-stone-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2 active:scale-95"
                  type="button"
                  onClick={() => handleOpenSlot(slot)}
                >
                  <span className="material-symbols-outlined text-base">edit</span>
                  <span>Edit &amp; Change Image</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Slot Modal */}
      {activeSlot && (
        <div
          aria-labelledby="edit-slot-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
        >
          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-yellow font-bold">
                  Media Assignment
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-0.5" id="edit-slot-title">
                  {activeSlot.title}
                </h3>
              </div>
              <button
                aria-label="Close dialog"
                className="w-8 h-8 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center"
                type="button"
                onClick={() => setActiveSlot(null)}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {uploadFeedback.message && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                  uploadFeedback.type === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                    : "bg-red-500/10 border border-red-500/30 text-red-400"
                }`}
              >
                <span className="material-symbols-outlined text-base shrink-0">
                  {uploadFeedback.type === "success" ? "check_circle" : "error"}
                </span>
                <span>{uploadFeedback.message}</span>
              </div>
            )}

            {/* Current Image Preview */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-stone-950 border border-stone-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Preview"
                className="w-full h-full object-cover"
                src={customUrl || activeSlot.image_url}
              />
            </div>

            {/* Upload or URL Inputs */}
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="text-stone-300 font-semibold" htmlFor="custom-url-input">
                  Image Path or URL
                </label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-3 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white font-mono outline-none focus:border-brand-yellow"
                    id="custom-url-input"
                    placeholder="/uploads/my-photo.jpg or https://..."
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                  />
                  <button
                    className="px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs border border-stone-700 shrink-0 flex items-center gap-1.5"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span className="material-symbols-outlined text-sm">upload_file</span>
                    <span>Browse</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-stone-300 font-semibold" htmlFor="custom-title-input">
                  Display Title
                </label>
                <input
                  className="px-3 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white outline-none focus:border-brand-yellow"
                  id="custom-title-input"
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-stone-300 font-semibold" htmlFor="custom-alt-input">
                  Alt Accessibility Text
                </label>
                <input
                  className="px-3 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white outline-none focus:border-brand-yellow"
                  id="custom-alt-input"
                  type="text"
                  value={customAlt}
                  onChange={(e) => setCustomAlt(e.target.value)}
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-2 border-t border-stone-800">
              <button
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
                type="button"
                onClick={() => setActiveSlot(null)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2.5 rounded-xl bg-brand-yellow hover:bg-brand-yellow-light text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
                disabled={isPending || !customUrl.trim()}
                type="button"
                onClick={handleSaveSlot}
              >
                <span>{isPending ? "Publishing..." : "Publish to Site"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
