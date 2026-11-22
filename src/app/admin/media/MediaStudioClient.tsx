"use client";

import { useState, useTransition, useRef } from "react";
import Link from "next/link";
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
    desc: "Jebena Pot • In Library",
  },
  {
    id: "lib-2",
    name: "Roasted Pan Coffee",
    category: "products",
    categoryLabel: "Roasting",
    image_url: "/admin/media-roasted-pan.jpg",
    desc: "Origin Beans • In Library",
  },
  {
    id: "lib-3",
    name: "Ceremony Tray Sini",
    category: "ceremony",
    categoryLabel: "Heritage",
    image_url: "/admin/media-ceremony-tray.jpg",
    desc: "Cini Porcelain • In Library",
  },
  {
    id: "lib-4",
    name: "Café Inventory Log",
    category: "consulting",
    categoryLabel: "Operations",
    image_url: "/admin/media-cafe-inventory.jpg",
    desc: "Yirgacheffe Lot • In Library",
  },
  {
    id: "lib-5",
    name: "Barista Academy Calibration",
    category: "training",
    categoryLabel: "Training",
    image_url: "/admin/slot-academy-barista.jpg",
    desc: "Espresso Calibration • In Library",
  },
  {
    id: "lib-6",
    name: "Highland Banquet Spread",
    category: "catering",
    categoryLabel: "Catering",
    image_url: "/catering-services.jpg",
    desc: "Banquet Mesob • In Library",
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
  const [mode, setMode] = useState<"live" | "draft">("live");
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
    }, 3000);
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
      // Add to local library
      const newAsset: LibraryAsset = {
        id: "upload-" + Date.now(),
        name: file.name.replace(/\.[^/.]+$/, ""),
        category: "ceremony",
        categoryLabel: selectedTag,
        image_url: res.url,
        desc: "Local Storage • Just Uploaded",
      };
      setLibraryAssets((prev) => [newAsset, ...prev]);
      setPendingChanges((p) => p + 1);
      showToast(`Uploaded ${file.name} to media library!`);
      setUploadFeedback({
        type: "success",
        message: `File uploaded to local storage: ${res.url}`,
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
        setPendingChanges(0);
        showToast(`Slot "${activeSlot.title}" updated live!`);
      } else {
        setUploadFeedback({
          type: "error",
          message: res.error || "Failed to save media slot.",
        });
      }
    });
  };

  const assignAssetToHero = (asset: LibraryAsset) => {
    const heroSlot = slots.find((s) => s.slot_key === "hero_slide_0" || s.section === "hero") || slots[0];
    if (heroSlot) {
      handleOpenSlot(heroSlot);
      setCustomUrl(asset.image_url);
      setCustomTitle(asset.name);
      showToast(`Selected "${asset.name}" for ${heroSlot.title}. Click Publish to apply.`);
    }
  };

  const assignAssetToSlot = (asset: LibraryAsset) => {
    const availableSlots = slots.filter((s) => s.slot_key !== "hero_slide_0");
    const targetSlot = availableSlots[0] || slots[0];
    if (targetSlot) {
      handleOpenSlot(targetSlot);
      setCustomUrl(asset.image_url);
      setCustomTitle(asset.name);
      showToast(`Selected "${asset.name}" for ${targetSlot.title}.`);
    }
  };

  const deleteLibraryAsset = (id: string) => {
    setLibraryAssets((prev) => prev.filter((a) => a.id !== id));
    showToast("Asset removed from library view.");
  };

  const heroSlot = slots.find((s) => s.slot_key === "hero_slide_0" || s.section === "hero") || slots[0];
  const otherSlots = slots.filter((s) => s.id !== heroSlot?.id);

  const filteredLibrary = libraryAssets.filter(
    (a) => galleryFilter === "all" || a.category === galleryFilter
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto relative pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-lg shadow-xl text-center text-xs font-semibold animate-fade-in pointer-events-auto">
          {toastMessage}
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

      {/* Status & Quick Stats Bar */}
      <section className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 border border-surface-container-highest shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-3 bg-surface-container-low rounded-lg p-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-stitch-primary-container text-stitch-on-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">photo_library</span>
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-stitch-primary uppercase block tracking-wider">
                Asset Operations
              </span>
              <span className="text-xs text-on-surface-variant truncate block">
                Direct CMS Synchronization &amp; CloudFront Cache Control
              </span>
            </div>
          </div>

          <div className="flex items-center bg-surface-container-highest p-0.5 rounded-lg shrink-0">
            <button
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                mode === "draft"
                  ? "bg-surface text-stitch-primary shadow-sm"
                  : "text-on-surface-variant"
              }`}
              type="button"
              onClick={() => {
                setMode("draft");
                showToast("Switched to Draft Staging view");
              }}
            >
              Draft
            </button>
            <button
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                mode === "live"
                  ? "bg-stitch-primary text-white shadow-sm"
                  : "text-on-surface-variant"
              }`}
              type="button"
              onClick={() => {
                setMode("live");
                showToast("Live Mode: Changes publish directly to website");
              }}
            >
              Live
            </button>
          </div>
        </div>

        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-4 gap-2 text-center pt-1">
          <div className="flex flex-col items-center bg-surface-container-low/60 py-2 px-1 rounded-lg">
            <span className="font-serif text-2xl font-bold text-stitch-primary leading-none">
              {libraryAssets.length + slots.length}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">
              Live Assets
            </span>
          </div>
          <div className="flex flex-col items-center bg-surface-container-low/60 py-2 px-1 rounded-lg">
            <span className="font-serif text-2xl font-bold text-stitch-secondary leading-none">
              {slots.length}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">
              Active Slots
            </span>
          </div>
          <div className="flex flex-col items-center bg-surface-container-low/60 py-2 px-1 rounded-lg">
            <span className="font-serif text-2xl font-bold text-stitch-primary leading-none">
              100%
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">
              Storage Safe
            </span>
          </div>
          <div className="flex flex-col items-center bg-surface-container-low/60 py-2 px-1 rounded-lg">
            <span className="font-serif text-2xl font-bold text-stitch-secondary leading-none">
              Live
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">
              Synced
            </span>
          </div>
        </div>
      </section>

      {/* Active Homepage Slots Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-stitch-primary rounded-full shrink-0" />
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stitch-primary">
              Active Homepage Slots
            </h2>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
            {slots.length} Configured
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {/* Slot 01: Hero Banner (Featured Card) */}
          {heroSlot && (
            <div className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 border border-surface-container-highest shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-stitch-primary animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stitch-primary">
                    Slot 01: Hero Banner
                  </span>
                </div>
                <span className="bg-stitch-primary-fixed text-stitch-primary font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
                  Active on Homepage
                </span>
              </div>

              <h3 className="font-serif text-lg font-semibold text-on-surface mb-3">
                {heroSlot.title || "Traditional Jebena Ceremony Showcase"}
              </h3>

              {/* Preview Image Container */}
              <div className="relative w-full h-56 sm:h-72 rounded-lg overflow-hidden bg-surface-container mb-3 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={heroSlot.alt_text || "Hero Ceremony"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={heroSlot.image_url}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stitch-primary/80 via-stitch-primary/20 to-transparent flex items-end p-3">
                  <div className="text-white flex items-center justify-between w-full">
                    <span className="text-xs text-white/90 flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[16px]">aspect_ratio</span>
                      16:9 Cinema Crop
                    </span>
                    <span className="text-[10px] font-bold uppercase bg-stitch-tertiary-fixed text-stitch-tertiary px-2 py-0.5 rounded">
                      High Fidelity
                    </span>
                  </div>
                </div>
              </div>

              {/* Slot Actions */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  className="flex items-center justify-center gap-1 py-2 px-2 bg-stitch-primary text-white rounded-lg text-xs font-semibold hover:bg-stitch-primary-container transition-colors shadow-sm"
                  type="button"
                  onClick={() => handleOpenSlot(heroSlot)}
                >
                  <span className="material-symbols-outlined text-[16px]">sync</span>
                  <span>Replace</span>
                </button>
                <button
                  className="flex items-center justify-center gap-1 py-2 px-2 bg-surface-container-low text-on-surface-variant hover:text-stitch-primary rounded-lg text-xs font-semibold transition-colors"
                  type="button"
                  onClick={() => showToast("Aspect Ratio Tool: Locked to 16:9 Cinema Crop")}
                >
                  <span className="material-symbols-outlined text-[16px]">crop</span>
                  <span>Crop</span>
                </button>
                <Link
                  className="flex items-center justify-center gap-1 py-2 px-2 bg-surface-container-low text-on-surface-variant hover:text-stitch-primary rounded-lg text-xs font-semibold transition-colors text-center"
                  href="/#home"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>Preview</span>
                </Link>
              </div>
            </div>
          )}

          {/* Compact Slots (Flagship Service, Academy, Sourcing, Catering) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherSlots.map((slot, idx) => (
              <div
                key={slot.id}
                className="bg-surface-container-lowest rounded-xl p-4 border border-surface-container-highest shadow-sm flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-surface-container shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={slot.alt_text}
                      className="w-full h-full object-cover"
                      src={slot.image_url}
                    />
                  </div>
                  <div className="flex flex-col min-w-0 justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stitch-secondary truncate">
                      Slot 0{idx + 2}: {slot.section}
                    </span>
                    <h4 className="font-serif font-semibold text-sm sm:text-base text-on-surface truncate">
                      {slot.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant truncate font-mono mt-0.5">
                      {slot.slot_key}
                    </p>
                  </div>
                </div>

                <button
                  className="py-1.5 px-3 bg-surface-container-low hover:bg-surface-container text-stitch-primary rounded-lg text-xs font-bold shrink-0 transition-colors border border-surface-container-highest"
                  type="button"
                  onClick={() => handleOpenSlot(slot)}
                >
                  Change
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload New Image Asset Section */}
      <section className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-stitch-tertiary-fixed-dim rounded-full shrink-0" />
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stitch-primary">
              Upload Asset
            </h2>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stitch-secondary">
            Cloud Storage
          </span>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 border border-surface-container-highest shadow-sm flex flex-col gap-4">
          {/* Upload Dropzone */}
          <div
            className="cursor-pointer bg-surface-container-low rounded-lg p-6 text-center flex flex-col items-center justify-center transition-all hover:bg-surface-container-high border-2 border-dashed border-surface-container-highest hover:border-stitch-primary/30"
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
            }}
          >
            <div className="w-12 h-12 rounded-full bg-stitch-primary-fixed flex items-center justify-center text-stitch-primary mb-2">
              <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
            </div>
            <p className="font-serif font-semibold text-base text-on-surface mb-1">
              Select Photography Asset
            </p>
            <p className="text-xs text-on-surface-variant max-w-[280px] mx-auto">
              Tap to upload high-res ceremony, academy, or estate photography (JPG, PNG, WebP up to 15MB)
            </p>
          </div>

          {/* Destination Category Tags */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-2">
              Assign Destination Tag
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
                  className={`py-1 px-3 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    selectedTag === tag
                      ? "bg-stitch-primary text-white"
                      : "bg-surface-container-low text-on-surface-variant hover:text-stitch-primary"
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
            className="w-full py-2.5 px-4 bg-stitch-primary hover:bg-stitch-primary-container text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50"
            disabled={isUploading}
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
            <span>{isUploading ? "Uploading..." : "Upload & Add to Media Library"}</span>
          </button>
        </div>
      </section>

      {/* Media Library & Recent Uploads Gallery */}
      <section className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-stitch-secondary rounded-full shrink-0" />
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stitch-primary">
              Media Library
            </h2>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            {libraryAssets.length} Assets Available
          </span>
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
              className={`shrink-0 py-1 px-3 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors ${
                galleryFilter === tab.id
                  ? "bg-stitch-primary text-white"
                  : "bg-surface-container-lowest text-on-surface-variant hover:text-stitch-primary border border-surface-container-highest"
              }`}
              type="button"
              onClick={() => setGalleryFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid (2 Columns on mobile, 3-4 Columns on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredLibrary.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest rounded-xl overflow-hidden border border-surface-container-highest shadow-sm flex flex-col justify-between"
            >
              <div className="relative w-full aspect-square bg-surface-container overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src={item.image_url}
                />
                <span className="absolute top-2 left-2 bg-stitch-primary/90 text-white text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded backdrop-blur-xs">
                  {item.categoryLabel}
                </span>
              </div>

              <div className="p-2.5 flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="font-serif font-semibold text-xs text-on-surface truncate">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-on-surface-variant block truncate">
                    {item.desc}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-1 mt-2 pt-2 bg-surface-container-low rounded-lg p-1">
                  <button
                    className="flex-1 py-1 text-center text-[10px] font-bold uppercase text-stitch-primary hover:bg-surface-container-highest rounded transition-colors"
                    title="Assign to Hero Banner"
                    type="button"
                    onClick={() => assignAssetToHero(item)}
                  >
                    Hero
                  </button>
                  <button
                    className="flex-1 py-1 text-center text-[10px] font-bold uppercase text-stitch-secondary hover:bg-surface-container-highest rounded transition-colors"
                    title="Assign to Next Slot"
                    type="button"
                    onClick={() => assignAssetToSlot(item)}
                  >
                    Slot
                  </button>
                  <button
                    className="w-6 h-6 flex items-center justify-center text-error hover:bg-error-container/50 rounded transition-colors"
                    title="Delete Asset"
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

      {/* Sticky Quick Publish Bar matching Stitch UI */}
      <aside className="fixed bottom-16 md:bottom-6 inset-x-0 z-40 px-4 max-w-2xl mx-auto pointer-events-none">
        <div className="pointer-events-auto bg-inverse-surface text-inverse-on-surface p-3 rounded-xl shadow-xl flex items-center justify-between gap-3 transition-transform duration-300">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-stitch-tertiary-fixed-dim animate-pulse shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-inverse-on-surface truncate">
                {pendingChanges > 0
                  ? `${pendingChanges} unsaved changes staged`
                  : "All media assets synchronized live"}
              </p>
              <p className="text-[10px] text-stitch-outline-variant uppercase tracking-wider">
                Staged for CloudFront &amp; CDN
              </p>
            </div>
          </div>
          <button
            className="shrink-0 py-1.5 px-3 bg-stitch-primary-fixed text-stitch-primary hover:bg-stitch-primary-fixed-dim rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
            type="button"
            onClick={() => {
              setPendingChanges(0);
              showToast("Published live! CDN cache invalidated.");
            }}
          >
            <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
            <span>Publish Live</span>
          </button>
        </div>
      </aside>

      {/* Edit Slot Modal */}
      {activeSlot && (
        <div
          aria-labelledby="edit-slot-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
        >
          <div className="w-full max-w-lg bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-5 sm:p-7 flex flex-col gap-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-surface-container-highest pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stitch-secondary font-bold">
                  Media Assignment
                </span>
                <h3 className="font-serif text-lg font-semibold text-stitch-primary mt-0.5" id="edit-slot-title">
                  {activeSlot.title}
                </h3>
              </div>
              <button
                aria-label="Close dialog"
                className="w-8 h-8 rounded-lg hover:bg-surface-container-low text-on-surface-variant flex items-center justify-center transition-colors"
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
                    ? "bg-stitch-primary-fixed/30 text-stitch-primary border border-stitch-primary-fixed"
                    : "bg-error-container text-on-error-container"
                }`}
              >
                <span className="material-symbols-outlined text-base shrink-0">
                  {uploadFeedback.type === "success" ? "check_circle" : "error"}
                </span>
                <span>{uploadFeedback.message}</span>
              </div>
            )}

            {/* Current Image Preview */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-surface-container border border-surface-container-highest">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Preview"
                className="w-full h-full object-cover"
                src={customUrl || activeSlot.image_url}
              />
            </div>

            {/* Upload or URL Inputs */}
            <div className="flex flex-col gap-3.5 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-on-surface font-semibold" htmlFor="custom-url-input">
                  Image Path or URL
                </label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface font-mono outline-none focus:border-stitch-primary"
                    id="custom-url-input"
                    placeholder="/admin/slot-jebena-hero.jpg or /uploads/..."
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                  />
                  <button
                    className="px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs border border-surface-container-highest shrink-0 flex items-center gap-1 transition-colors"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span className="material-symbols-outlined text-sm">upload_file</span>
                    <span>Browse</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-on-surface font-semibold" htmlFor="custom-title-input">
                  Display Title
                </label>
                <input
                  className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                  id="custom-title-input"
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-on-surface font-semibold" htmlFor="custom-alt-input">
                  Alt Accessibility Text
                </label>
                <input
                  className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                  id="custom-alt-input"
                  type="text"
                  value={customAlt}
                  onChange={(e) => setCustomAlt(e.target.value)}
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2.5 pt-2 border-t border-surface-container-highest">
              <button
                className="px-3.5 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors"
                type="button"
                onClick={() => setActiveSlot(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-stitch-primary hover:bg-stitch-primary-container text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-50 transition-colors shadow-sm"
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
