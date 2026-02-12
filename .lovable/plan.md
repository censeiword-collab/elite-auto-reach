

## GarageHero — первый экран главной страницы в стиле sunmaxfilms.ru

### Что будет сделано

Создание интерактивного hero-блока с тёмным гаражом, большой машиной слева и панелью управления справа (выбор авто, цвет плёнки, кнопка перехода). Круглые стрелки переключают кадры (ракурсы) машины.

### Новые файлы

**1. `src/lib/garageCars.ts`** — данные по автомобилям
- Типизация `GarageCar` (id, name, slug, frames)
- Массив из 3 машин: Mercedes G-Class, Mercedes GLE, Toyota LC300

**2. `src/lib/filmColors.ts`** — данные по цветам плёнки
- Типизация `FilmColor` (id, label, code, hex, rollsAvailable)
- 4 цвета: Black Gloss, Maple Yellow, Nardo Gray, White Gloss Pearl

**3. `src/components/GarageHero.tsx`** — основной компонент
- Секция `min-h-[80vh]` с фоновой картинкой тёмного гаража (`/garage/bg.jpg`) и тёмным градиентом поверх
- Слева: большое изображение машины (`/garage/cars/{slug}/{frame}.png`), плавная смена кадра (fade через `AnimatePresence` из framer-motion)
- Круглые кнопки-стрелки (prev/next) поверх изображения для переключения кадров по кругу
- Справа: панель с логотипом SUNMAX (существующий стиль из Header), кастомный dropdown выбора авто, кастомный dropdown выбора цвета (с цветным кружком-swatch и кодом), строка "В наличии: X рул." / "Нет в наличии", pill-кнопка "Все авто / в этом цвете" с переходом на `/colors/{colorId}`
- Адаптив: на мобиле панель сверху, машина ниже (flex-col-reverse на `md:` breakpoint)

**4. Заглушки изображений**
- `public/garage/bg.jpg` — тёмный фон-заглушка (сгенерированное тёмное изображение гаража)
- `public/garage/cars/mercedes_g_class/1.png` ... `8.png` — заглушки (одно изображение продублировано)
- `public/garage/cars/mercedes_gle_class/1.png` ... `8.png`
- `public/garage/cars/toyota_lc300/1.png` ... `8.png`

### Изменения в существующих файлах

**5. `src/pages/Index.tsx`**
- Импорт `GarageHero`
- Вставка `<GarageHero />` первым блоком в `<main>`, перед `<HeroSection />`

### Поведение компонента

- По умолчанию: первая машина из списка, первый цвет, кадр 1
- При смене авто или цвета — frameIndex сбрасывается на 1
- Кнопки-стрелки переключают кадры по кругу (1 -> 2 -> ... -> 8 -> 1)
- Плавная анимация смены кадра (fade-transition)
- Dropdowns кастомные, с тёмным фоном (не прозрачные), высокий z-index

### Технические детали

- Используются существующие зависимости: `framer-motion` (анимации), `lucide-react` (иконки стрелок ChevronLeft/ChevronRight), `react-router-dom` (навигация по клику кнопки)
- Стилизация: Tailwind CSS, тёмная тема проекта, шрифты Manrope/Inter
- Dropdowns реализованы через внутренний state (useState), без Radix — для полного контроля стиля в соответствии с референсом

