import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { filmColors } from "@/data/filmColors";
import { garageCars } from "@/data/garageCars";

const ColorShowcasePage = () => {
  const { colorId } = useParams<{ colorId: string }>();
  const navigate = useNavigate();
  const color = filmColors.find((c) => c.id === colorId);

  if (!color) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Цвет не найден</h1>
          <p className="text-muted-foreground mb-6">Запрашиваемый цвет плёнки не существует.</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-accent transition-colors"
          >
            На главную
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-20 container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
          Все авто в цвете {color.code} {color.label}
        </h1>

        {/* Color info badge */}
        <div className="flex items-center gap-3 mb-10 p-4 rounded-xl bg-card border border-border">
          <span
            className="w-8 h-8 rounded-full border border-border shrink-0"
            style={{ backgroundColor: color.hex }}
          />
          <span className="text-sm font-medium text-foreground">{color.code} {color.label}</span>
          <span className="ml-auto text-sm font-medium">
            {color.rollsAvailable > 0 ? (
              <span className="text-emerald-400">В наличии: {color.rollsAvailable} рул.</span>
            ) : (
              <span className="text-red-400">Нет в наличии</span>
            )}
          </span>
        </div>

        {/* Cars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {garageCars.map((car) => (
            <div
              key={car.id}
              className="rounded-xl border border-border bg-card overflow-hidden group"
            >
              <div className="aspect-[4/3] bg-muted flex items-center justify-center p-4">
                <img
                  src={`/garage/cars/${car.slug}/1.png`}
                  alt={car.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col gap-3">
                <h2 className="text-base font-heading font-semibold text-foreground">{car.name}</h2>
                <button
                  onClick={() => navigate(`/?carId=${car.id}&colorId=${color.id}`)}
                  className="w-full px-4 py-2.5 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-accent transition-colors"
                >
                  Посмотреть в гараже
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ColorShowcasePage;
