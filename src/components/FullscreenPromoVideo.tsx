import { useEffect, useMemo, useRef, useState } from "react";

export default function FullscreenPromoVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [inView, setInView] = useState(true);

  const src = useMemo(
    () => (isMobile ? "/video/iks-zolotoy-mobile.mp4" : "/video/iks-zolotoy-web-full.mp4"),
    [isMobile]
  );

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 768px)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setIsMobile(mqMobile.matches);
      setReduceMotion(mqReduce.matches);
    };
    apply();
    mqMobile.addEventListener?.("change", apply);
    mqReduce.addEventListener?.("change", apply);
    return () => {
      mqMobile.removeEventListener?.("change", apply);
      mqReduce.removeEventListener?.("change", apply);
    };
  }, []);

  useEffect(() => {
    const el = videoRef.current?.closest("section");
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? true),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduceMotion) {
      v.pause();
      return;
    }
    if (inView) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      v.pause();
    }
  }, [reduceMotion, inView, src]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {reduceMotion ? (
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(/img/iks-zolotoy-poster.jpg)` }}
          aria-hidden="true"
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/img/iks-zolotoy-poster.jpg"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/55" />
    </section>
  );
}
