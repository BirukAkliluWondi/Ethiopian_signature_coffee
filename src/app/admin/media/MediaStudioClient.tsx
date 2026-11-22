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
    image_url: "/admin/media-cafe-inventory.jpg",
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
        showToast(`Photo for "${activeSlot.title}" has been updated live on your website!`);
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
    <div className="flex flex-col gap-6 max-w-7xl mx-auto relative pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-lg shadow-xl text-center text-xs font-semibold animate-fade-in pointer-events-auto flex items-center gap-2">
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

      {/* Step-by-Step Guide on How to Change Pictures */}
      <section className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-highest shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-stitch-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
            ?
          </span>
          <h2 className="font-semibold text-xs text-stitch-primary uppercase tracking-wider">
            Step-by-Step Guide: How to Change Any Picture on the Website
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-stitch-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Find the Picture Slot</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Scroll to the section you want to change below (such as the Hero Banner, Services, or Catering).
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-stitch-secondary text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Click &ldquo;Change&rdquo; or &ldquo;Replace&rdquo;</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Click the button on that picture card. A window will open where you can click <strong>Browse</strong> to pick a photo.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-[#25D366] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Click &ldquo;Publish to Site&rdquo;</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Your new photo is saved immediately and will be visible to everyone visiting your website!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Active Homepage Slots Section */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-stitch-primary rounded-full shrink-0" />
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stitch-primary">
              Active Website Picture Slots
            </h2>
          </div>
          <span className="text-xs text-on-surface-variant pl-3.5 sm:pl-0">
            Click <strong>Replace</strong> or <strong>Change</strong> on any card below to swap its picture.
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {/* Slot 01: Hero Banner (Featured Card) */}
          {heroSlot && (
            <div className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 border border-surface-container-highest shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-stitch-primary animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stitch-primary">
                    Slot 1: Homepage Hero Banner
                  </span>
                </div>
                <span className="bg-stitch-primary-fixed text-stitch-primary font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
                  Showing on Homepage
                </span>
              </div>

              <h3 className="font-serif text-base sm:text-lg font-semibold text-on-surface mb-1">
                {heroSlot.title || "Traditional Coffee Ceremony Banner"}
              </h3>
              <p className="text-xs text-on-surface-variant mb-3">
                This is the large main photo that visitors see at the top of your website.
              </p>

              {/* Preview Image Container */}
              <div className="relative w-full h-56 sm:h-72 rounded-lg overflow-hidden bg-surface-container mb-3 group border border-surface-container-highest">
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
                      High-Definition Banner
                    </span>
                    <span className="text-[10px] font-bold uppercase bg-stitch-tertiary-fixed text-stitch-tertiary px-2 py-0.5 rounded">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Slot Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stitch-primary text-white rounded-lg text-xs font-semibold hover:bg-stitch-primary-container transition-colors shadow-sm"
                  type="button"
                  onClick={() => handleOpenSlot(heroSlot)}
                >
                  <span className="material-symbols-outlined text-base">sync</span>
                  <span>Replace This Hero Picture</span>
                </button>
                <Link
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-surface-container-low text-on-surface hover:text-stitch-primary rounded-lg text-xs font-semibold transition-colors border border-surface-container-highest text-center"
                  href="/#home"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-base">visibility</span>
                  <span>Preview on Live Site</span>
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
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-surface-container shrink-0 border border-surface-container-highest">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={slot.alt_text}
                      className="w-full h-full object-cover"
                      src={slot.image_url}
                    />
                  </div>
                  <div className="flex flex-col min-w-0 justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stitch-secondary truncate">
                      Slot {idx + 2}: {slot.section} Section
                    </span>
                    <h4 className="font-serif font-semibold text-sm sm:text-base text-on-surface truncate">
                      {slot.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant truncate mt-0.5">
                      Click Change to replace this image
                    </p>
                  </div>
                </div>

                <button
                  className="py-2 px-3 bg-surface-container-low hover:bg-surface-container text-stitch-primary rounded-lg text-xs font-bold shrink-0 transition-colors border border-surface-container-highest flex items-center gap-1"
                  type="button"
                  onClick={() => handleOpenSlot(slot)}
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                  <span>Change</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload New Image Asset Section */}
      <section className="flex flex-col gap-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-stitch-tertiary-fixed-dim rounded-full shrink-0" />
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stitch-primary">
            Upload a New Photo from Your Device
          </h2>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 border border-surface-container-highest shadow-sm flex flex-col gap-4">
          {/* Step Guide for Upload */}
          <div className="p-3 rounded-lg bg-surface-container-low text-xs text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-stitch-primary text-base shrink-0">info</span>
            <span>
              <strong>How to upload:</strong> Click the box below to pick a photo from your computer or phone. Once uploaded, it will be added to your Photo Library below so you can use it anytime.
            </span>
          </div>

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
              Click Here to Choose a Photo
            </p>
            <p className="text-xs text-on-surface-variant max-w-[300px] mx-auto">
              Select JPG, PNG, or WebP images from your phone gallery or computer.
            </p>
          </div>

          {/* Destination Category Tags */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-2">
              Select What This Photo Is For:
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
            <span>{isUploading ? "Uploading..." : "Click to Upload Photo to Library"}</span>
          </button>
        </div>
      </section>

      {/* Media Library & Recent Uploads Gallery */}
      <section className="flex flex-col gap-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-stitch-secondary rounded-full shrink-0" />
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stitch-primary">
              Photo Library
            </h2>
          </div>
          <span className="text-xs text-on-surface-variant pl-3.5 sm:pl-0">
            Click <strong>Hero</strong> to set as main banner, or <strong>Slot</strong> to use for another section.
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "all", label: `All Photos (${libraryAssets.length})` },
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

        {/* Gallery Grid */}
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
                    title="Set as Homepage Hero Banner"
                    type="button"
                    onClick={() => assignAssetToHero(item)}
                  >
                    Hero
                  </button>
                  <button
                    className="flex-1 py-1 text-center text-[10px] font-bold uppercase text-stitch-secondary hover:bg-surface-container-highest rounded transition-colors"
                    title="Assign to another service slot"
                    type="button"
                    onClick={() => assignAssetToSlot(item)}
                  >
                    Slot
                  </button>
                  <button
                    className="w-6 h-6 flex items-center justify-center text-error hover:bg-error-container/50 rounded transition-colors"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
        >
          <div className="w-full max-w-lg bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-5 sm:p-7 flex flex-col gap-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-surface-container-highest pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stitch-secondary font-bold">
                  Step 2 of 2: Change Photo
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
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-surface">Photo Preview:</span>
              <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-surface-container border border-surface-container-highest">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Preview"
                  className="w-full h-full object-cover"
                  src={customUrl || activeSlot.image_url}
                />
              </div>
            </div>

            {/* Upload or URL Inputs */}
            <div className="flex flex-col gap-3.5 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-on-surface font-semibold" htmlFor="custom-url-input">
                  Select a New Photo:
                </label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface font-mono outline-none focus:border-stitch-primary"
                    id="custom-url-input"
                    placeholder="Click Browse to choose a photo..."
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                  />
                  <button
                    className="px-3 py-2 rounded-lg bg-stitch-primary text-white font-semibold text-xs shrink-0 flex items-center gap-1 transition-colors hover:bg-stitch-primary-container"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span className="material-symbols-outlined text-sm">upload_file</span>
                    <span>Browse</span>
                  </button>
                </div>
                <span className="text-[11px] text-on-surface-variant">
                  Tip: Click Browse to pick a photo from your computer or phone.
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-on-surface font-semibold" htmlFor="custom-title-input">
                  Title (Optional)
                </label>
                <input
                  className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                  id="custom-title-input"
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
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
