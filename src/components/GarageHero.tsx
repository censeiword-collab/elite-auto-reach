import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, MessageCircle, Sun } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { garageCars, type GarageCar } from "@/data/garageCars";
import { filmColors, type FilmColor } from "@/data/filmColors";

const ASSET_BASE = "/garage/cars";
const BG_URL = "/garage/bg.jpg";

export default function GarageHero() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedCar, setSelectedCar] = useState<GarageCar>(garageCars[0]);
  const [selectedColor, setSelectedColor] = useState<FilmColor>(filmColors[0]);
  const [frameIndex, setFrameIndex] = useState(1);
  const [carDropdownOpen, setCarDropdownOpen] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const bgRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  const frames = Math.max(1, selectedCar.frames || 1);

  const clampFrame = useCallback(
    (value: number) => {
      if (value < 1) return frames;
      if (value > frames) return 1;
      return value;
    },
    [frames],
  );

  const prevFrame = useCallback(() => setFrameIndex((p) => clampFrame(p - 1)), [clampFrame]);
  const nextFrame = useCallback(() => setFrameIndex((p) => clampFrame(p + 1)), [clampFrame]);

  const handleCarChange = useCallback((car: GarageCar) => {
    setSelectedCar(car);
    setFrameIndex(1);
    setCarDropdownOpen(false);
    setColorDropdownOpen(false);
  }, []);

  const handleColorChange = useCallback((color: FilmColor) => {
    setSelectedColor(color);
    setFrameIndex(1);
    setColorDropdownOpen(false);
    setCarDropdownOpen(false);
  }, []);

  const carImgSrc = useMemo(
    () => `${ASSET_BASE}/${selectedCar.slug}/${frameIndex}.png`,
    [selectedCar.slug, frameIndex],
  );

  const isDisabled = selectedColor.rollsAvailable === 0;

  const whatsappUrl = useMemo(() => {
    const text = `Здравствуйте! Хочу оклейку в цвете ${selectedColor.code} ${selectedColor.label}. Подскажите стоимость и ближайшую запись.`;
    return `https://wa.me/79038687861?text=${encodeURIComponent(text)}`;
  }, [selectedColor.code, selectedColor.label]);

  /* ── media queries ── */
  useEffect(() => {
    const mqlMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqlMobile = window.matchMedia("(max-width: 767px)");
    setPrefersReducedMotion(mqlMotion.matches);
    setIsMobile(mqlMobile.matches);
    const onMotion = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    const onMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mqlMotion.addEventListener("change", onMotion);
    mqlMobile.addEventListener("change", onMobile);
    return () => {
      mqlMotion.removeEventListener("change", onMotion);
      mqlMobile.removeEventListener("change", onMobile);
    };
  }, []);

  /* ── sync from query params ── */
  useEffect(() => {
    const carId = searchParams.get("carId");
    const colorId = searchParams.get("colorId");
    if (carId) {
      const found = garageCars.find((c) => c.id === carId);
      if (found) { setSelectedCar(found); setFrameIndex(1); }
    }
    if (colorId) {
      const found = filmColors.find((c) => c.id === colorId);
      if (found) { setSelectedColor(found); setFrameIndex(1); }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  /* ── keyboard ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevFrame();
      else if (e.key === "ArrowRight") nextFrame();
      else if (e.key === "Escape") {
        setCarDropdownOpen(false);
        setColorDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prevFrame, nextFrame]);

  /* ── click outside ── */
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setCarDropdownOpen(false);
        setColorDropdownOpen(false);
      }
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  /* ── preload frames ── */
  useEffect(() => {
    for (let i = 1; i <= frames; i++) {
      const img = new Image();
      img.src = `${ASSET_BASE}/${selectedCar.slug}/${i}.png`;
    }
  }, [selectedCar.slug, frames]);

  /* ── parallax ── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isMobile || prefersReducedMotion || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (bgRef.current) bgRef.current.style.transform = `translate(${cx * -2}px, ${cy * -2}px) scale(1.02)`;
        if (carRef.current) carRef.current.style.transform = `translate(${cx * 6}px, ${cy * 4}px)`;
      });
    },
    [isMobile, prefersReducedMotion],
  );

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  /* ── swipe ── */
  const handleTouchStart = useCallback((e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX), []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 50) delta > 0 ? prevFrame() : nextFrame();
      setTouchStartX(null);
    },
    [touchStartX, prevFrame, nextFrame],
  );

  /* ── image fallback ── */
  const handleImgError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const el = e.currentTarget;
      if (!el.dataset.fallbackApplied) {
        el.dataset.fallbackApplied = "1";
        el.src = `${ASSET_BASE}/${selectedCar.slug}/1.png`;
        return;
      }
      el.src =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='450'%3E%3Crect width='100%25' height='100%25' fill='%230b0b12'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff88' font-family='Arial' font-size='20'%3ECar image missing%3C/text%3E%3C/svg%3E";
    },
    [selectedCar.slug],
  );

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[80vh] overflow-hidden"
    >
      {/* Layer 1 — bg */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02]"
        style={{ backgroundImage: `url(${BG_URL})`, willChange: "transform" }}
      />
      {/* Layer 2 — dark */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Layer 3 — spotlights */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.07) 0%, transparent 60%), radial-gradient(ellipse at 70% 0%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 10%, rgba(255,255,255,0.04) 0%, transparent 40%)",
        }}
      />
      {/* Layer 4 — floor */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/85 via-black/50 to-transparent pointer-events-none" />
      {/* Layer 5 — vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.85) 100%)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 min-h-[80vh] flex flex-col-reverse md:flex-row items-center gap-6 md:gap-0 py-8 pt-12">

        {/* ── Car zone ── */}
        <div
          ref={carRef}
          className="flex-[7] relative flex items-center justify-center w-full"
          style={{ willChange: "transform" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Reflection */}
          <img
            src={carImgSrc}
            alt=""
            aria-hidden
            className="absolute w-full max-w-[700px] h-auto object-contain pointer-events-none select-none"
            style={{
              transform: "scaleY(-1) translateY(-10%)",
              filter: "blur(6px)",
              opacity: 0.15,
              top: "55%",
              maskImage: "linear-gradient(to top, transparent 10%, rgba(0,0,0,0.7) 100%)",
              WebkitMaskImage: "linear-gradient(to top, transparent 10%, rgba(0,0,0,0.7) 100%)",
              mixBlendMode: "multiply",
            }}
          />

          {/* Shadow ellipse */}
          <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/40 rounded-full blur-xl pointer-events-none" />

          {/* Car image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={`${selectedCar.slug}-${frameIndex}`}
              src={carImgSrc}
              alt={selectedCar.name}
              onError={handleImgError}
              className="w-full max-w-[700px] h-auto object-contain relative z-10"
              style={{
                mixBlendMode: "multiply",
                filter: "drop-shadow(0 18px 35px rgba(0,0,0,0.55)) drop-shadow(4px 8px 16px rgba(0,0,0,0.3))",
              }}
              initial={{ opacity: 0, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>

          {/* Color overlay */}
          <div
            className="absolute inset-0 z-[11] pointer-events-none"
            style={{
              background: selectedColor.hex,
              mixBlendMode: "overlay",
              opacity: 0.35,
              transition: "background 0.3s ease",
              maskImage: "radial-gradient(ellipse at center 45%, black 30%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at center 45%, black 30%, transparent 70%)",
            }}
          />

          {/* Arrow left */}
          <button
            onClick={prevFrame}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 hover:scale-110 transition-all backdrop-blur-sm"
            aria-label="Предыдущий кадр"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Arrow right */}
          <button
            onClick={nextFrame}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 hover:scale-110 transition-all backdrop-blur-sm"
            aria-label="Следующий кадр"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {Array.from({ length: frames }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${i + 1 === frameIndex ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>

        {/* ── HUD Panel ── */}
        <div
          ref={panelRef}
          className="w-full md:w-[340px] lg:w-[380px] shrink-0 flex flex-col justify-center gap-6 p-6 md:p-8"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center shadow-lg">
              <Sun className="w-6 h-6 text-white" strokeWidth={2.5} />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-extrabold tracking-tight">
                <span className="text-blue-500">SUN</span>
                <span className="text-red-500">MAX</span>
                <span className="text-white/70 text-sm font-semibold ml-0.5">KZN</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium -mt-0.5">
                Premium Auto
              </span>
            </div>
          </div>

          {/* Car select */}
          <div className="relative">
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-1.5 block">
              Автомобиль
            </label>
            <button
              onClick={() => { setCarDropdownOpen((v) => !v); setColorDropdownOpen(false); }}
              className="w-full flex items-center justify-between pb-2 border-b border-white/20 text-white cursor-pointer hover:border-white/40 transition-colors"
            >
              <span className="text-sm font-medium truncate">{selectedCar.name}</span>
              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${carDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {carDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl bg-[#12121f] border border-white/10 shadow-2xl overflow-hidden">
                {garageCars.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => handleCarChange(car)}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                      car.id === selectedCar.id
                        ? "bg-white/10 text-white font-semibold"
                        : "text-white/70 hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    {car.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color select */}
          <div className="relative">
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-1.5 block">
              Цвет плёнки
            </label>
            <button
              onClick={() => { setColorDropdownOpen((v) => !v); setCarDropdownOpen(false); }}
              className="w-full flex items-center justify-between pb-2 border-b border-white/20 text-white cursor-pointer hover:border-white/40 transition-colors"
            >
              <span className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <span className="text-sm font-medium truncate">
                  {selectedColor.code} {selectedColor.label}
                </span>
              </span>
              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${colorDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {colorDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl bg-[#12121f] border border-white/10 shadow-2xl overflow-hidden">
                {filmColors.map((color) => {
                  const unavailable = color.rollsAvailable === 0;
                  return (
                    <button
                      key={color.id}
                      onClick={() => { if (!unavailable) handleColorChange(color); }}
                      disabled={unavailable}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                        unavailable
                          ? "text-white/30 cursor-not-allowed"
                          : color.id === selectedColor.id
                          ? "bg-white/10 text-white font-semibold"
                          : "text-white/70 hover:bg-white/[0.08] hover:text-white"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="truncate">
                        {color.code} {color.label}
                        {unavailable && " (нет в наличии)"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="text-xs">
            {selectedColor.rollsAvailable > 0 ? (
              <span className="text-emerald-400 font-medium">
                В наличии: {selectedColor.rollsAvailable} рул.
              </span>
            ) : (
              <span className="text-red-400 font-medium">Нет в наличии</span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { if (!isDisabled) navigate(`/colors/${selectedColor.id}`); }}
              disabled={isDisabled}
              className={`w-full px-6 py-3 rounded-full border border-white/25 text-white text-sm font-semibold transition-colors ${
                isDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white/10"
              }`}
            >
              Все авто / в этом цвете
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-6 py-2.5 rounded-full border border-emerald-500/30 text-emerald-400/80 text-xs font-semibold hover:bg-emerald-500/10 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Запросить этот цвет
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
