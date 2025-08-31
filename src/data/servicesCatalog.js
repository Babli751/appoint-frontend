export const getServicesCatalog = (language) => {
  const t = {
    haircut: language === 'en' ? 'Haircuts' : language === 'tr' ? 'Saç Kesimleri' : 'Стрижки',
    classicCut: language === 'en' ? 'Classic Cut' : language === 'tr' ? 'Klasik Kesim' : 'Классическая стрижка',
    modernFade: language === 'en' ? 'Modern Fade' : language === 'tr' ? 'Modern Fade' : 'Современный фейд',
    beardTrim: language === 'en' ? 'Beard Trim' : language === 'tr' ? 'Sakal Düzeltme' : 'Стрижка бороды',

    shaving: language === 'en' ? 'Shaving' : language === 'tr' ? 'Tıraş' : 'Бритье',
    hotTowelShave: language === 'en' ? 'Hot Towel Shave' : language === 'tr' ? 'Sıcak Havlu Tıraş' : 'Бритье горячим полотенцем',
    beardStyling: language === 'en' ? 'Beard Styling' : language === 'tr' ? 'Sakal Şekillendirme' : 'Стайлинг бороды',
    mustacheTrim: language === 'en' ? 'Mustache Trim' : language === 'tr' ? 'Bıyık Düzeltme' : 'Стрижка усов',

    styling: language === 'en' ? 'Hair Styling' : language === 'tr' ? 'Saç Şekillendirme' : 'Укладка волос',
    washStyle: language === 'en' ? 'Wash & Style' : language === 'tr' ? 'Yıkama & Şekillendirme' : 'Мытье и укладка',
    hairColor: language === 'en' ? 'Hair Color' : language === 'tr' ? 'Saç Boyama' : 'Окрашивание волос',
    hairTreatment: language === 'en' ? 'Hair Treatment' : language === 'tr' ? 'Saç Bakım' : 'Уход за волосами',

    premium: language === 'en' ? 'Premium Services' : language === 'tr' ? 'Premium Hizmetler' : 'Премиум услуги',
    gentlemansPackage: language === 'en' ? "Gentleman's Package" : language === 'tr' ? 'Centilmen Paketi' : 'Джентльменский пакет',
    scalpMassage: language === 'en' ? 'Scalp Massage' : language === 'tr' ? 'Kafa Derisi Masajı' : 'Массаж кожи головы',
    facialTreatment: language === 'en' ? 'Facial Treatment' : language === 'tr' ? 'Yüz Bakımı' : 'Уход за лицом'
  };

  const catalog = [
    {
      id: 'haircut',
      name: t.haircut,
      services: [
        { id: 'classic-cut', name: t.classicCut, duration: 30, price: 25, flags: { popular: true, traditional: true } },
        { id: 'modern-fade', name: t.modernFade, duration: 45, price: 35, flags: { popular: true } },
        { id: 'beard-trim', name: t.beardTrim, duration: 20, price: 18, flags: {} }
      ]
    },
    {
      id: 'shaving',
      name: t.shaving,
      services: [
        { id: 'hot-towel-shave', name: t.hotTowelShave, duration: 30, price: 30, flags: { traditional: true } },
        { id: 'beard-styling', name: t.beardStyling, duration: 25, price: 22, flags: {} },
        { id: 'mustache-trim', name: t.mustacheTrim, duration: 15, price: 15, flags: {} }
      ]
    },
    {
      id: 'styling',
      name: t.styling,
      services: [
        { id: 'wash-style', name: t.washStyle, duration: 25, price: 20, flags: { popular: true } },
        { id: 'hair-color', name: t.hairColor, duration: 90, price: 45, flags: {} },
        { id: 'hair-treatment', name: t.hairTreatment, duration: 40, price: 28, flags: {} }
      ]
    },
    {
      id: 'premium',
      name: t.premium,
      services: [
        { id: 'gentlemans-package', name: t.gentlemansPackage, duration: 90, price: 65, flags: { premium: true } },
        { id: 'scalp-massage', name: t.scalpMassage, duration: 30, price: 25, flags: { premium: true } },
        { id: 'facial-treatment', name: t.facialTreatment, duration: 50, price: 40, flags: { premium: true } }
      ]
    }
  ];

  // flatten to services list
  const services = catalog.flatMap(c => c.services.map(s => ({ ...s, categoryId: c.id, categoryName: c.name })));
  return { catalog, services };
};
