import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Политика конфиденциальности — SUNMAXKZN"
        description="Политика конфиденциальности автостудии SUNMAXKZN в Казани. Информация о сборе, хранении и обработке персональных данных."
      />
      
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">
              Политика конфиденциальности
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Общие положения</h2>
                <p>
                  Настоящая политика конфиденциальности регулирует порядок обработки и использования 
                  персональных данных пользователей сайта SUNMAXKZN (далее — Сайт), расположенного 
                  по адресу sunmaxkzn.ru.
                </p>
                <p>
                  Используя Сайт и предоставляя свои персональные данные, вы соглашаетесь с условиями 
                  настоящей Политики конфиденциальности.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">2. Сбор персональных данных</h2>
                <p>Мы собираем следующие данные:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Имя и фамилия</li>
                  <li>Номер телефона</li>
                  <li>Адрес электронной почты</li>
                  <li>Марка и модель автомобиля</li>
                  <li>Информация о запрашиваемых услугах</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">3. Цели обработки данных</h2>
                <p>Персональные данные используются для:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Связи с вами по вопросам оказания услуг</li>
                  <li>Расчёта стоимости услуг</li>
                  <li>Улучшения качества обслуживания</li>
                  <li>Информирования об акциях и новых услугах (с вашего согласия)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Защита данных</h2>
                <p>
                  Мы принимаем все необходимые меры для защиты ваших персональных данных от 
                  несанкционированного доступа, изменения, раскрытия или уничтожения. 
                  Доступ к персональным данным имеют только уполномоченные сотрудники.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Передача данных третьим лицам</h2>
                <p>
                  Мы не передаём ваши персональные данные третьим лицам, за исключением случаев, 
                  предусмотренных законодательством Российской Федерации.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Ваши права</h2>
                <p>Вы имеете право:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Запросить информацию о хранящихся персональных данных</li>
                  <li>Потребовать исправления неточных данных</li>
                  <li>Отозвать согласие на обработку персональных данных</li>
                  <li>Потребовать удаления ваших данных</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Контактная информация</h2>
                <p>По вопросам, связанным с обработкой персональных данных, обращайтесь:</p>
                <ul className="list-none space-y-2">
                  <li>
                    <strong className="text-foreground">Телефон:</strong>{" "}
                    <a href="tel:+79038687861" className="text-primary hover:underline">
                      +7 (903) 868-78-61
                    </a>
                  </li>
                  <li>
                    <strong className="text-foreground">Email:</strong>{" "}
                    <a href="mailto:info@sunmaxkzn.ru" className="text-primary hover:underline">
                      info@sunmaxkzn.ru
                    </a>
                  </li>
                  <li>
                    <strong className="text-foreground">Адрес:</strong> г. Казань, ул. Техническая, 122
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">8. Изменения в политике</h2>
                <p>
                  Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. 
                  Актуальная версия всегда доступна на данной странице.
                </p>
                <p className="mt-4">
                  <strong className="text-foreground">Последнее обновление:</strong> Февраль 2024
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
