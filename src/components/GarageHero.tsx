import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { garageCars, type GarageCar } from "@/lib/garageCars";
import { filmColors, type FilmColor } from "@/lib/filmColors";

const GarageHero = () => {
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState<GarageCar>(garageCars[0]);
  const [selectedColor, setSelectedColor] = useState<FilmColor>(filmColors[0]);
  const [frameIndex, setFrameIndex] = useState(1);
  const [carDropdownOpen, setCarDropdownOpen] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);

  const handleCarChange = useCallback((car: GarageCar) => {
    setSelectedCar(car);
    setFrameIndex(1);
    setCarDropdownOpen(false);
  }, []);

  const handleColorChange = useCallback((color: FilmColor) => {
    setSelectedColor(color);
    setFrameIndex(1);
    setColorDropdownOpen(false);
  }, []);

  const prevFrame = () => {
    setFrameIndex((prev) => (prev <= 1 ? selectedCar.frames : prev - 1));
  };

  const nextFrame = () => {
    setFrameIndex((prev) => (prev >= selectedCar.frames ? 1 : prev + 1));
  };

  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/garage/bg.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/90" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full min-h-[80vh] flex flex-col-reverse md:flex-row items-center gap-6 md:gap-0 py-8 pt-28 md:pt-8">
        {/* Left — Car Image */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={`${selectedCar.slug}-${frameIndex}`}
              src={`/garage/cars/${selectedCar.slug}/${frameIndex}.png`}
              alt={selectedCar.name}
              className="w-full max-w-[700px] h-auto object-contain drop-shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* Frame navigation arrows */}
          <button
            onClick={prevFrame}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all backdrop-blur-sm"
            aria-label="Предыдущий кадр"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextFrame}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all backdrop-blur-sm"
            aria-label="Следующий кадр"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Frame indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {Array.from({ length: selectedCar.frames }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i + 1 === frameIndex ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right — Control Panel */}
        <div className="w-full md:w-[380px] lg:w-[420px] shrink-0 flex flex-col gap-6 p-6 md:p-8">
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

          {/* Car Dropdown */}
          <div className="relative">
            <label className="text-xs uppercase tracking-wider text-white/50 font-semibold mb-2 block">
              Автомобиль
            </label>
            <button
              onClick={() => {
                setCarDropdownOpen(!carDropdownOpen);
                setColorDropdownOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <span className="text-sm font-medium truncate">{selectedCar.name}</span>
              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${carDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {carDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 z-50 rounded-lg bg-[#1a1a2e] border border-white/10 shadow-2xl overflow-hidden">
                {garageCars.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => handleCarChange(car)}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                      car.id === selectedCar.id
                        ? "bg-white/10 text-white font-semibold"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {car.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color Dropdown */}
          <div className="relative">
            <label className="text-xs uppercase tracking-wider text-white/50 font-semibold mb-2 block">
              Цвет плёнки
            </label>
            <button
              onClick={() => {
                setColorDropdownOpen(!colorDropdownOpen);
                setCarDropdownOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <span className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full border border-white/20 shrink-0"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <span className="text-sm font-medium truncate">
                  {selectedColor.code} {selectedColor.label}
                </span>
              </span>
              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${colorDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {colorDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 z-50 rounded-lg bg-[#1a1a2e] border border-white/10 shadow-2xl overflow-hidden">
                {filmColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleColorChange(color)}
                    className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                      color.id === selectedColor.id
                        ? "bg-white/10 text-white font-semibold"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="truncate">{color.code} {color.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="text-sm">
            {selectedColor.rollsAvailable > 0 ? (
              <span className="text-emerald-400 font-medium">
                В наличии: {selectedColor.rollsAvailable} рул.
              </span>
            ) : (
              <span className="text-red-400 font-medium">Нет в наличии</span>
            )}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate(`/colors/${selectedColor.id}`)}
            className="w-full px-6 py-3 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            Все авто / в этом цвете
          </button>
        </div>
      </div>
    </section>
  );
};

export default GarageHero;
