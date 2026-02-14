
## CSS-оверлей цвета пленки поверх машины

### Суть изменения

Добавить полупрозрачный div с `background: selectedColor.hex` и `mix-blend-mode: overlay` поверх изображения машины. При смене цвета в селекторе оттенок машины будет визуально меняться.

### Техническая реализация

Файл: `src/components/GarageHero.tsx` (единственное изменение)

**Что добавляется:**

Внутри "Car zone" div (строки 194-267), сразу после `<AnimatePresence>` блока с основным изображением машины (после строки 238), добавить цветовой оверлей:

```tsx
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
```

**Детали:**

- `z-[11]` -- выше машины (z-10), но ниже стрелок (z-20)
- `pointer-events-none` -- не блокирует клики по стрелкам и свайпы
- `opacity: 0.35` -- достаточно для заметного оттенка, но не перекрывает детали машины
- `maskImage` с radial-gradient -- оверлей применяется только в центральной области (где машина), не окрашивая фон/края
- `transition: background 0.3s ease` -- плавная смена цвета при переключении
- Никаких новых зависимостей, ассетов или файлов

### Что не меняется

- Вся бизнес-логика (навигация, query params, WhatsApp, dropdowns)
- Отражение, тени, параллакс, свайп, клавиатура
- Структура остальных слоев сцены
