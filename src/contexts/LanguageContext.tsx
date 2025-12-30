import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ar" | "en";

interface Translations {
  // Header
  tagline: string;
  advancedSpeedTest: string;
  
  // Speed Test
  readyToTest: string;
  measuringPing: string;
  measuringDownload: string;
  measuringUpload: string;
  testComplete: string;
  startTest: string;
  testing: string;
  download: string;
  upload: string;
  ping: string;
  jitter: string;
  server: string;
  ipAddress: string;
  isp: string;
  realMeasurement: string;
  
  // Features
  featuresTitle: string;
  featuresSubtitle: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  feature5Title: string;
  feature5Desc: string;
  feature6Title: string;
  feature6Desc: string;
  
  // Footer
  developedBy: string;
  developerName: string;
  location: string;
  allRightsReserved: string;
  
  // History
  historyTitle: string;
  noHistory: string;
  clearHistory: string;
  date: string;
  
  // Fullscreen
  fullscreen: string;
  exitFullscreen: string;
}

const translations: Record<Language, Translations> = {
  ar: {
    // Header
    tagline: "قياس سرعة الإنترنت المتقدم",
    advancedSpeedTest: "اختبار السرعة المتقدم",
    
    // Speed Test
    readyToTest: "جاهز للاختبار",
    measuringPing: "جاري قياس البينج...",
    measuringDownload: "جاري قياس التحميل...",
    measuringUpload: "جاري قياس الرفع...",
    testComplete: "✓ اكتمل الاختبار!",
    startTest: "ابدأ الاختبار",
    testing: "جاري الاختبار",
    download: "تحميل",
    upload: "رفع",
    ping: "بينج",
    jitter: "الجيتر",
    server: "السيرفر",
    ipAddress: "عنوان IP",
    isp: "مزود الخدمة",
    realMeasurement: "قياس حقيقي عبر Cloudflare CDN",
    
    // Features
    featuresTitle: "مميزات SPEDRA",
    featuresSubtitle: "تقنيات متطورة لقياس سرعة الإنترنت",
    feature1Title: "قياس فائق الدقة",
    feature1Desc: "تقنية متقدمة لقياس السرعة بدقة عالية جداً",
    feature2Title: "سرعة البرق",
    feature2Desc: "اختبار سريع يستغرق ثوانٍ معدودة فقط",
    feature3Title: "خصوصية تامة",
    feature3Desc: "لا نحتفظ بأي بيانات خاصة بك",
    feature4Title: "سيرفرات عالمية",
    feature4Desc: "شبكة واسعة من السيرفرات حول العالم",
    feature5Title: "تقارير مفصلة",
    feature5Desc: "إحصائيات شاملة عن أداء اتصالك",
    feature6Title: "تصميم متجاوب",
    feature6Desc: "يعمل على جميع الأجهزة بكفاءة",
    
    // Footer
    developedBy: "تم التطوير بواسطة",
    developerName: "أحمد نور أحمد",
    location: "قنا، مصر",
    allRightsReserved: "جميع الحقوق محفوظة",
    
    // History
    historyTitle: "سجل النتائج",
    noHistory: "لا توجد نتائج سابقة",
    clearHistory: "مسح السجل",
    date: "التاريخ",
    
    // Fullscreen
    fullscreen: "ملء الشاشة",
    exitFullscreen: "خروج من ملء الشاشة",
  },
  en: {
    // Header
    tagline: "Advanced Internet Speed Test",
    advancedSpeedTest: "Advanced Speed Test",
    
    // Speed Test
    readyToTest: "Ready to test",
    measuringPing: "Measuring ping...",
    measuringDownload: "Measuring download...",
    measuringUpload: "Measuring upload...",
    testComplete: "✓ Test complete!",
    startTest: "Start Test",
    testing: "Testing",
    download: "Download",
    upload: "Upload",
    ping: "Ping",
    jitter: "Jitter",
    server: "Server",
    ipAddress: "IP Address",
    isp: "ISP",
    realMeasurement: "Real measurement via Cloudflare CDN",
    
    // Features
    featuresTitle: "SPEDRA Features",
    featuresSubtitle: "Advanced technologies for internet speed measurement",
    feature1Title: "Ultra Precision",
    feature1Desc: "Advanced technology for highly accurate speed measurement",
    feature2Title: "Lightning Fast",
    feature2Desc: "Quick test that takes only seconds",
    feature3Title: "Complete Privacy",
    feature3Desc: "We don't store any of your data",
    feature4Title: "Global Servers",
    feature4Desc: "Wide network of servers around the world",
    feature5Title: "Detailed Reports",
    feature5Desc: "Comprehensive statistics about your connection",
    feature6Title: "Responsive Design",
    feature6Desc: "Works efficiently on all devices",
    
    // Footer
    developedBy: "Developed by",
    developerName: "Ahmed Nour Ahmed",
    location: "Qena, Egypt",
    allRightsReserved: "All rights reserved",
    
    // History
    historyTitle: "Results History",
    noHistory: "No previous results",
    clearHistory: "Clear History",
    date: "Date",
    
    // Fullscreen
    fullscreen: "Fullscreen",
    exitFullscreen: "Exit Fullscreen",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("spedra-language");
    return (saved as Language) || "ar";
  });

  useEffect(() => {
    localStorage.setItem("spedra-language", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: language === "ar",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
