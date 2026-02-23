import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, ImageOff } from "lucide-react";

const PHOTOS = [
  { src: "/img/ppf-process/01-prep.webp", alt: "Подготовка автомобиля к оклейке" },
  { src: "/img/ppf-process/02-degrease.webp", alt: "Обезжиривание поверхности" },
  { src: "/img/ppf-process/03-apply.webp", alt: "Нанесение PPF-плёнки" },
  { src: "/img/ppf-process/04-squeegee.webp", alt: "Разглаживание плёнки ракелем" },
  { src: "/img/ppf-process/05-edges.webp", alt: "Проработка краёв и стыков" },
  { src: "/img/ppf-process/06-finish.webp", alt: "Финальный результат оклейки" },
];

function PhotoCard({
  photo,
  index,
  onOpen,
}: {
  photo: (typeof PHOTOS)[0];
  index: number;
  onOpen: (i: number) => void;
}) {
  const [error, setError] = useState(false);

  return (
    <button
      onClick={() => !error && onOpen(index)}
      className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {error ? (
        <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
          <ImageOff className="w-8 h-8" />
          <span className="text-xs">Фото скоро добавим</span>
        </div>
      ) : (
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          onError={() => setError(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
    </button>
  );
}

const PPFProcessGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = () =>
    setLightboxIndex((c) => (c !== null ? (c - 1 + PHOTOS.length) % PHOTOS.length : null));
  const next = () =>
    setLightboxIndex((c) => (c !== null ? (c + 1) % PHOTOS.length : null));

  return (
    <>
      {/* Desktop: 2-column grid */}
      <div className="hidden md:grid grid-cols-2 gap-3">
        {PHOTOS.map((p, i) => (
          <PhotoCard key={p.src} photo={p} index={i} onOpen={openLightbox} />
        ))}
      </div>

      {/* Mobile: horizontal scroll */}
      <div
        ref={scrollRef}
        className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-1 px-1"
      >
        {PHOTOS.map((p, i) => (
          <div key={p.src} className="snap-start shrink-0 w-[70vw] max-w-[280px]">
            <PhotoCard photo={p} index={i} onOpen={openLightbox} />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-3xl p-0 bg-background/95 backdrop-blur border-border overflow-hidden">
          <DialogTitle className="sr-only">
            {lightboxIndex !== null ? PHOTOS[lightboxIndex].alt : "Фото"}
          </DialogTitle>
          {lightboxIndex !== null && (
            <div className="relative">
              <img
                src={PHOTOS[lightboxIndex].src}
                alt={PHOTOS[lightboxIndex].alt}
                className="w-full max-h-[80vh] object-contain"
              />
              <p className="text-center text-sm text-muted-foreground py-3 px-4">
                {PHOTOS[lightboxIndex].alt}
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/80 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/80 rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
              <span className="absolute top-3 left-3 text-xs text-muted-foreground bg-background/60 rounded-full px-2 py-1">
                {lightboxIndex + 1} / {PHOTOS.length}
              </span>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PPFProcessGallery;
