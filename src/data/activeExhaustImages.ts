// Active exhaust model images registry
// To add images for a model:
// 1. Place photos in public/img/active-exhaust/<model-slug>/  (e.g. public/img/active-exhaust/x5/)
// 2. Add an entry below: "x5": ["/img/active-exhaust/x5/1.jpg", ...]

export const EXHAUST_IMAGES: Record<string, string[]> = {
  // Example:
  // "x5": [
  //   "/img/active-exhaust/x5/1.jpg",
  //   "/img/active-exhaust/x5/2.jpg",
  // ],
};

export function getExhaustImages(modelSlug: string): string[] | undefined {
  const imgs = EXHAUST_IMAGES[modelSlug];
  return imgs && imgs.length > 0 ? imgs : undefined;
}
