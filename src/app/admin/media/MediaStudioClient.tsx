"use client";

import { useState, useTransition, useRef } from "react";
import Link from "next/link";
import {
  uploadMediaFileAction,
  updateMediaSlotAction,
  revertMediaSlotAction,
  revertSlotToOriginalAction,
  revertAllSlotsToOriginalAction,
} from "@/app/actions/admin-cms";
import { ORIGINAL_MEDIA_BASELINE } from "@/lib/cms-media";

interface MediaSlot {
  id: string;
  slot_key: string;
  section: string;
  title: string;
  image_url: string;
  previous_image_url?: string | null;
  original_image_url?: string | null;
  alt_text: string;
  updated_at: string;
}

interface LibraryAsset {
  id: string;
  name: string;
  category: "ceremony" | "training" | "consulting" | "products" | "catering";
  categoryLabel: string;
  image_url: string;
  desc: string;
}

const DEFAULT_LIBRARY_ASSETS: LibraryAsset[] = [
  {
    id: "lib-1",
    name: "Jebena Clay Steam",
    category: "ceremony",
    categoryLabel: "Ceremony",
    image_url: "/admin/media-jebena-steam.jpg",
    desc: "Traditional Pot • Ready to use",
  },
  {
    id: "lib-2",
    name: "Roasted Pan Coffee",
    category: "products",
    categoryLabel: "Roasting",
    image_url: "/admin/media-roasted-pan.jpg",
    desc: "Origin Beans • Ready to use",
  },
  {
    id: "lib-3",
    name: "Ceremony Tray Sini",
    category: "ceremony",
    categoryLabel: "Heritage",
    image_url: "/admin/media-ceremony-tray.jpg",
    desc: "Porcelain Cups • Ready to use",
  },
  {
    id: "lib-4",
    name: "Café Inventory Log",
    category: "consulting",
    categoryLabel: "Operations",
    image_url: "/admin/slot-setup-service.jpg",
    desc: "Management • Ready to use",
  },
  {
    id: "lib-5",
    name: "Barista Academy Calibration",
    category: "training",
    categoryLabel: "Training",
    image_url: "/admin/slot-academy-barista.jpg",
    desc: "Espresso Calibration • Ready to use",
  },
  {
    id: "lib-6",
    name: "Highland Banquet Spread",
    category: "catering",
    categoryLabel: "Catering",
    image_url: "/catering-services.jpg",
    desc: "Banquet Mesob • Ready to use",
  },
];

export default function MediaStudioClient({
  initialSlots,
}: {
  initialSlots: MediaSlot[];
}) {
  const [slots, setSlots] = useState<MediaSlot[]>(initialSlots);
  const [libraryAssets, setLibraryAssets] = useState<LibraryAsset[]>(DEFAULT_LIBRARY_ASSETS);
  const [activeSlot, setActiveSlot] = useState<MediaSlot | null>(null);
  const [customUrl, setCustomUrl] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [customAlt, setCustomAlt] = useState("");
  const [selectedTag, setSelectedTag] = useState("Hero Ceremony");
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pendingChanges, setPendingChanges] = useState(0);

  const [uploadFeedback, setUploadFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

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
      const newAsset: LibraryAsset = {
        id: "upload-" + Date.now(),
        name: file.name.replace(/\.[^/.]+$/, ""),
        category: "ceremony",
        categoryLabel: selectedTag,
        image_url: res.url,
        desc: "Uploaded from your device",
      };
      setLibraryAssets((prev) => [newAsset, ...prev]);
      setPendingChanges((p) => p + 1);
      showToast(`Uploaded "${file.name}"! You can now assign it below.`);
      setUploadFeedback({
        type: "success",
        message: `File uploaded successfully: ${res.url}`,
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

    const previousUrl = activeSlot.image_url;
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
                  previous_image_url: previousUrl !== customUrl.trim() ? previousUrl : s.previous_image_url,
                  title: customTitle.trim() || s.title,
                  alt_text: customAlt.trim() || s.alt_text,
                  updated_at: new Date().toISOString(),
                }
              : s
          )
        );
        setActiveSlot(null);
        setPendingChanges(0);
        showToast(`Photo for "${activeSlot.title}" has been updated live on your website!`);
      } else {
        setUploadFeedback({
          type: "error",
          message: res.error || "Failed to save media slot.",
        });
      }
    });
  };

  const handleRevertSlot = (slot: MediaSlot) => {
    if (!slot.previous_image_url) return;

    startTransition(async () => {
      const res = await revertMediaSlotAction(slot.slot_key);

      if (res.success && res.restoredUrl) {
        setSlots((prev) =>
          prev.map((s) =>
            s.slot_key === slot.slot_key
              ? {
                  ...s,
                  image_url: res.restoredUrl!,
                  previous_image_url: res.previousUrl || s.image_url,
                  updated_at: new Date().toISOString(),
                }
              : s
          )
        );

        if (activeSlot && activeSlot.slot_key === slot.slot_key) {
          setActiveSlot((prev) =>
            prev
              ? {
                  ...prev,
                  image_url: res.restoredUrl!,
                  previous_image_url: res.previousUrl || prev.image_url,
                }
              : null
          );
          setCustomUrl(res.restoredUrl!);
        }

        showToast(`Reverted "${slot.title}" back to previous photo!`);
      } else {
        showToast(res.error || "Failed to revert photo.");
      }
    });
  };

  const handleRevertSlotToOriginal = (slot: MediaSlot) => {
    startTransition(async () => {
      const res = await revertSlotToOriginalAction(slot.slot_key);

      if (res.success && res.restoredUrl) {
        setSlots((prev) =>
          prev.map((s) =>
            s.slot_key === slot.slot_key
              ? {
                  ...s,
                  image_url: res.restoredUrl!,
                  previous_image_url: res.previousUrl || s.image_url,
                  updated_at: new Date().toISOString(),
                }
              : s
          )
        );

        if (activeSlot && activeSlot.slot_key === slot.slot_key) {
          setActiveSlot((prev) =>
            prev
              ? {
                  ...prev,
                  image_url: res.restoredUrl!,
                  previous_image_url: res.previousUrl || prev.image_url,
                }
              : null
          );
          setCustomUrl(res.restoredUrl!);
        }

        showToast(`Reverted "${slot.title}" back to the original photo!`);
      } else {
        showToast(res.error || "Failed to revert photo to original.");
      }
    });
  };

  const handleRevertAllToOriginal = () => {
    const confirmed = window.confirm(
      "Are you sure you want to revert all website photos back to their pristine original versions? This will reset all hero, catering, and service photos to the original baseline."
    );
    if (!confirmed) return;

    startTransition(async () => {
      const res = await revertAllSlotsToOriginalAction();

      if (res.success) {
        setSlots((prev) =>
          prev.map((s) => {
            const orig = s.original_image_url || ORIGINAL_MEDIA_BASELINE[s.slot_key];
            return orig
              ? {
                  ...s,
                  image_url: orig,
                  previous_image_url: s.image_url !== orig ? s.image_url : s.previous_image_url,
                  updated_at: new Date().toISOString(),
                }
              : s;
          })
        );

        if (activeSlot) {
          const orig = activeSlot.original_image_url || ORIGINAL_MEDIA_BASELINE[activeSlot.slot_key];
          if (orig) {
            setCustomUrl(orig);
            setActiveSlot((prev) =>
              prev
                ? {
                    ...prev,
                    image_url: orig,
                    previous_image_url: prev.image_url !== orig ? prev.image_url : prev.previous_image_url,
                  }
                : null
            );
          }
        }

        showToast("All website photos have been successfully reverted to the original versions!");
      } else {
        showToast(res.error || "Failed to reset photos.");
      }
    });
  };

  const assignAssetToHero = (asset: LibraryAsset) => {
    const heroSlot = slots.find((s) => s.slot_key === "hero_slide_0" || s.section === "hero") || slots[0];
    if (heroSlot) {
      handleOpenSlot(heroSlot);
      setCustomUrl(asset.image_url);
      setCustomTitle(asset.name);
      showToast(`Selected "${asset.name}" for Hero Banner. Click "Publish to Site" to apply.`);
    }
  };

  const assignAssetToSlot = (asset: LibraryAsset) => {
    const availableSlots = slots.filter((s) => s.slot_key !== "hero_slide_0");
    const targetSlot = availableSlots[0] || slots[0];
    if (targetSlot) {
      handleOpenSlot(targetSlot);
      setCustomUrl(asset.image_url);
      setCustomTitle(asset.name);
      showToast(`Selected "${asset.name}" for ${targetSlot.title}. Click "Publish to Site" to apply.`);
    }
  };

  const deleteLibraryAsset = (id: string) => {
    setLibraryAssets((prev) => prev.filter((a) => a.id !== id));
    showToast("Photo removed from library view.");
  };

  const heroSlot = slots.find((s) => s.slot_key === "hero_slide_0" || s.section === "hero") || slots[0];
  const otherSlots = slots.filter((s) => s.id !== heroSlot?.id);

  const filteredLibrary = libraryAssets.filter(
    (a) => galleryFilter === "all" || a.category === galleryFilter
  );

  return (
    <div className="flex flex-col gap-6 w-full relative pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-center text-xs font-semibold animate-fade-in pointer-events-auto flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-[#25D366]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        accept=".jpg,.jpeg,.png,.webp,.mp4"
        className="hidden"
        type="file"
        onChange={handleFileUpload}
      />

      {/* Active Homepage Slots Section */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-[#062b18] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">collections</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Active Website Picture Slots ({slots.length})
              </h2>
              <p className="text-xs text-slate-500">
                Swap live photography or restore pristine factory baselines anytime
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-[#062b18] text-xs font-semibold transition-all border border-slate-200 flex items-center gap-1.5 shadow-2xs"
              disabled={isPending}
              title="Reset all website photos back to their pristine original baseline photos"
              type="button"
              onClick={handleRevertAllToOriginal}
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Revert All to Original</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Slot 01: Hero Banner (Featured Card) */}
          {heroSlot && (
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#062b18]">
                    Slot 1 · Homepage Hero Banner
                  </span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
                  Showing on Homepage
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-0.5">
                {heroSlot.title || "Traditional Coffee Ceremony Banner"}
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Primary visual showcase displayed in the homepage hero section.
              </p>

              {/* Preview Image Container */}
              <div className="relative w-full h-56 sm:h-72 rounded-lg overflow-hidden bg-slate-100 mb-3 group border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={heroSlot.alt_text || "Hero Ceremony"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={heroSlot.image_url}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062b18]/80 via-[#062b18]/15 to-transparent flex items-end p-3">
                  <div className="text-white flex items-center justify-between w-full">
                    <span className="text-xs text-white/90 flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[16px]">aspect_ratio</span>
                      High-Definition Banner
                    </span>
                    <span className="text-[10px] font-bold uppercase bg-[#fbbc0e] text-[#062b18] px-2 py-0.5 rounded">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Slot Actions */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#062b18] text-white rounded-lg text-xs font-semibold hover:bg-[#0b4627] transition-colors shadow-xs"
                  type="button"
                  onClick={() => handleOpenSlot(heroSlot)}
                >
                  <span className="material-symbols-outlined text-base">sync</span>
                  <span>Replace Hero Picture</span>
                </button>

                {heroSlot.previous_image_url && heroSlot.previous_image_url !== heroSlot.image_url && (
                  <button
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-[#062b18] rounded-lg text-xs font-semibold transition-colors border border-slate-200"
                    disabled={isPending}
                    title={`Click to revert to previous image (${heroSlot.previous_image_url})`}
                    type="button"
                    onClick={() => handleRevertSlot(heroSlot)}
                  >
                    <span className="material-symbols-outlined text-base">undo</span>
                    <span>Revert to Previous Photo</span>
                  </button>
                )}

                {heroSlot.image_url !== (heroSlot.original_image_url || ORIGINAL_MEDIA_BASELINE[heroSlot.slot_key]) && (
                  <button
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-amber-700 hover:text-amber-800 rounded-lg text-xs font-semibold transition-colors border border-slate-200"
                    disabled={isPending}
                    title="Revert back to the pristine original baseline photo"
                    type="button"
                    onClick={() => handleRevertSlotToOriginal(heroSlot)}
                  >
                    <span className="material-symbols-outlined text-base">restart_alt</span>
                    <span>Revert to Original</span>
                  </button>
                )}

                <Link
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-50 text-slate-700 hover:text-[#062b18] hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors border border-slate-200 text-center"
                  href="/#home"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-base">visibility</span>
                  <span>Preview Live</span>
                </Link>
              </div>
            </div>
          )}

          {/* Compact Slots (Flagship Service, Academy, Sourcing, Catering) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherSlots.map((slot, idx) => (
              <div
                key={slot.id}
                className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={slot.alt_text}
                      className="w-full h-full object-cover"
                      src={slot.image_url}
                    />
                  </div>
                  <div className="flex flex-col min-w-0 justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 truncate">
                      Slot {idx + 2} · {slot.section}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 truncate mt-0.5">
                      {slot.title}
                    </h4>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {slot.image_url !== (slot.original_image_url || ORIGINAL_MEDIA_BASELINE[slot.slot_key])
                        ? "Custom photo active (Original available)"
                        : slot.previous_image_url && slot.previous_image_url !== slot.image_url
                        ? "Previous photo available to revert"
                        : "Original baseline active"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {slot.previous_image_url && slot.previous_image_url !== slot.image_url && (
                    <button
                      className="py-2 px-2.5 bg-slate-50 hover:bg-slate-100 text-[#062b18] rounded-lg text-xs font-bold transition-colors border border-slate-200 flex items-center gap-1"
                      disabled={isPending}
                      title="Undo: Revert to previous photo"
                      type="button"
                      onClick={() => handleRevertSlot(slot)}
                    >
                      <span className="material-symbols-outlined text-sm">undo</span>
                      <span className="hidden xl:inline">Undo</span>
                    </button>
                  )}

                  {slot.image_url !== (slot.original_image_url || ORIGINAL_MEDIA_BASELINE[slot.slot_key]) && (
                    <button
                      className="py-2 px-2.5 bg-slate-50 hover:bg-slate-100 text-amber-700 hover:text-amber-800 rounded-lg text-xs font-bold transition-colors border border-slate-200 flex items-center gap-1"
                      disabled={isPending}
                      title="Revert to pristine original baseline photo"
                      type="button"
                      onClick={() => handleRevertSlotToOriginal(slot)}
                    >
                      <span className="material-symbols-outlined text-sm">restart_alt</span>
                      <span className="hidden xl:inline">Original</span>
                    </button>
                  )}

                  <button
                    className="py-2 px-3 bg-slate-50 hover:bg-[#062b18] text-slate-700 hover:text-white rounded-lg text-xs font-semibold shrink-0 transition-colors border border-slate-200 flex items-center gap-1"
                    type="button"
                    onClick={() => handleOpenSlot(slot)}
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                    <span>Change</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload New Image Asset Section */}
      <section className="flex flex-col gap-3 pt-2">
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Upload New Photo to Library
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                JPG, PNG, WebP, or MP4 stored locally for instant slot assignment
              </p>
            </div>
          </div>

          {/* Upload Dropzone */}
          <div
            className="cursor-pointer bg-slate-50/70 rounded-xl p-6 text-center flex flex-col items-center justify-center transition-all hover:bg-emerald-50/40 border-2 border-dashed border-slate-200 hover:border-[#062b18]/40"
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
            }}
          >
            <div className="w-11 h-11 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#062b18] mb-2">
              <span className="material-symbols-outlined text-[22px]">cloud_upload</span>
            </div>
            <p className="font-semibold text-sm text-slate-900 mb-0.5">
              Click to select an image file
            </p>
            <p className="text-xs text-slate-500 max-w-[300px] mx-auto">
              Upload directly from your computer or mobile device
            </p>
          </div>

          {/* Destination Category Tags */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Asset Category Tag
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Hero Ceremony",
                "Barista Training",
                "Roastery & Sourcing",
                "Consultancy",
                "Café Ops",
                "Catering",
              ].map((tag) => (
                <button
                  key={tag}
                  className={`py-1 px-3 rounded-md text-[11px] font-semibold transition-colors border ${
                    selectedTag === tag
                      ? "bg-[#062b18] text-white border-[#062b18]"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Action */}
          <button
            className="w-full py-2.5 px-4 bg-[#062b18] hover:bg-[#0b4627] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs disabled:opacity-50"
            disabled={isUploading}
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
            <span>{isUploading ? "Uploading..." : "Upload Photo to Library"}</span>
          </button>
        </div>
      </section>

      {/* Media Library & Recent Uploads Gallery */}
      <section className="flex flex-col gap-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Photo Library ({filteredLibrary.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click Hero or Slot on any asset card to assign it directly
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: "all", label: `All (${libraryAssets.length})` },
              { id: "ceremony", label: "Ceremony" },
              { id: "training", label: "Training" },
              { id: "consulting", label: "Consulting" },
              { id: "catering", label: "Catering" },
              { id: "products", label: "Products" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`shrink-0 py-1.5 px-3 rounded-lg text-[11px] font-semibold transition-colors border ${
                  galleryFilter === tab.id
                    ? "bg-[#062b18] text-white border-[#062b18]"
                    : "bg-white text-slate-600 hover:text-slate-900 border-slate-200"
                }`}
                type="button"
                onClick={() => setGalleryFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredLibrary.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between"
            >
              <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src={item.image_url}
                />
                <span className="absolute top-2 left-2 bg-[#062b18]/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                  {item.categoryLabel}
                </span>
              </div>

              <div className="p-3 flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="font-semibold text-xs text-slate-900 truncate">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                    {item.desc}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-1 mt-2.5 pt-2 bg-slate-50 rounded-lg p-1 border border-slate-100">
                  <button
                    className="flex-1 py-1 text-center text-[10px] font-bold uppercase text-[#062b18] hover:bg-slate-200/70 rounded transition-colors"
                    title="Set as Homepage Hero Banner"
                    type="button"
                    onClick={() => assignAssetToHero(item)}
                  >
                    Hero
                  </button>
                  <button
                    className="flex-1 py-1 text-center text-[10px] font-bold uppercase text-amber-700 hover:bg-slate-200/70 rounded transition-colors"
                    title="Assign to another service slot"
                    type="button"
                    onClick={() => assignAssetToSlot(item)}
                  >
                    Slot
                  </button>
                  <button
                    className="w-6 h-6 flex items-center justify-center text-rose-600 hover:bg-rose-50 rounded transition-colors"
                    title="Delete from Library"
                    type="button"
                    onClick={() => deleteLibraryAsset(item.id)}
                  >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Edit Slot Modal */}
      {activeSlot && (
        <div
          aria-labelledby="edit-slot-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
          role="dialog"
        >
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-amber-700 font-bold">
                  Update Picture Slot
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5" id="edit-slot-title">
                  {activeSlot.title}
                </h3>
              </div>
              <button
                aria-label="Close dialog"
                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
                type="button"
                onClick={() => setActiveSlot(null)}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {uploadFeedback.message && (
              <div
                className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                  uploadFeedback.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                <span className="material-symbols-outlined text-base shrink-0">
                  {uploadFeedback.type === "success" ? "check_circle" : "error"}
                </span>
                <span>{uploadFeedback.message}</span>
              </div>
            )}

            {/* Current Image Preview */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-700">Live Preview</span>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Preview"
                  className="w-full h-full object-cover"
                  src={customUrl || activeSlot.image_url}
                />
              </div>
            </div>

            {/* Quick Revert to Previous Image (If Available) */}
            {activeSlot.previous_image_url && activeSlot.previous_image_url !== activeSlot.image_url && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-11 h-11 rounded-lg overflow-hidden bg-white shrink-0 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Previous Photo"
                      className="w-full h-full object-cover"
                      src={activeSlot.previous_image_url}
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Previous Photo
                    </span>
                    <span className="text-xs text-slate-600 truncate">
                      Roll back the most recent image swap
                    </span>
                  </div>
                </div>
                <button
                  className="py-1.5 px-3 bg-white hover:bg-slate-100 text-[#062b18] rounded-lg text-xs font-semibold transition-colors border border-slate-200 flex items-center gap-1 shrink-0"
                  disabled={isPending}
                  type="button"
                  onClick={() => handleRevertSlot(activeSlot)}
                >
                  <span className="material-symbols-outlined text-sm">undo</span>
                  <span>Restore</span>
                </button>
              </div>
            )}

            {/* Pristine Original Photo Revert */}
            {(activeSlot.original_image_url || ORIGINAL_MEDIA_BASELINE[activeSlot.slot_key]) &&
              activeSlot.image_url !== (activeSlot.original_image_url || ORIGINAL_MEDIA_BASELINE[activeSlot.slot_key]) && (
              <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/70 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-11 h-11 rounded-lg overflow-hidden bg-white shrink-0 border border-amber-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Original Baseline Photo"
                      className="w-full h-full object-cover"
                      src={activeSlot.original_image_url || ORIGINAL_MEDIA_BASELINE[activeSlot.slot_key]}
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      Pristine Original Photo
                    </span>
                    <span className="text-xs text-slate-600 truncate">
                      Restore the baseline photo that shipped with the site
                    </span>
                  </div>
                </div>
                <button
                  className="py-1.5 px-3 bg-white hover:bg-amber-100/70 text-amber-800 rounded-lg text-xs font-semibold transition-colors border border-amber-200 flex items-center gap-1 shrink-0"
                  disabled={isPending}
                  type="button"
                  onClick={() => handleRevertSlotToOriginal(activeSlot)}
                >
                  <span className="material-symbols-outlined text-sm">restart_alt</span>
                  <span>Revert to Original</span>
                </button>
              </div>
            )}

            {/* Upload or URL Inputs */}
            <div className="flex flex-col gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-slate-700 font-semibold" htmlFor="custom-url-input">
                  Image File or URL
                </label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono outline-none focus:border-[#062b18] focus:bg-white transition-colors"
                    id="custom-url-input"
                    placeholder="Click Browse to choose a photo or paste URL..."
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                  />
                  <button
                    className="px-3 py-2 rounded-lg bg-[#062b18] text-white font-semibold text-xs shrink-0 flex items-center gap-1 transition-colors hover:bg-[#0b4627]"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span className="material-symbols-outlined text-sm">upload_file</span>
                    <span>Browse</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-slate-700 font-semibold" htmlFor="custom-title-input">
                  Title (Optional)
                </label>
                <input
                  className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#062b18] focus:bg-white transition-colors"
                  id="custom-title-input"
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                type="button"
                onClick={() => setActiveSlot(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-[#062b18] hover:bg-[#0b4627] text-white font-semibold text-xs flex items-center gap-1.5 disabled:opacity-50 transition-colors shadow-xs"
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
