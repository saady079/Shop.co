"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CATEGORY_MAP } from "../constant/categories";


const PRICE_MIN = 0;
const PRICE_MAX = 500;
const PRICE_STEP = 10;

// فیلترهای رنگ/سایز/استایل فقط پارامتر URL می‌سازن (دیتای dummyjson این فیلدها رو نداره).
// اگر نمی‌خوای نمایش داده بشن، false بذار.
const SHOW_EXTRA_FILTERS = true;

const COLORS = [
  { name: "green", hex: "#00C12B" },
  { name: "red", hex: "#F50606" },
  { name: "yellow", hex: "#F5DD06" },
  { name: "orange", hex: "#F57906" },
  { name: "cyan", hex: "#06CAF5" },
  { name: "blue", hex: "#063AF5" },
  { name: "purple", hex: "#7D06F5" },
  { name: "pink", hex: "#F506A4" },
  { name: "white", hex: "#FFFFFF" },
  { name: "black", hex: "#000000" },
];

const SIZES = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

const DRESS_STYLES = ["Casual", "Formal", "Party", "Gym"];

const thumbClass =
  "pointer-events-none absolute inset-0 h-5 w-full appearance-none bg-transparent " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 " +
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 " +
  "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-black";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-black/10 py-4 sm:py-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="text-base font-bold sm:text-lg">{title}</h3>
        <Chevron open={open} />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function CategoryFilters({ activeSlug }: { activeSlug: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialMin = Number(searchParams.get("min")) || PRICE_MIN;
  const initialMax = Number(searchParams.get("max")) || PRICE_MAX;

  const [minV, setMinV] = useState(
    Math.min(Math.max(initialMin, PRICE_MIN), PRICE_MAX)
  );
  const [maxV, setMaxV] = useState(
    Math.min(Math.max(initialMax, PRICE_MIN), PRICE_MAX)
  );
  const [color, setColor] = useState(searchParams.get("color") ?? "");
  const [size, setSize] = useState(searchParams.get("size") ?? "");
  const [style, setStyle] = useState(searchParams.get("style") ?? "");
  const [open, setOpen] = useState(false);

  // قفل اسکرول صفحه وقتی پنل موبایل بازه + بستن با Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const setOrDelete = (params: URLSearchParams, key: string, value: string) => {
    if (value) params.set(key, value);
    else params.delete(key);
  };

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    setOrDelete(params, "min", minV > PRICE_MIN ? String(minV) : "");
    setOrDelete(params, "max", maxV < PRICE_MAX ? String(maxV) : "");
    setOrDelete(params, "color", color);
    setOrDelete(params, "size", size);
    setOrDelete(params, "style", style);
    params.delete("page");

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
    setOpen(false);
  };

  const reset = () => {
    setMinV(PRICE_MIN);
    setMaxV(PRICE_MAX);
    setColor("");
    setSize("");
    setStyle("");
    router.push(pathname);
    setOpen(false);
  };

  const leftPct = (minV / PRICE_MAX) * 100;
  const rightPct = 100 - (maxV / PRICE_MAX) * 100;

  const body = (
    <>
      {/* دسته‌ها */}
      <div className="border-t border-black/10 py-4 sm:py-5">
        <ul className="flex flex-col gap-3 text-black/60">
          {Object.entries(CATEGORY_MAP).map(([slug, c]) => (
            <li key={slug}>
              <Link
                href={`/shop/category/${slug}`}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between ${
                  slug === activeSlug ? "font-bold text-black" : ""
                }`}
              >
                <span>{c.title}</span>
                <span aria-hidden="true">›</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* قیمت */}
      <Section title="Price">
        <div className="px-1">
          <div className="relative h-5">
            <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded bg-black/10" />
            <div
              className="absolute top-1/2 h-1 -translate-y-1/2 rounded bg-black"
              style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
            />
            <input
              type="range"
              aria-label="Minimum price"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={minV}
              onChange={(e) =>
                setMinV(Math.min(Number(e.target.value), maxV - PRICE_STEP))
              }
              className={thumbClass}
            />
            <input
              type="range"
              aria-label="Maximum price"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={maxV}
              onChange={(e) =>
                setMaxV(Math.max(Number(e.target.value), minV + PRICE_STEP))
              }
              className={thumbClass}
            />
          </div>
          <div className="mt-3 flex justify-between text-sm font-medium">
            <span>${minV}</span>
            <span>${maxV}</span>
          </div>
        </div>
      </Section>

      {SHOW_EXTRA_FILTERS && (
        <>
          {/* رنگ‌ها */}
          <Section title="Colors">
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  onClick={() => setColor(color === c.name ? "" : c.name)}
                  style={{ backgroundColor: c.hex }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 text-sm sm:h-8 sm:w-8"
                >
                  {color === c.name && (
                    <span
                      className={c.name === "white" ? "text-black" : "text-white"}
                    >
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Section>

          {/* سایز */}
          <Section title="Size">
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => setSize(size === s ? "" : s)}
                  className={`rounded-full px-4 py-2 text-sm ${
                    size === s
                      ? "bg-black text-white"
                      : "bg-[#F0F0F0] text-black/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Section>

          {/* استایل */}
          <Section title="Dress Style">
            <ul className="flex flex-col gap-3 text-black/60">
              {DRESS_STYLES.map((d) => (
                <li key={d}>
                  <button
                    type="button"
                    onClick={() => setStyle(style === d ? "" : d)}
                    className={`flex w-full items-center justify-between ${
                      style === d ? "font-bold text-black" : ""
                    }`}
                  >
                    <span>{d}</span>
                    <span aria-hidden="true">›</span>
                  </button>
                </li>
              ))}
            </ul>
          </Section>
        </>
      )}

      <div className="border-t border-black/10 pt-5">
        <button
          type="button"
          onClick={applyFilter}
          className="w-full rounded-full bg-black py-3.5 text-sm text-white"
        >
          Apply Filter
        </button>
        <button
          type="button"
          onClick={reset}
          className="mt-2 w-full rounded-full border border-black/10 py-3.5 text-sm"
        >
          Reset
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* موبایل: دکمه‌ی باز کردن فیلتر */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open filters"
        className="flex h-10 items-center gap-2 self-start rounded-full bg-[#F0F0F0] px-4 text-sm md:hidden"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M20 18h0" />
          <circle cx="16" cy="6" r="2" />
          <circle cx="8" cy="12" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
        Filters
      </button>

      {/* موبایل: پنل تمام‌صفحه */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/40 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <div className="mt-12 flex min-h-0 flex-1 flex-col rounded-t-3xl bg-white">
            <div className="flex items-center justify-between px-5 pb-3 pt-5">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="flex h-9 w-9 items-center justify-center rounded-full text-xl hover:bg-black/5"
              >
                ✕
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-8">
              {body}
            </div>
          </div>
        </div>
      )}

      {/* دسکتاپ: ستون ثابت */}
      <aside className="hidden h-fit w-64 shrink-0 rounded-2xl border border-black/10 p-5 md:block">
        <h2 className="mb-1 text-xl font-bold">Filters</h2>
        {body}
      </aside>
    </>
  );
}

export default CategoryFilters;