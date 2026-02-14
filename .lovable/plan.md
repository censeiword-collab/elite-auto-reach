

## Полная переработка GarageHero: премиум "игровая сцена"

Один файл: `src/components/GarageHero.tsx`. Без новых зависимостей.

---

### 1. Многослойный фон (5 div-слоев)

Заменить текущие 2 слоя (bg + overlay) на 5:

- **Base**: `bg.jpg` через `backgroundImage`, `bg-cover bg-center`
- **Dark overlay**: `bg-black/60`
- **Spotlights**: div с `background: radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.07) 0%, transparent 60%), radial-gradient(ellipse at 70% 0%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 10%, rgba(255,255,255,0.04) 0%, transparent 40%)`
- **Floor**: div внизу (h-1/3, bottom-0) с `bg-gradient-to-t from-black/85 via-black/50 to-transparent`
- **Vignette**: div с `background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.85) 100%)`

### 2. Убрать белый прямоугольник у машины

- На `<motion.img>` добавить `style={{ mixBlendMode: "multiply" }}` -- убирает белый фон на темной подложке
- Добавить `filter: drop-shadow(0 18px 35px rgba(0,0,0,0.55))`
- Под машиной -- div-эллипс тени (absolute, bottom, w-2/3, h-4, bg-black/40, blur-xl, rounded-full)
- Отражение: дубликат `<img>` (не motion) с:
  - `transform: scaleY(-1)`
  - `filter: blur(6px)`
  - `opacity: 0.15`
  - `WebkitMaskImage` и `maskImage: linear-gradient(to top, transparent, rgba(0,0,0,1))`
  - Позиционирование сразу под основным изображением

### 3. Компоновка

**Desktop (md+)**:
- Контейнер: `flex md:flex-row flex-col-reverse`, `max-w-7xl mx-auto`
- Зона машины: `flex-[7] relative` с `items-center justify-center`
- Панель: `w-[340px] lg:w-[380px] shrink-0`, вертикально центрирована (`flex flex-col justify-center`)
- Стрелки: `left-4` и `right-4` внутри зоны машины (не выходят за нее)

**Mobile**: панель сверху, машина снизу (flex-col-reverse как сейчас)

### 4. HUD панель -- underline selects

Заменить стиль триггеров:
- Убрать: `bg-white/5`, `border border-white/10`, `rounded-lg`, `px-4 py-3`
- Вместо: `w-full flex items-center justify-between pb-2 border-b border-white/20 text-white cursor-pointer hover:border-white/40 transition-colors`
- Label: `text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-1.5`
- Value: `text-sm font-medium`

Dropdown:
- `bg-[#12121f] rounded-xl shadow-2xl border border-white/10`
- Item hover: `hover:bg-white/[0.08]`
- У цветов: swatch кружок слева
- `rollsAvailable === 0`: серый текст `text-white/30`, приписка "(нет в наличии)", `pointer-events-none`

### 5. Кнопки

- Основная: `rounded-full border border-white/25 py-3 text-sm font-semibold`; при `rollsAvailable===0` -- `opacity-40 cursor-not-allowed pointer-events-none`
- WhatsApp: `border-emerald-500/30 text-emerald-400/80 text-xs` -- тоньше, не перетягивает

### 6. Интерактив

**Смена кадра (framer-motion)**:
- `initial={{ opacity: 0, scale: 1.015 }}`
- `animate={{ opacity: 1, scale: 1 }}`
- `transition={{ duration: 0.2 }}`

**Hover стрелок**: `hover:scale-110 hover:bg-black/70` (через tailwind transition-all)

**Параллакс**:
- `useRef` для хранения offset X/Y
- `onMouseMove` на section: вычислять смещение от центра
- Фон: `translate` 1-2px через style на bg div
- Машина: `translate` 4-6px через style на car container
- Отключить если `isMobile` или `prefers-reduced-motion: reduce` (проверка через `useState` + `useEffect` с `matchMedia`)

**Клавиатура** (`useEffect`):
- `ArrowLeft` -- prevFrame
- `ArrowRight` -- nextFrame
- `Escape` -- закрыть оба dropdown

**Click outside** (`useEffect` с `pointerdown`):
- ref на панель
- если клик не внутри ref -- закрыть оба dropdown

**Свайп на мобиле**:
- `useState` для touchStartX
- `onTouchStart`: сохранить `e.touches[0].clientX`
- `onTouchEnd`: если `|deltaX| > 50` -- prev/next

### 7. Производительность

`useEffect` при смене `selectedCar`:
- Цикл `for (let i = 1; i <= selectedCar.frames; i++)` -- `new Image().src = path`
- В DOM только текущий кадр + его отражение

### 8. Что сохраняется без изменений

- Все state-переменные и их имена
- `useSearchParams` для `carId`/`colorId`
- `navigate(\`/colors/${selectedColor.id}\`)`
- `frameIndex` reset при смене авто/цвета
- WhatsApp URL с тем же текстом
- Логотип SUNMAX KZN (та же разметка)
- Импорты из `@/data/garageCars` и `@/data/filmColors`

---

### Структура JSX (итоговая)

```text
<section onMouseMove={parallax} className="relative min-h-[80vh] overflow-hidden">
  <div ref={bgRef} style={bgTransform} />        -- bg.jpg
  <div />                                          -- dark overlay
  <div style={spotlights} />                       -- lights
  <div />                                          -- floor gradient
  <div style={vignette} />                         -- vignette

  <div className="relative z-10 max-w-7xl mx-auto flex md:flex-row flex-col-reverse ...">

    <!-- Car zone: flex-[7] relative -->
    <div ref={carRef} style={carTransform} onTouchStart/onTouchEnd>
      <img reflection />
      <div shadow-ellipse />
      <AnimatePresence>
        <motion.img car (mixBlendMode multiply, drop-shadow) />
      </AnimatePresence>
      <button arrow-left />
      <button arrow-right />
      <div dots />
    </div>

    <!-- HUD panel: w-[340px] -->
    <div ref={panelRef}>
      logo
      underline-select car
      underline-select color
      availability
      btn primary (disabled if 0)
      btn whatsapp
    </div>
  </div>
</section>
```
