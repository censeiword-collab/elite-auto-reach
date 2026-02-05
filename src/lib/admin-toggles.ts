 // =============================================================
 // SUNMAXKZN — Управляемые флаги для маркетинговых утверждений
 // Эти значения можно менять через админку
 // =============================================================
 
 export interface AdminToggles {
   // Бренды материалов (whitelist)
   whitelistBrands: string[];
   
   // Маркетинговые утверждения
   installmentEnabled: boolean;
   installmentText: string;
   
   authorizedCenterClaimEnabled: boolean;
   authorizedCenterText: string;
   
   noiseReductionPercentEnabled: boolean;
   noiseReductionText: string;
   
   // Адрес (показывать только если заполнен)
   addressEnabled: boolean;
   address: string;
   landmark: string;
 }
 
 export const DEFAULT_ADMIN_TOGGLES: AdminToggles = {
   // По умолчанию whitelist пустой - бренды не показываются
   whitelistBrands: [],
   
   // Рассрочка по умолчанию выключена
   installmentEnabled: false,
   installmentText: "Рассрочка (условия уточняются при записи)",
   
   // Авторизованный центр по умолчанию выключен
   authorizedCenterClaimEnabled: false,
   authorizedCenterText: "Профессиональная установка оборудования",
   
   // Проценты шумоизоляции по умолчанию выключены
   noiseReductionPercentEnabled: false,
   noiseReductionText: "Заметное снижение шума",
   
   // Адрес по умолчанию не показывается
   addressEnabled: false,
   address: "",
   landmark: "",
 };
 
 /**
  * Проверить, есть ли бренд в whitelist
  */
 export const isBrandAllowed = (brand: string, toggles: AdminToggles): boolean => {
   return toggles.whitelistBrands.some(
     (b) => b.toLowerCase() === brand.toLowerCase()
   );
 };
 
 /**
  * Получить текст для рассрочки
  */
 export const getInstallmentText = (toggles: AdminToggles): string | null => {
   if (!toggles.installmentEnabled) return null;
   return toggles.installmentText;
 };
 
 /**
  * Получить текст для авторизованного центра
  */
 export const getAuthorizedCenterText = (toggles: AdminToggles): string => {
   if (toggles.authorizedCenterClaimEnabled) {
     return "Авторизованный установочный центр";
   }
   return toggles.authorizedCenterText;
 };
 
 /**
  * Получить текст для снижения шума
  */
 export const getNoiseReductionText = (toggles: AdminToggles): string => {
   if (toggles.noiseReductionPercentEnabled) {
     return "Снижение шума на 40–60%";
   }
   return toggles.noiseReductionText;
 };
 
 /**
  * Получить адрес (если разрешён)
  */
 export const getAddress = (toggles: AdminToggles): { address: string; landmark: string } | null => {
   if (!toggles.addressEnabled || !toggles.address.trim()) {
     return null;
   }
   return {
     address: toggles.address,
     landmark: toggles.landmark,
   };
 };