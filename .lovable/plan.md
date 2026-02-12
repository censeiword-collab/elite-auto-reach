

## Динамические настройки из админки в SEO-микроразметку SchemaOrg

### Проблема
Сейчас компонент `SchemaOrg` использует захардкоженный объект `sunmaxBusinessData` с фиксированными данными (адрес, телефон, координаты, соцсети). Даже если администратор обновит контактные данные в админ-панели, микроразметка Schema.org останется со старыми значениями.

### Решение
Заменить статический экспорт `sunmaxBusinessData` на динамические данные из хука `useSiteSettings`. Все страницы, использующие SchemaOrg с типами LocalBusiness и Organization, будут автоматически получать актуальные данные из админки.

### Затрагиваемые файлы

1. **src/components/seo/SchemaOrg.tsx**
   - Добавить хелпер-функцию `buildBusinessData(settings)`, которая формирует объект `LocalBusinessSchema` из данных `useSiteSettings`
   - Экспортировать эту функцию вместо статического `sunmaxBusinessData`

2. **src/pages/Index.tsx**
   - Подключить `useSiteSettings`
   - Заменить `sunmaxBusinessData` на динамический `buildBusinessData(settings)`

3. **src/pages/AboutPage.tsx**
   - Аналогично: подключить `useSiteSettings` и передать динамические данные в SchemaOrg type="Organization"

4. **src/pages/CasesPage.tsx**
   - Аналогично: подключить `useSiteSettings` и передать динамические данные в SchemaOrg type="LocalBusiness"

### Техническая реализация

Новая функция `buildBusinessData` в `SchemaOrg.tsx`:
```typescript
export function buildBusinessData(settings: {
  brandName: string;
  positioning: string;
  address: string;
  phone: string;
  lat: number;
  lon: number;
  vk: string;
  telegram: string;
  instagram: string;
}): LocalBusinessSchema {
  return {
    name: `${settings.brandName} — ${settings.positioning}`,
    description: settings.positioning,
    url: "https://sunmaxkzn.ru",
    telephone: settings.phone,
    address: {
      streetAddress: settings.address,
      addressLocality: "Казань",
      addressRegion: "Республика Татарстан",
      postalCode: "420000",
      addressCountry: "RU",
    },
    geo: { latitude: settings.lat, longitude: settings.lon },
    openingHours: ["Mo-Su 09:00-21:00"],
    priceRange: "₽₽₽",
    image: "https://sunmaxkzn.ru/og-image.jpg",
  };
}
```

На каждой странице:
```typescript
const { settings } = useSiteSettings();
const businessData = buildBusinessData(settings);
// ...
<SchemaOrg type="LocalBusiness" data={businessData} />
```

Старый статический `sunmaxBusinessData` будет сохранён как фоллбэк, но основной путь будет через динамические данные.
