import { motion } from "framer-motion";
import { BRAND, CONTACT, WORKING_HOURS, WARRANTY } from "@/lib/constants";

const SEOTextSection = () => {
  return (
    <section className="section-container border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
          Премиальный автосервис в Казани — защита, тюнинг и комфорт вашего автомобиля
        </h2>

        <div className="prose prose-invert prose-lg max-w-none text-muted-foreground space-y-6">
          <p>
            <strong className="text-foreground">{BRAND.name}</strong> — ведущий премиальный автосервис в Казани, специализирующийся на защите кузова, тюнинге и повышении комфорта автомобилей премиум-класса. Мы работаем с такими марками, как Porsche, BMW, Mercedes-Benz, Audi, Lexus, Land Rover и другими престижными брендами. Наша команда сертифицированных мастеров использует только профессиональные материалы мировых производителей.
          </p>

          <p>
            <strong className="text-foreground">Оклейка автомобиля полиуретановой плёнкой (PPF) в Казани</strong> — одна из наших ключевых услуг. Мы работаем с лучшими плёнками на рынке: XPEL Ultimate Plus, SunTek PPF, Hexis Bodyfence. Защитная плёнка предохраняет лакокрасочное покрытие от сколов, царапин, реагентов и ультрафиолета. Гарантия на плёнку и работу — {WARRANTY.ppf.display}. Предлагаем как полную оклейку кузова, так и защиту отдельных зон: капота, бамперов, порогов, зеркал.
          </p>

          <p>
            <strong className="text-foreground">Установка активного выхлопа в Казани</strong> позволяет управлять звуком вашего автомобиля с помощью пульта или смартфона. Мы устанавливаем электронные заслонки на любые марки автомобилей, от BMW M-серии до Mercedes-AMG. В режиме «тихий» выхлоп работает штатно, в режиме «спорт» — раскрывается настоящий голос мотора. Идеальное решение для тех, кто ценит драйв, но не хочет привлекать внимание в городе.
          </p>

          <p>
            <strong className="text-foreground">Профессиональная шумоизоляция автомобиля в Казани</strong> — это путь к комфорту премиум-класса. Используем материалы StP, Dynamat, STP GB для комплексной виброизоляции и шумоизоляции. Обрабатываем пол, двери, крышу, багажник, колёсные арки. После нашей работы уровень шума в салоне снижается на 40–60%, а акустика аудиосистемы значительно улучшается. Гарантия — {WARRANTY.soundproofing.display}.
          </p>

          <p>
            <strong className="text-foreground">Удаление вмятин без покраски (PDR) в Казани</strong> — технология беспокрасочного ремонта кузова. Идеально подходит для устранения градовых повреждений, парковочных вмятин и следов от дверей других автомобилей. Главное преимущество — сохранение заводского лакокрасочного покрытия, что особенно важно для премиальных автомобилей и поддержания их рыночной стоимости. Гарантия — {WARRANTY.pdr.display}.
          </p>

          <p>
            <strong className="text-foreground">Установка сигнализации Pandora с автозапуском в Казани</strong> — надёжная защита и максимальный комфорт. Системы Pandora обеспечивают многоуровневую защиту от угона, GPS-мониторинг, автозапуск двигателя и управление со смартфона. Устанавливаем весь модельный ряд: от Pandora DX до Pandora DXL с интеграцией в штатные системы автомобиля. Гарантия — {WARRANTY.pandora.display}.
          </p>

          <p className="text-center text-foreground font-medium">
            Запишитесь на бесплатную консультацию и расчёт стоимости. Работаем по адресу: {CONTACT.address.full}. 
            Телефон: {CONTACT.phone.display}. {WORKING_HOURS.display}. Ждём вас!
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default SEOTextSection;
