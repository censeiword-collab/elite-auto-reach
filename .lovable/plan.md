

# Замена виджета отзывов на карту Яндекс с отзывами

## Что изменится

В файле `src/components/home/ReviewsSection.tsx` заменим текущий iframe-виджет отзывов на новый виджет карты Яндекс с отзывами организации.

## Технические детали

**Файл:** `src/components/home/ReviewsSection.tsx`

Заменим блок с текущим iframe (строки 64-92) на новый виджет:
- Новый iframe src: `https://yandex.ru/map-widget/v1/org/sunmax_kzn/97524296927/reviews/?ll=49.127740%2C55.817396&utm_medium=s&utm_source=maps-reviews-widget&z=16`
- Три ссылки-атрибуции сверху (Sunmax-Kzn, Оклейка машин в Казани, Студия тюнинга в Казани)
- Размеры: max-width 560px, height 400px, адаптивная ширина 100%
- Удалим старую ссылку-атрибуцию внизу

