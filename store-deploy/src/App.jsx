
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Globe,
  ChevronLeft,
  ShoppingBag,
  Home,
  Grid3x3,
  Package,
  Heart,
  User,
  MessageCircle,
  HelpCircle,
  Copy,
  Check,
  MapPin,
  Phone,
  CreditCard,
  Upload,
  Ruler,
  Trash2,
  Plus,
  Edit2,
  X,
  Save,
  Play,
  AlertCircle,
  CheckCircle2,
  Settings,
} from "lucide-react";

/* ----------------------------------------------------------------
   PALETTE
   Ink Plum #1F3D2C · Ivory #F7F2EA · Brick Gold #3F6B4F
   Dusty Rose #C08A87 · Sage #7C8C6C · Charcoal #2A2420
   ---------------------------------------------------------------- */
const INK = "#1F3D2C";
const IVORY = "#F6E9C6";
const GOLD = "#3F6B4F";
const CHARCOAL = "#2A2420";

const T = {
  ru: {
    chooseLang: "Выберите язык", tagline: "Скромная мода, сшитая с заботой", continue: "Продолжить",
    home: "Главная", catalog: "Каталог", cart: "Корзина", orders: "Заказы",
    dresses: "Платья", scarves: "Платки", namaznik: "Намазники",
    seasonWinter: "Осень / Зима", seasonSummer: "Весна / Лето", newArrivals: "Новинки", all: "Все",
    color: "Цвет", size: "Размер", fabric: "Ткань",
    fitTitle: "Подойдёт ли мне?", fitDesc: "Наша одежда свободного кроя (оверсайз). Ориентир по росту и весу:",
    addToCart: "В корзину", added: "Добавлено", yourCart: "Ваша корзина",
    emptyCart: "Корзина пуста", emptyCartSub: "Загляните в каталог, чтобы что-то выбрать",
    total: "Итого", checkout: "Оформить заказ", remove: "Удалить",
    deliveryTitle: "Доставка", deliverySub: "Отправьте геолокацию и номер телефона — мы свяжемся с курьером",
    shareLocation: "Отправить геолокацию", locationShared: "Геолокация получена",
    phoneLabel: "Номер телефона", phonePlaceholder: "+998 90 123 45 67",
    deliveryEstimate: "Ташкент — около 12 часов. Другие регионы — 1–2 рабочих дня (доставка BTS).",
    paymentTitle: "Оплата", paymentSub: "Переведите сумму на карту ниже и прикрепите чек. Заказ подтверждается вручную нашим сотрудником.",
    cardNumber: "Номер карты", uploadCheck: "Прикрепить чек", uploadedCheck: "Чек прикреплён",
    placeOrder: "Отправить заказ", orderSentTitle: "Заказ отправлен",
    orderSentSub: "Мы проверим оплату и подтвердим заказ в течение короткого времени. Курьер свяжется с вами по указанному номеру.",
    backToHome: "На главную", fitFrom: "от", height: "рост", weightUpTo: "вес до",
    oversizeNote: "Оверсайз — при сомнении берите размер меньше", freeSize: "Свободный размер",
    notSureChat: "Не уверены в размере? Напишите нам",
    fabricMore: "Подробнее о ткани →",
    favorites: "Избранное", noFavorites: "Пока нет избранного", noFavoritesSub: "Нажмите на ♥, чтобы сохранить понравившееся",
    profile: "Профиль", chatWithAdmin: "Написать нам", myOrders: "Мои заказы", myOrdersSub: "История заказов появится здесь после оформления покупок.",
    savedAddress: "Последний адрес доставки", noSavedAddress: "Пока нет сохранённого адреса",
    faqBanner: "Частые вопросы и информация о тканях", faqTitle: "Вопросы и ткани", faqEmpty: "Раздел пока пуст",
    faqTileLabel: "Вопросы",
    noProducts: "Пока нет товаров в этой категории", forOwners: "Панель для владельца магазина",
    backToShop: "← Вернуться в магазин",
  },
  en: {
    chooseLang: "Choose your language", tagline: "Modest fashion, made with care", continue: "Continue",
    home: "Home", catalog: "Catalog", cart: "Cart", orders: "Orders",
    dresses: "Dresses", scarves: "Scarves", namaznik: "Namaznik",
    seasonWinter: "Autumn / Winter", seasonSummer: "Spring / Summer", newArrivals: "New arrivals", all: "All",
    color: "Color", size: "Size", fabric: "Fabric",
    fitTitle: "Will it fit me?", fitDesc: "Our pieces are oversized by design. Guideline by height and weight:",
    addToCart: "Add to cart", added: "Added", yourCart: "Your cart",
    emptyCart: "Your cart is empty", emptyCartSub: "Browse the catalog to add something",
    total: "Total", checkout: "Checkout", remove: "Remove",
    deliveryTitle: "Delivery", deliverySub: "Share your location and phone number — we'll arrange the courier",
    shareLocation: "Share location", locationShared: "Location received",
    phoneLabel: "Phone number", phonePlaceholder: "+998 90 123 45 67",
    deliveryEstimate: "Tashkent — about 12 hours. Other regions — 1–2 business days (via BTS delivery).",
    paymentTitle: "Payment", paymentSub: "Transfer the amount to the card below and attach your receipt. Orders are confirmed manually by our team.",
    cardNumber: "Card number", uploadCheck: "Attach receipt", uploadedCheck: "Receipt attached",
    placeOrder: "Send order", orderSentTitle: "Order sent",
    orderSentSub: "We'll verify the payment and confirm your order shortly. Our courier will contact you at the number provided.",
    backToHome: "Back to home", fitFrom: "from", height: "height", weightUpTo: "weight up to",
    oversizeNote: "Runs oversized — size down if unsure", freeSize: "Free size",
    notSureChat: "Not sure about the fit? Chat with us",
    fabricMore: "More about this fabric →",
    favorites: "Favorites", noFavorites: "No favorites yet", noFavoritesSub: "Tap the heart icon to save items you like",
    profile: "Profile", chatWithAdmin: "Chat with us", myOrders: "My orders", myOrdersSub: "Your order history will appear here after you place an order.",
    savedAddress: "Last delivery address", noSavedAddress: "No saved address yet",
    faqBanner: "FAQ & fabric information", faqTitle: "FAQ & Fabrics", faqEmpty: "Nothing here yet",
    faqTileLabel: "FAQ",
    noProducts: "No products in this category yet", forOwners: "Store owner panel",
    backToShop: "← Back to shop",
  },
  uz: {
    chooseLang: "Tilni tanlang", tagline: "G'amxo'rlik bilan tikilgan odobli moda", continue: "Davom etish",
    home: "Bosh sahifa", catalog: "Katalog", cart: "Savat", orders: "Buyurtmalar",
    dresses: "Ko'ylaklar", scarves: "Ro'mollar", namaznik: "Namozliklar",
    seasonWinter: "Kuz / Qish", seasonSummer: "Bahor / Yoz", newArrivals: "Yangi kelganlar", all: "Barchasi",
    color: "Rang", size: "O'lcham", fabric: "Mato",
    fitTitle: "Menga mos keladimi?", fitDesc: "Kiyimlarimiz erkin kesimda (oversize). Bo'y va vazn bo'yicha yo'riqnoma:",
    addToCart: "Savatga qo'shish", added: "Qo'shildi", yourCart: "Sizning savatingiz",
    emptyCart: "Savat bo'sh", emptyCartSub: "Nimadir tanlash uchun katalogga o'ting",
    total: "Jami", checkout: "Buyurtma berish", remove: "O'chirish",
    deliveryTitle: "Yetkazib berish", deliverySub: "Manzil va telefon raqamingizni yuboring — kuryer bilan bog'lanamiz",
    shareLocation: "Manzilni yuborish", locationShared: "Manzil qabul qilindi",
    phoneLabel: "Telefon raqami", phonePlaceholder: "+998 90 123 45 67",
    deliveryEstimate: "Toshkent — taxminan 12 soat. Boshqa hududlar — 1–2 ish kuni (BTS orqali).",
    paymentTitle: "To'lov", paymentSub: "Quyidagi kartaga summani o'tkazing va chekni biriktiring. Buyurtma xodim tomonidan qo'lda tasdiqlanadi.",
    cardNumber: "Karta raqami", uploadCheck: "Chekni biriktirish", uploadedCheck: "Chek biriktirildi",
    placeOrder: "Buyurtmani yuborish", orderSentTitle: "Buyurtma yuborildi",
    orderSentSub: "To'lovni tekshirib, buyurtmangizni tasdiqlaymiz. Kuryerimiz ko'rsatilgan raqam orqali bog'lanadi.",
    backToHome: "Bosh sahifaga", fitFrom: "dan", height: "bo'y", weightUpTo: "vazn",
    oversizeNote: "Oversize — ishonchingiz komil bo'lmasa, kichikroq o'lchamni oling", freeSize: "Erkin o'lcham",
    notSureChat: "O'lcham haqida shubhangiz bormi? Biz bilan yozing",
    fabricMore: "Mato haqida batafsil →",
    favorites: "Sevimlilar", noFavorites: "Hali sevimlilar yo'q", noFavoritesSub: "Yoqqan mahsulotni saqlash uchun ♥ ni bosing",
    profile: "Profil", chatWithAdmin: "Biz bilan yozing", myOrders: "Buyurtmalarim", myOrdersSub: "Buyurtma tarixi buyurtma berganingizdan keyin shu yerda paydo bo'ladi.",
    savedAddress: "Oxirgi yetkazib berish manzili", noSavedAddress: "Hali saqlangan manzil yo'q",
    faqBanner: "Savol-javob va mato haqida", faqTitle: "Savol-javob va mato", faqEmpty: "Hozircha bo'sh",
    faqTileLabel: "Savol-javob",
    noProducts: "Bu toifada hali mahsulotlar yo'q", forOwners: "Do'kon egasi paneli",
    backToShop: "← Do'konga qaytish",
  },
};

const CATEGORIES = [
  { value: "dresses", label: "Платья / Dresses" },
  { value: "scarves", label: "Платки / Scarves" },
  { value: "namaznik", label: "Намазники / Namaznik" },
];
const SEASONS = [
  { value: "all", label: "Круглый год / All year" },
  { value: "winter", label: "Осень-Зима / Autumn-Winter" },
  { value: "summer", label: "Весна-Лето / Spring-Summer" },
];

const SEED_PRODUCTS = [
  {
    id: "p1", category: "dresses", season: "winter", name: "Модель Амира", price: "420000",
    fabric: "Плотный трикотаж, 95% хлопок", freeSize: true, customSizes: "",
    hasFit: true, minHeight: 155, maxHeight: 178, maxWeight: 75, inStock: true,
    colors: [
      { name: "Тёмный шоколад", hex: "#4A342A", imageUrl: "https://picsum.photos/seed/amira-choc/500/650" },
      { name: "Оливковый", hex: "#7C8C6C", imageUrl: "https://picsum.photos/seed/amira-olive/500/650" },
      { name: "Молочный", hex: "#EDE4D3", imageUrl: "https://picsum.photos/seed/amira-milk/500/650" },
    ],
  },
  {
    id: "p2", category: "dresses", season: "summer", name: "Модель Лейла", price: "350000",
    fabric: "Лёгкий лён", freeSize: true, customSizes: "",
    hasFit: true, minHeight: 150, maxHeight: 172, maxWeight: 68, inStock: true,
    colors: [
      { name: "Пудровый", hex: "#C08A87", imageUrl: "https://picsum.photos/seed/layla-powder/500/650" },
      { name: "Небесный", hex: "#9CB4C4", imageUrl: "https://picsum.photos/seed/layla-sky/500/650" },
    ],
  },
  {
    id: "p3", category: "scarves", season: "all", name: "Шарф Дина", price: "120000",
    fabric: "Кашемир", freeSize: true, customSizes: "",
    hasFit: false, minHeight: 150, maxHeight: 180, maxWeight: 80, inStock: true,
    colors: [
      { name: "Графит", hex: "#1F3D2C", imageUrl: "https://picsum.photos/seed/dina-graphite/500/650" },
      { name: "Бордовый", hex: "#7A3B3B", imageUrl: "https://picsum.photos/seed/dina-burgundy/500/650" },
    ],
  },
  {
    id: "p4", category: "namaznik", season: "all", name: "Намазник Сафия", price: "280000",
    fabric: "Мягкий вискозный трикотаж", freeSize: true, customSizes: "",
    hasFit: true, minHeight: 150, maxHeight: 180, maxWeight: 85, inStock: true,
    colors: [
      { name: "Изумрудный", hex: "#3F5A48", imageUrl: "https://picsum.photos/seed/safiya-emerald/500/650" },
      { name: "Пыльная роза", hex: "#3F6B4F", imageUrl: "https://picsum.photos/seed/safiya-gold/500/650" },
    ],
  },
];

const money = (n) => Number(n || 0).toLocaleString("ru-RU") + " сум";

function getTelegramUser() {
  try {
    const tgUser = window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user;
    if (tgUser && tgUser.id) return tgUser;
  } catch (e) {}
  // Fallback for testing outside Telegram (regular browser)
  let anonId = localStorage.getItem("anon_user_id");
  if (!anonId) {
    anonId = "anon_" + Date.now();
    localStorage.setItem("anon_user_id", anonId);
  }
  return { id: anonId, first_name: "Гость" };
}

/* ============================ SHARED DATA HOOK ============================ */
function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storageOk, setStorageOk] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const listResult = await window.storage.list("product:", true);
      const keys = listResult?.keys || [];
      if (keys.length === 0) {
        const items = [];
        for (const p of SEED_PRODUCTS) {
          try {
            await window.storage.set(`product:${p.id}`, JSON.stringify(p), true);
          } catch (e) {
            console.warn("seed save failed", e);
          }
          items.push(p);
        }
        setProducts(items);
        setLoading(false);
        return;
      }
      const items = [];
      for (const key of keys) {
        try {
          const r = await window.storage.get(key, true);
          if (r?.value) items.push(JSON.parse(r.value));
        } catch {}
      }
      items.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      setProducts(items);
    } catch (e) {
      console.warn("storage load failed, using local seed data", e);
      setStorageOk(false);
      setProducts(SEED_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Update the on-screen list immediately; storage sync happens separately
  // and is best-effort, so the UI never blocks on it or appears "broken"
  // if the sandbox storage call is slow or briefly unavailable.
  const upsertLocal = (product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      return exists ? prev.map((p) => (p.id === product.id ? product : p)) : [...prev, product];
    });
  };
  const removeLocal = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return { products, loading, reload: load, upsertLocal, removeLocal, storageOk };
}

/* ============================ SHARED UI ============================ */
function TopBar({ title, onBack, dark }) {
  return (
    <div
      className="sticky top-0 z-20 px-4 py-3 flex items-center gap-3 shadow-sm"
      style={{ background: INK, color: IVORY }}
    >
      {onBack && (
        <button onClick={onBack} className="p-1 -ml-1 rounded-full active:bg-white/10">
          <ChevronLeft size={22} />
        </button>
      )}
      <span className="font-serif text-lg tracking-wide truncate">{title}</span>
    </div>
  );
}

function Toast({ message, kind }) {
  if (!message) return null;
  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full text-base font-medium flex items-center gap-2 shadow-lg text-white"
      style={{ background: kind === "error" ? "#9C5F5C" : "#5C6B4E" }}
    >
      {kind === "error" ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
      {message}
    </div>
  );
}

/* ============================ STOREFRONT ============================ */
function BottomNav({ screen, setScreen, goCatalog, cartCount, t }) {
  const items = [
    { key: "home", icon: Home, label: t.home },
    { key: "catalog", icon: Grid3x3, label: t.catalog },
    { key: "favorites", icon: Heart, label: t.favorites },
    { key: "cart", icon: ShoppingBag, label: t.cart, badge: cartCount },
    { key: "profile", icon: User, label: t.profile },
  ];
  return (
    <div className="fixed bottom-0 inset-x-0 z-20 border-t border-[#1F3D2C]/10 flex justify-around py-2 max-w-md mx-auto" style={{ background: IVORY }}>
      {items.map(({ key, icon: Icon, label, badge }) => {
        const active = screen === key || (key === "catalog" && screen === "category");
        return (
          <button
            key={key}
            onClick={() => (key === "catalog" ? goCatalog() : setScreen(key))}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 relative rounded-2xl"
            style={{ background: active ? `${GOLD}1F` : "transparent" }}
          >
            <Icon size={20} strokeWidth={active ? 2.4 : 1.8} color={active ? GOLD : INK} />
            {badge > 0 && (
              <span className="absolute top-0 right-1.5 bg-[#3F6B4F] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {badge}
              </span>
            )}
            <span className={`text-xs ${active ? "font-medium" : ""}`} style={{ color: active ? GOLD : `${CHARCOAL}99` }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SeasonTag({ season, t }) {
  if (season === "winter")
    return <span className="text-xs uppercase tracking-wider bg-[#7C8C6C]/15 text-[#5C6B4E] px-2 py-0.5 rounded-full">{t.seasonWinter}</span>;
  if (season === "summer")
    return <span className="text-xs uppercase tracking-wider bg-[#C08A87]/15 text-[#9C5F5C] px-2 py-0.5 rounded-full">{t.seasonSummer}</span>;
  return null;
}

function FitGauge({ product, t }) {
  if (!product.hasFit) return null;
  const scaleMin = 140, scaleMax = 190;
  const leftPct = ((product.minHeight - scaleMin) / (scaleMax - scaleMin)) * 100;
  const widthPct = ((product.maxHeight - product.minHeight) / (scaleMax - scaleMin)) * 100;
  return (
    <div className="bg-[#1F3D2C]/[0.04] rounded-2xl p-4 mt-4">
      <div className="flex items-center gap-2 mb-1.5">
        <Ruler size={16} color={GOLD} />
        <span className="font-medium text-base" style={{ color: CHARCOAL }}>{t.fitTitle}</span>
      </div>
      <p className="text-sm text-[#2A2420]/70 mb-3 leading-relaxed">{t.fitDesc}</p>
      <div className="relative h-2 rounded-full bg-[#1F3D2C]/10 mb-2">
        <div className="absolute h-2 rounded-full" style={{ left: `${leftPct}%`, width: `${widthPct}%`, background: GOLD }} />
      </div>
      <div className="flex justify-between text-xs text-[#2A2420]/60 mb-3">
        <span>{scaleMin}cm</span><span>{scaleMax}cm</span>
      </div>
      <div className="flex gap-4 text-sm" style={{ color: CHARCOAL }}>
        <div><span className="text-[#2A2420]/50">{t.height}: </span><span className="font-medium">{t.fitFrom} {product.minHeight}–{product.maxHeight}cm</span></div>
        <div><span className="text-[#2A2420]/50">{t.weightUpTo}: </span><span className="font-medium">{product.maxWeight}kg</span></div>
      </div>
      <a href={"https://t.me/" + ADMIN_TELEGRAM_USERNAME} target="_blank" rel="noreferrer" className="text-xs mt-2 italic underline block" style={{ color: "#9C5F5C" }}>
        {t.notSureChat}
      </a>
    </div>
  );
}

const DEFAULT_HOME_IMAGES = {
  hero: "https://picsum.photos/seed/hero-collection/800/600",
  dresses: "https://picsum.photos/seed/cat-dresses/300/300",
  scarves: "https://picsum.photos/seed/cat-scarves/300/300",
  namaznik: "https://picsum.photos/seed/cat-namaznik/300/300",
  faq: "https://picsum.photos/seed/faq-info/300/300",
  bannerWinter: "https://picsum.photos/seed/banner-winter/400/300",
  bannerSummer: "https://picsum.photos/seed/banner-summer/400/300",
};

function HomeScreen({ t, setScreen, setActiveCategory, setActiveSeason, goAdmin, homeImages }) {
  const imgs = { ...DEFAULT_HOME_IMAGES, ...(homeImages || {}) };
  const cats = [
    { key: "dresses", label: t.dresses, img: imgs.dresses },
    { key: "scarves", label: t.scarves, img: imgs.scarves },
    { key: "namaznik", label: t.namaznik, img: imgs.namaznik },
    { key: "faq", label: t.faqTileLabel, img: imgs.faq },
  ];
  return (
    <div className="pb-24">
      <div className="pt-5 pb-2 px-5 text-center">
        <h1 className="font-serif text-3xl tracking-[0.15em]" style={{ color: INK }}>SAFHA</h1>
        <p className="text-xs tracking-wide mt-0.5" style={{ color: `${CHARCOAL}80` }}>{t.tagline}</p>
      </div>
      <div className="relative h-40 flex items-end p-5" style={{
        backgroundImage: `linear-gradient(180deg, rgba(74,58,22,0.15), rgba(74,58,22,0.85)), url(${imgs.hero})`,
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
      </div>
      <div className="px-4 mt-4">
        <div className="flex gap-3">
          <button onClick={() => { setActiveCategory("dresses"); setActiveSeason("winter"); setScreen("category"); }} className="flex-1 rounded-2xl overflow-hidden relative h-24" style={{
            backgroundImage: `linear-gradient(180deg, rgba(74,58,22,0.1), rgba(74,58,22,0.75)), url(${imgs.bannerWinter})`,
            backgroundSize: "cover", backgroundPosition: "center",
          }}>
            <span className="absolute bottom-2.5 left-3 font-serif text-base font-semibold" style={{ color: IVORY }}>{t.seasonWinter}</span>
          </button>
          <button onClick={() => { setActiveCategory("dresses"); setActiveSeason("summer"); setScreen("category"); }} className="flex-1 rounded-2xl overflow-hidden relative h-24" style={{
            backgroundImage: `linear-gradient(180deg, rgba(74,58,22,0.1), rgba(74,58,22,0.75)), url(${imgs.bannerSummer})`,
            backgroundSize: "cover", backgroundPosition: "center",
          }}>
            <span className="absolute bottom-2.5 left-3 font-serif text-base font-semibold" style={{ color: IVORY }}>{t.seasonSummer}</span>
          </button>
        </div>
      </div>
      <div className="px-4 mt-4">
        <h2 className="font-serif text-xl mb-3" style={{ color: CHARCOAL }}>{t.catalog}</h2>
        <div className="grid grid-cols-3 gap-3">
          {cats.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                if (c.key === "faq") {
                  setScreen("faq");
                } else {
                  setActiveCategory(c.key);
                  setActiveSeason("all");
                  setScreen("category");
                }
              }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-full aspect-square rounded-2xl bg-cover bg-center border border-[#1F3D2C]/10" style={{ backgroundImage: `url(${c.img})` }} />
              <span className="font-serif text-base font-semibold" style={{ color: INK }}>{c.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 mt-8 text-center">
        <button onClick={goAdmin} className="text-sm inline-flex items-center gap-1.5" style={{ color: `${CHARCOAL}66` }}>
          <Settings size={12} /> {t.forOwners}
        </button>
      </div>
    </div>
  );
}

function CategoryScreen({ t, products, category, season, setSeason, setActiveCategory, openProduct, setScreen, favorites, toggleFavorite }) {
  const catLabel = category === "all" ? t.catalog : { dresses: t.dresses, scarves: t.scarves, namaznik: t.namaznik }[category];
  const list = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      p.inStock !== false &&
      (season === "all" || p.season === season || p.season === "all")
  );
  const showSeasonFilter = category === "dresses";
  const showCategoryChips = category === "all";

  return (
    <div className="pb-24">
      <TopBar title={catLabel} onBack={() => setScreen("home")} />
      {showCategoryChips && (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          {[
            { key: "all", label: t.all },
            { key: "dresses", label: t.dresses },
            { key: "scarves", label: t.scarves },
            { key: "namaznik", label: t.namaznik },
          ].map((c) => (
            <button key={c.key} onClick={() => setActiveCategory(c.key)} className="px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap border" style={{
              background: category === c.key ? INK : "transparent", color: category === c.key ? IVORY : `${CHARCOAL}B3`,
              borderColor: category === c.key ? INK : "rgba(31,61,44,0.2)",
            }}>
              {c.label}
            </button>
          ))}
        </div>
      )}
      {showSeasonFilter && (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          {[{ key: "all", label: t.all }, { key: "winter", label: t.seasonWinter }, { key: "summer", label: t.seasonSummer }].map((s) => (
            <button key={s.key} onClick={() => setSeason(s.key)} className="px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap border" style={{
              background: season === s.key ? INK : "transparent", color: season === s.key ? IVORY : `${CHARCOAL}B3`,
              borderColor: season === s.key ? INK : "rgba(31,61,44,0.2)",
            }}>
              {s.label}
            </button>
          ))}
        </div>
      )}
      {list.length === 0 ? (
        <p className="text-base text-center py-16" style={{ color: `${CHARCOAL}66` }}>{t.noProducts}</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4 mt-1">
          {list.map((p) => {
            const isFav = favorites.includes(p.id);
            return (
              <div key={p.id} className="text-left">
                <div className="relative mb-2">
                  <button onClick={() => openProduct(p)} className="w-full block text-left">
                    <div className="w-full aspect-[3/4] rounded-2xl bg-cover bg-center border border-[#1F3D2C]/10" style={{
                      backgroundImage: p.colors?.[0]?.imageUrl ? `url(${p.colors[0].imageUrl})` : (p.colors?.[0]?.hex2 ? `linear-gradient(135deg, ${p.colors[0].hex} 50%, ${p.colors[0].hex2} 50%)` : undefined),
                      backgroundColor: p.colors?.[0]?.hex || "#eee",
                    }} />
                    {p.colors?.[0]?.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
                          <Play size={16} color="#fff" fill="#fff" />
                        </div>
                      </div>
                    )}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(p.id); }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/85 flex items-center justify-center"
                  >
                    <Heart size={15} color={isFav ? "#9C5F5C" : CHARCOAL} fill={isFav ? "#9C5F5C" : "none"} />
                  </button>
                </div>
                <button onClick={() => openProduct(p)} className="w-full text-left">
                  <p className="text-base font-medium leading-snug" style={{ color: CHARCOAL }}>{p.name}</p>
                  <p className="text-sm font-medium mt-0.5" style={{ color: GOLD }}>{money(p.price)}</p>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function VideoModal({ src, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white bg-black/40 rounded-full p-2">
        <X size={22} />
      </button>
      <video
        src={src}
        controls
        autoPlay
        playsInline
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  );
}

function ImageZoomModal({ src, onClose }) {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const lastDistRef = useRef(null);
  const lastTapRef = useRef(0);
  const dragRef = useRef(null);

  const getDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      lastDistRef.current = getDistance(e.touches);
    } else if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        setScale((s) => (s > 1 ? 1 : 2.5));
        setTranslate({ x: 0, y: 0 });
      }
      lastTapRef.current = now;
      dragRef.current = { startX: e.touches[0].clientX, startY: e.touches[0].clientY, origX: translate.x, origY: translate.y };
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && lastDistRef.current) {
      const dist = getDistance(e.touches);
      const delta = dist / lastDistRef.current;
      setScale((s) => Math.min(4, Math.max(1, s * delta)));
      lastDistRef.current = dist;
    } else if (e.touches.length === 1 && dragRef.current && scale > 1) {
      const dx = e.touches[0].clientX - dragRef.current.startX;
      const dy = e.touches[0].clientY - dragRef.current.startY;
      setTranslate({ x: dragRef.current.origX + dx, y: dragRef.current.origY + dy });
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) lastDistRef.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white bg-black/40 rounded-full p-2">
        <X size={22} />
      </button>
      <img
        src={src}
        alt=""
        draggable={false}
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          maxWidth: "100%",
          maxHeight: "100%",
          touchAction: "none",
          userSelect: "none",
        }}
      />
      <p className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm">
        Ущипните или дважды нажмите для увеличения / Pinch or double-tap to zoom
      </p>
    </div>
  );
}

function ProductScreen({ t, product, setScreen, addToCart, favorites, toggleFavorite }) {
  const [colorIdx, setColorIdx] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [fabricInfoOpen, setFabricInfoOpen] = useState(false);
  const sizes = product.freeSize ? ["freeSize"] : (product.customSizes || "").split(",").map((s) => s.trim()).filter(Boolean);
  const [size, setSize] = useState(sizes[0] || "freeSize");
  const [justAdded, setJustAdded] = useState(false);
  const color = product.colors[colorIdx];

  const handleAdd = () => {
    addToCart({ product, color, size });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div className="pb-28">
      <TopBar title={product.name} onBack={() => setScreen("category")} />
      <div className="relative">
        <button
          onClick={() => (color.videoUrl ? setVideoOpen(true) : color.imageUrl && setZoomOpen(true))}
          className="w-full aspect-[4/5] bg-cover bg-center block"
          style={{
            backgroundImage: color.imageUrl ? `url(${color.imageUrl})` : (color.hex2 ? `linear-gradient(135deg, ${color.hex} 50%, ${color.hex2} 50%)` : undefined),
            backgroundColor: color.hex,
          }}
        />
        {color.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center">
              <Play size={26} color="#fff" fill="#fff" />
            </div>
          </div>
        )}
      </div>
      {zoomOpen && color.imageUrl && <ImageZoomModal src={color.imageUrl} onClose={() => setZoomOpen(false)} />}
      {videoOpen && color.videoUrl && <VideoModal src={color.videoUrl} onClose={() => setVideoOpen(false)} />}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-xl" style={{ color: CHARCOAL }}>{product.name}</h1>
          <div className="flex items-center gap-2">
            <SeasonTag season={product.season} t={t} />
            <button onClick={() => toggleFavorite(product.id)} className="w-8 h-8 rounded-full bg-black/[0.04] flex items-center justify-center flex-shrink-0">
              <Heart size={16} color={favorites.includes(product.id) ? "#9C5F5C" : CHARCOAL} fill={favorites.includes(product.id) ? "#9C5F5C" : "none"} />
            </button>
          </div>
        </div>
        <p className="font-medium mt-1" style={{ color: GOLD }}>{money(product.price)}</p>

        <div className="mt-5">
          <p className="text-base font-semibold uppercase tracking-wide mb-2" style={{ color: CHARCOAL }}>{t.color}: <span style={{ color: GOLD }}>{color.name}</span></p>
          <div className="flex gap-2">
            {product.colors.map((c, i) => (
              <button
                key={c.name + i}
                onClick={() => setColorIdx(i)}
                className="w-8 h-8 rounded-full border-2"
                style={{
                  background: c.hex2 ? `linear-gradient(135deg, ${c.hex} 50%, ${c.hex2} 50%)` : c.hex,
                  borderColor: i === colorIdx ? GOLD : "transparent",
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-base font-semibold uppercase tracking-wide mb-2" style={{ color: CHARCOAL }}>{t.size}</p>
          <div className="flex gap-2">
            {sizes.map((s) => (
              <button key={s} onClick={() => setSize(s)} className="px-4 py-1.5 rounded-full text-base border" style={{
                background: size === s ? INK : "transparent", color: size === s ? IVORY : CHARCOAL,
                borderColor: size === s ? INK : "rgba(31,61,44,0.2)",
              }}>
                {s === "freeSize" ? t.freeSize : s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-base font-semibold uppercase tracking-wide mb-1.5" style={{ color: CHARCOAL }}>{t.fabric}</p>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span
              className="inline-block px-3 py-1.5 rounded-full text-base font-medium"
              style={{ background: `${GOLD}1A`, color: INK }}
            >
              {product.fabric}
            </span>
            {product.fabricDetails && (
              <button onClick={() => setFabricInfoOpen(true)} className="text-sm font-medium underline" style={{ color: GOLD }}>
                {t.fabricMore}
              </button>
            )}
          </div>
        </div>

        <FitGauge product={product} t={t} />
      </div>

      {fabricInfoOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center" onClick={() => setFabricInfoOpen(false)}>
          <div className="w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl max-h-[80vh] overflow-y-auto p-5" style={{ background: IVORY }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-serif text-lg" style={{ color: CHARCOAL }}>{t.fabric}: {product.fabric}</h2>
              <button onClick={() => setFabricInfoOpen(false)}><X size={20} color={CHARCOAL} /></button>
            </div>
            <p className="text-base leading-relaxed" style={{ color: `${CHARCOAL}CC` }}>{product.fabricDetails}</p>
          </div>
        </div>
      )}

      <div className="fixed bottom-16 inset-x-0 max-w-md mx-auto px-4 py-3 bg-[#F6E9C6]/95 backdrop-blur border-t border-[#1F3D2C]/10">
        <button onClick={handleAdd} className="w-full py-3 rounded-full text-white font-medium flex items-center justify-center gap-2 active:opacity-90" style={{ background: GOLD }}>
          {justAdded ? (<><Check size={18} /> {t.added}</>) : t.addToCart}
        </button>
      </div>
    </div>
  );
}

function FavoritesScreen({ t, products, favorites, toggleFavorite, openProduct, setScreen }) {
  const list = products.filter((p) => favorites.includes(p.id));
  return (
    <div className="pb-24">
      <TopBar title={t.favorites} />
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center px-8 py-24">
          <Heart size={36} color={INK} strokeWidth={1.3} className="mb-3 opacity-40" />
          <p className="font-serif text-lg" style={{ color: CHARCOAL }}>{t.noFavorites}</p>
          <p className="text-base mt-1" style={{ color: `${CHARCOAL}80` }}>{t.noFavoritesSub}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4 mt-3">
          {list.map((p) => (
            <div key={p.id} className="text-left">
              <div className="relative mb-2">
                <button onClick={() => openProduct(p)} className="w-full block text-left">
                  <div className="w-full aspect-[3/4] rounded-2xl bg-cover bg-center border border-[#1F3D2C]/10" style={{
                    backgroundImage: p.colors?.[0]?.imageUrl ? `url(${p.colors[0].imageUrl})` : undefined,
                    backgroundColor: p.colors?.[0]?.hex || "#eee",
                  }} />
                </button>
                <button onClick={() => toggleFavorite(p.id)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/85 flex items-center justify-center">
                  <Heart size={15} color="#9C5F5C" fill="#9C5F5C" />
                </button>
              </div>
              <button onClick={() => openProduct(p)} className="w-full text-left">
                <p className="text-base font-medium leading-snug" style={{ color: CHARCOAL }}>{p.name}</p>
                <p className="text-sm font-medium mt-0.5" style={{ color: GOLD }}>{money(p.price)}</p>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileScreen({ t, tgUser }) {
  const [lastAddress, setLastAddress] = useState("");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    window.storage.get("lastAddress:" + tgUser.id, true)
      .then((r) => setLastAddress(r.value))
      .catch(() => setLastAddress(""));

    window.storage.list("order:" + tgUser.id + ":", true)
      .then((r) => {
        const keys = r.keys || [];
        return Promise.all(
          keys.map((key) =>
            window.storage.get(key, true).then((res) => JSON.parse(res.value)).catch(() => null)
          )
        );
      })
      .then((list) => {
        const valid = list.filter(Boolean).sort((a, b) => b.timestamp - a.timestamp);
        setOrders(valid);
        setLoadingOrders(false);
      })
      .catch(() => setLoadingOrders(false));
  }, [tgUser.id]);

  const displayName = tgUser.username ? "@" + tgUser.username : (tgUser.first_name || "Гость");

  return (
    <div className="pb-24">
      <TopBar title={t.profile} />
      <div className="px-4 mt-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${GOLD}22` }}>
            <User size={24} color={GOLD} />
          </div>
          <div>
            <p className="font-serif text-lg" style={{ color: CHARCOAL }}>{displayName}</p>
            {tgUser.username && tgUser.first_name && (
              <p className="text-sm" style={{ color: `${CHARCOAL}70` }}>{tgUser.first_name}</p>
            )}
          </div>
        </div>

        <a
          href={"https://t.me/" + ADMIN_TELEGRAM_USERNAME}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center gap-2 py-3 px-4 rounded-xl mb-3"
          style={{ background: INK, color: IVORY }}
        >
          <MessageCircle size={17} />
          <span className="text-base font-medium">{t.chatWithAdmin}</span>
        </a>

        <div className="rounded-2xl p-4 mb-3 border border-black/10">
          <p className="text-sm uppercase tracking-wide mb-2" style={{ color: `${CHARCOAL}80` }}>{t.myOrders}</p>
          {loadingOrders ? (
            <p className="text-base" style={{ color: `${CHARCOAL}60` }}>...</p>
          ) : orders.length === 0 ? (
            <p className="text-base" style={{ color: `${CHARCOAL}90` }}>{t.myOrdersSub}</p>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.orderCode} className="border-t border-black/5 pt-3 first:border-t-0 first:pt-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-base font-medium" style={{ color: CHARCOAL }}>#{o.orderCode}</span>
                    <span className="text-sm" style={{ color: `${CHARCOAL}60` }}>
                      {new Date(o.timestamp).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                  {(o.items || []).map((item, i) => (
                    <p key={i} className="text-sm" style={{ color: `${CHARCOAL}90` }}>
                      {item.name} — {item.colorName}, {item.size === "freeSize" ? "Free size" : item.size}
                    </p>
                  ))}
                  <p className="text-sm font-medium mt-1" style={{ color: GOLD }}>{o.total}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl p-4 border border-black/10">
          <p className="text-sm uppercase tracking-wide mb-2" style={{ color: `${CHARCOAL}80` }}>{t.savedAddress}</p>
          <p className="text-base" style={{ color: `${CHARCOAL}90` }}>{lastAddress || t.noSavedAddress}</p>
        </div>
      </div>
    </div>
  );
}

function FaqItemRow({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/10 py-3">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left">
        <span className="text-base font-medium pr-3" style={{ color: CHARCOAL }}>{item.question}</span>
        <ChevronLeft size={16} color={CHARCOAL} style={{ transform: open ? "rotate(90deg)" : "rotate(-90deg)", flexShrink: 0 }} />
      </button>
      {open && <p className="text-base mt-2 leading-relaxed" style={{ color: `${CHARCOAL}99` }}>{item.answer}</p>}
    </div>
  );
}

function FaqScreen({ t, faqItems, setScreen }) {
  return (
    <div className="pb-24">
      <TopBar title={t.faqTitle} onBack={() => setScreen("home")} />
      <div className="px-4 mt-2">
        {faqItems.length === 0 ? (
          <p className="text-base text-center py-16" style={{ color: `${CHARCOAL}66` }}>{t.faqEmpty}</p>
        ) : (
          faqItems.map((item) => <FaqItemRow key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}

function CartScreen({ t, cart, removeFromCart, setScreen }) {
  const total = cart.reduce((s, item) => s + Number(item.product.price || 0), 0);
  return (
    <div className="pb-24">
      <TopBar title={t.yourCart} />
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center px-8 py-24">
          <ShoppingBag size={36} color={INK} strokeWidth={1.3} className="mb-3 opacity-40" />
          <p className="font-serif text-lg" style={{ color: CHARCOAL }}>{t.emptyCart}</p>
          <p className="text-base mt-1" style={{ color: `${CHARCOAL}80` }}>{t.emptyCartSub}</p>
        </div>
      ) : (
        <>
          <div className="px-4 mt-3 space-y-3">
            {cart.map((item, idx) => (
              <div key={idx} className="flex gap-3 bg-white/60 rounded-2xl p-2.5 border border-[#1F3D2C]/10">
                <div className="w-16 h-20 rounded-xl bg-cover bg-center flex-shrink-0" style={{
                  backgroundImage: item.color.imageUrl ? `url(${item.color.imageUrl})` : undefined, backgroundColor: item.color.hex,
                }} />
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium truncate" style={{ color: CHARCOAL }}>{item.product.name}</p>
                  <p className="text-sm mt-0.5" style={{ color: `${CHARCOAL}99` }}>{item.color.name} · {item.size === "freeSize" ? t.freeSize : item.size}</p>
                  <p className="text-base font-medium mt-1" style={{ color: GOLD }}>{money(item.product.price)}</p>
                </div>
                <button onClick={() => removeFromCart(idx)} className="p-1 self-start"><Trash2 size={16} color="#9C5F5C" /></button>
              </div>
            ))}
          </div>
          <div className="fixed bottom-16 inset-x-0 max-w-md mx-auto px-4 py-3 bg-[#F6E9C6]/95 backdrop-blur border-t border-[#1F3D2C]/10">
            <div className="flex justify-between text-base mb-2">
              <span style={{ color: `${CHARCOAL}99` }}>{t.total}</span>
              <span className="font-medium" style={{ color: CHARCOAL }}>{money(total)}</span>
            </div>
            <button onClick={() => setScreen("checkout")} className="w-full py-3 rounded-full font-medium" style={{ background: INK, color: IVORY }}>{t.checkout}</button>
          </div>
        </>
      )}
    </div>
  );
}

const ADMIN_TELEGRAM_USERNAME = "safha_admin1";
const CARD_NUMBER_DISPLAY = "9860 3501 4206 6058";
const CARD_HOLDER_NAME = "Farangiz Bobojonova";

function CheckoutScreen({ t, cart, setScreen, clearCart, tgUserId }) {
  const total = cart.reduce((s, item) => s + Number(item.product.price || 0), 0);
  const [deliveryMethod, setDeliveryMethod] = useState("yandex"); // 'yandex' | 'bts'
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");
  const [cardCopied, setCardCopied] = useState(false);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const receiptInputRef = useRef(null);

  const phoneDigits = phone.replace(/\D/g, "");
  const phoneValid = phoneDigits.length >= 9;
  const [locationAck, setLocationAck] = useState(false);
  const [policyAck, setPolicyAck] = useState(false);
  const canSubmit = phoneValid && address.trim().length > 3 && !!receiptUrl && locationAck && policyAck && !submitting;

  const handleReceiptChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploadingReceipt(true);
    const path = "receipts/" + Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9._-]/g, "");
    fetch(STORAGE_BUCKET_URL + "/product-images/" + path, {
      method: "POST",
      headers: { apikey: STORAGE_KEY, Authorization: "Bearer " + STORAGE_KEY, "Content-Type": file.type },
      body: file,
    })
      .then((res) => {
        if (!res.ok) throw new Error("upload failed: " + res.status);
        return res.json();
      })
      .then(() => {
        setReceiptUrl(STORAGE_PUBLIC_URL + "/product-images/" + path);
        setUploadingReceipt(false);
      })
      .catch(() => {
        setUploadingReceipt(false);
        window.alert("Не удалось загрузить чек / Receipt upload failed. Попробуйте снова.");
      });
  };

  const buildOrderCode = () => String(Date.now()).slice(-6);

  const handleSendOrder = async () => {
    const orderCode = buildOrderCode();
    const payload = {
      orderCode,
      total: money(total),
      phone,
      address,
      deliveryMethod,
      receiptUrl,
      items: cart.map((item) => ({
        name: item.product.name,
        colorName: item.color.name,
        size: item.size,
        priceLabel: money(item.product.price),
        photoUrl: item.color.imageUrl || "",
      })),
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "unknown error");

      if (tgUserId) {
        window.storage.set("lastAddress:" + tgUserId, address, true).catch(() => {});
        const orderRecord = {
          orderCode,
          total: money(total),
          phone,
          address,
          deliveryMethod,
          timestamp: Date.now(),
          items: cart.map((item) => ({
            name: item.product.name,
            colorName: item.color.name,
            size: item.size,
            priceLabel: money(item.product.price),
          })),
        };
        window.storage.set("order:" + tgUserId + ":" + orderCode, JSON.stringify(orderRecord), true).catch(() => {});
      }

      const fullLines = [];
      fullLines.push("Заказ #" + orderCode);
      cart.forEach((item, i) => {
        fullLines.push(
          (i + 1) + ". " + item.product.name + " — " + item.color.name + ", " +
          (item.size === "freeSize" ? "Free size" : item.size) + " — " + money(item.product.price)
        );
      });
      fullLines.push("Итого: " + money(total));
      fullLines.push("Телефон: " + phone);
      fullLines.push("Адрес: " + address);
      fullLines.push(
        "Доставка: " +
        (deliveryMethod === "yandex" ? "Ташкент — курьер Яндекс, оплата при получении" : "Другой регион — BTS")
      );
      const photoLinks = cart.map((item) => item.color.imageUrl).filter(Boolean);
      if (photoLinks.length) {
        fullLines.push("");
        fullLines.push("Фото товара:");
        photoLinks.forEach((url) => fullLines.push(url));
      }
      if (receiptUrl) {
        fullLines.push("");
        fullLines.push("Чек оплаты: " + receiptUrl);
      }
      fullLines.push("");
      fullLines.push("Пожалуйста, также отправьте геометку через 📎 → Локация в этом чате.");
      const locationMsg = fullLines.join("\n");
      const tgUrl = "https://t.me/" + ADMIN_TELEGRAM_USERNAME + "?text=" + encodeURIComponent(locationMsg);
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.openTelegramLink) {
        window.Telegram.WebApp.openTelegramLink(tgUrl);
      } else {
        window.open(tgUrl, "_blank");
      }

      clearCart();
      setScreen("confirmation");
    } catch (e) {
      window.alert("Не удалось отправить заказ / Failed to send order. Попробуйте ещё раз или напишите нам напрямую.");
      console.warn("send-order failed:", e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pb-40">
      <TopBar title={t.checkout} onBack={() => setScreen("cart")} />

      <div className="px-4 mt-4">
        <h2 className="font-serif text-base mb-2" style={{ color: CHARCOAL }}>{t.deliveryTitle}</h2>

        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setDeliveryMethod("yandex")}
            className="flex-1 py-2.5 rounded-xl border text-sm font-medium"
            style={{
              background: deliveryMethod === "yandex" ? INK : "transparent",
              color: deliveryMethod === "yandex" ? IVORY : CHARCOAL,
              borderColor: deliveryMethod === "yandex" ? INK : "rgba(31,61,44,0.2)",
            }}
          >
            Ташкент · Яндекс
          </button>
          <button
            onClick={() => setDeliveryMethod("bts")}
            className="flex-1 py-2.5 rounded-xl border text-sm font-medium"
            style={{
              background: deliveryMethod === "bts" ? INK : "transparent",
              color: deliveryMethod === "bts" ? IVORY : CHARCOAL,
              borderColor: deliveryMethod === "bts" ? INK : "rgba(31,61,44,0.2)",
            }}
          >
            Другой регион · BTS
          </button>
        </div>

        {deliveryMethod === "yandex" ? (
          <p className="text-sm leading-relaxed mb-3" style={{ color: `${CHARCOAL}99` }}>
            Доставка курьером Яндекс. Оплата за доставку — наличными курьеру при получении заказа.
          </p>
        ) : (
          <p className="text-sm leading-relaxed mb-3" style={{ color: `${CHARCOAL}99` }}>
            Доставка через BTS. Мы уточним ближайший пункт выдачи после получения заказа.
          </p>
        )}

        <div className="flex items-center gap-2 border rounded-xl px-3 py-2.5" style={{
          borderColor: phone.length > 0 && !phoneValid ? "#9C5F5C" : "rgba(31,61,44,0.2)",
        }}>
          <Phone size={16} color={INK} className="opacity-60" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phonePlaceholder} className="flex-1 bg-transparent text-base outline-none" style={{ color: CHARCOAL }} />
        </div>
        {phone.length > 0 && !phoneValid && (
          <p className="text-xs mt-1 mb-1" style={{ color: "#9C5F5C" }}>
            Проверьте номер телефона — не хватает цифр / Check the phone number — looks incomplete
          </p>
        )}
        <div className="mb-2" />

        <div className="flex items-center gap-2 border border-[#1F3D2C]/20 rounded-xl px-3 py-2.5 mb-2">
          <MapPin size={16} color={INK} className="opacity-60" />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Адрес доставки (улица, дом) / Delivery address"
            className="flex-1 bg-transparent text-base outline-none"
            style={{ color: CHARCOAL }}
          />
        </div>

        <div className="bg-[#1F3D2C]/[0.04] rounded-xl px-3 py-2.5 flex items-start gap-2">
          <MapPin size={16} color={GOLD} className="flex-shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed" style={{ color: `${CHARCOAL}99` }}>
            После нажатия «{t.placeOrder}» откроется чат с нами — там, пожалуйста, дополнительно отправьте вашу геометку через <b>📎 → Локация</b> (так мы сможем сразу передать её в Яндекс или BTS).
          </p>
        </div>
      </div>

      <div className="px-4 mt-6">
        <h2 className="font-serif text-base mb-2" style={{ color: CHARCOAL }}>{t.paymentTitle}</h2>
        <p className="text-sm mb-3 leading-relaxed" style={{ color: `${CHARCOAL}99` }}>{t.paymentSub}</p>
        <button
          type="button"
          onClick={() => {
            const digitsOnly = CARD_NUMBER_DISPLAY.replace(/\s/g, "");
            const doCopy = () => {
              setCardCopied(true);
              setTimeout(() => setCardCopied(false), 1500);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(digitsOnly).then(doCopy).catch(doCopy);
            } else {
              doCopy();
            }
          }}
          className="w-full text-left rounded-2xl p-4 mb-3"
          style={{ background: INK }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: `${IVORY}80` }}>{t.cardNumber}</p>
              <p className="font-mono text-lg tracking-wider" style={{ color: IVORY }}>{CARD_NUMBER_DISPLAY}</p>
              <p className="text-sm mt-1" style={{ color: `${IVORY}90` }}>{CARD_HOLDER_NAME}</p>
            </div>
            <span
              className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-full flex-shrink-0"
              style={{
                background: cardCopied ? "#5C6B4E" : `${IVORY}25`,
                color: "#fff",
              }}
            >
              {cardCopied ? <Check size={14} /> : <Copy size={14} />}
              {cardCopied ? "Скопировано" : "Копировать"}
            </span>
          </div>
        </button>

        <input ref={receiptInputRef} type="file" accept="image/*" onChange={handleReceiptChange} className="hidden" />
        <button
          type="button"
          onClick={() => receiptInputRef.current && receiptInputRef.current.click()}
          className="w-full flex items-center gap-2 py-3 px-3 rounded-xl border text-base justify-center"
          style={{
            background: receiptUrl ? "rgba(124,140,108,0.1)" : "transparent",
            borderColor: receiptUrl ? "#7C8C6C" : "rgba(31,61,44,0.2)",
            color: receiptUrl ? "#5C6B4E" : CHARCOAL,
          }}
        >
          {receiptUrl ? <Check size={16} /> : <Upload size={16} />}
          {uploadingReceipt ? "Загрузка..." : receiptUrl ? "Чек загружен" : "Прикрепить чек оплаты (обязательно)"}
        </button>

        {receiptUrl && (
          <>
            <label className="flex items-start gap-2.5 mt-3 p-3 rounded-xl cursor-pointer" style={{ background: `${GOLD}14` }}>
              <input
                type="checkbox"
                checked={locationAck}
                onChange={(e) => setLocationAck(e.target.checked)}
                className="mt-0.5 flex-shrink-0"
              />
              <span className="text-sm leading-relaxed" style={{ color: CHARCOAL }}>
                Пожалуйста, отправьте свою локацию через Telegram (📎 → Локация) в чате, который откроется после отправки заказа.
              </span>
            </label>

            <label className="flex items-start gap-2.5 mt-2 p-3 rounded-xl cursor-pointer" style={{ background: "rgba(31,61,44,0.04)" }}>
              <input
                type="checkbox"
                checked={policyAck}
                onChange={(e) => setPolicyAck(e.target.checked)}
                className="mt-0.5 flex-shrink-0"
              />
              <span className="text-sm leading-relaxed" style={{ color: CHARCOAL }}>
                Ознакомлен(а) с условиями заказа: оформленный товар не подлежит возврату или обмену на другую модель, цвет или размер.
              </span>
            </label>
          </>
        )}
      </div>

      <div className="px-4 mt-6 pb-8">
        <div className="flex justify-between text-base mb-2">
          <span style={{ color: `${CHARCOAL}99` }}>{t.total}</span>
          <span className="font-medium" style={{ color: CHARCOAL }}>{money(total)}</span>
        </div>
        <button disabled={!canSubmit} onClick={handleSendOrder} className="w-full py-3 rounded-full font-medium flex items-center justify-center gap-2" style={{
          background: canSubmit ? GOLD : "rgba(31,61,44,0.15)", color: canSubmit ? "#fff" : "rgba(42,36,32,0.4)",
        }}>
          <CreditCard size={16} />{submitting ? "Отправка..." : t.placeOrder}
        </button>
        {!canSubmit && (
          <p className="text-xs text-center mt-1.5" style={{ color: "#9C5F5C" }}>
            Укажите телефон, адрес, прикрепите чек и подтвердите оба пункта ниже / Fill in phone, address, receipt, and confirm both checkboxes above
          </p>
        )}
      </div>
    </div>
  );
}

function ConfirmationScreen({ t, setScreen }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-8">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(124,140,108,0.15)" }}>
        <Check size={30} color="#5C6B4E" />
      </div>
      <h1 className="font-serif text-xl mb-2" style={{ color: CHARCOAL }}>{t.orderSentTitle}</h1>
      <p className="text-base leading-relaxed mb-8" style={{ color: `${CHARCOAL}99` }}>{t.orderSentSub}</p>
      <button onClick={() => setScreen("home")} className="px-6 py-3 rounded-full text-base font-medium" style={{ background: INK, color: IVORY }}>{t.backToHome}</button>
    </div>
  );
}

function LangScreen({ onPick }) {
  const langs = [{ code: "ru", label: "Русский" }, { code: "en", label: "English" }, { code: "uz", label: "O'zbek" }];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center" style={{ background: INK }}>
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ background: GOLD }}>
        <Globe size={26} color={INK} />
      </div>
      <h1 className="font-serif text-2xl mb-1" style={{ color: IVORY }}>Choose your language</h1>
      <p className="text-base mb-8" style={{ color: `${IVORY}80` }}>Modest fashion, made with care</p>
      <div className="w-full max-w-xs space-y-3">
        {langs.map((l) => (
          <button key={l.code} onClick={() => onPick(l.code)} className="w-full py-3.5 rounded-full border font-medium tracking-wide active:bg-white/10 transition" style={{ borderColor: `${IVORY}40`, color: IVORY }}>
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================ ADMIN PANEL ============================ */
const STORAGE_BUCKET_URL = "https://rfsgpqmddgtuxhkqaeau.supabase.co/storage/v1/object";
const STORAGE_PUBLIC_URL = "https://rfsgpqmddgtuxhkqaeau.supabase.co/storage/v1/object/public";
const STORAGE_KEY = "sb_publishable_Z2hMA2ZiwUD3NgVMfLBOPQ_Mqx-vCOC";

function ColorRow({ color, onChange, onRemove, canRemove }) {
  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const uploadFile = (file, folder) => {
    const path = folder + "/" + Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9._-]/g, "");
    return fetch(STORAGE_BUCKET_URL + "/product-images/" + path, {
      method: "POST",
      headers: {
        apikey: STORAGE_KEY,
        Authorization: "Bearer " + STORAGE_KEY,
        "Content-Type": file.type,
      },
      body: file,
    }).then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(res.status + ": " + text);
        });
      }
      return STORAGE_PUBLIC_URL + "/product-images/" + path;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(true);
    uploadFile(file, "colors")
      .then((url) => {
        onChange({ ...color, imageUrl: url });
        setUploading(false);
      })
      .catch(() => {
        setUploading(false);
        window.alert("Не удалось загрузить фото / Photo upload failed. Проверьте, что bucket 'product-images' создан и публичный.");
      });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploadingVideo(true);
    uploadFile(file, "colors/videos")
      .then((url) => {
        onChange({ ...color, videoUrl: url });
        setUploadingVideo(false);
      })
      .catch((err) => {
        setUploadingVideo(false);
        window.alert("Не удалось загрузить видео / Video upload failed:\n" + err.message);
      });
  };

  return (
    <div className="border border-black/10 rounded-xl p-2.5 mb-2">
      <div className="flex items-center gap-2 mb-2">
        <input type="color" value={color.hex} onChange={(e) => onChange({ ...color, hex: e.target.value })} className="w-9 h-9 rounded-lg border border-black/10 cursor-pointer flex-shrink-0" />
        {color.hex2 !== undefined && (
          <input type="color" value={color.hex2} onChange={(e) => onChange({ ...color, hex2: e.target.value })} className="w-9 h-9 rounded-lg border border-black/10 cursor-pointer flex-shrink-0" />
        )}
        <input placeholder="Название цвета" value={color.name} onChange={(e) => onChange({ ...color, name: e.target.value })} className="flex-1 min-w-0 border border-black/15 rounded-lg px-2.5 py-2 text-base" />
        {canRemove && <button onClick={onRemove} className="p-1.5 flex-shrink-0"><Trash2 size={16} color="#9C5F5C" /></button>}
      </div>
      <label className="flex items-center gap-1.5 text-sm mb-2" style={{ color: `${CHARCOAL}99` }}>
        <input
          type="checkbox"
          checked={color.hex2 !== undefined}
          onChange={(e) => onChange(e.target.checked ? { ...color, hex2: "#EDE4D3" } : { ...color, hex2: undefined })}
        />
        Комбинация из 2 цветов / Two-color combo
      </label>

      <input ref={photoInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      <button
        type="button"
        onClick={() => photoInputRef.current && photoInputRef.current.click()}
        className="w-full border border-black/15 rounded-lg px-2.5 py-2 text-base flex items-center gap-1.5 bg-white mb-1.5"
      >
        {color.imageUrl ? (
          <img src={color.imageUrl} alt="" className="w-6 h-6 rounded object-cover flex-shrink-0" />
        ) : (
          <Upload size={14} className="flex-shrink-0 opacity-50" />
        )}
        <span className="truncate text-sm" style={{ color: color.imageUrl ? CHARCOAL : "rgba(0,0,0,0.4)" }}>
          {uploading ? "Загрузка..." : color.imageUrl ? "Фото загружено (нажмите, чтобы заменить)" : "Выбрать фото"}
        </span>
      </button>

      <input ref={videoInputRef} type="file" accept="video/*" onChange={handleVideoChange} className="hidden" />
      <button
        type="button"
        onClick={() => videoInputRef.current && videoInputRef.current.click()}
        className="w-full border border-black/15 rounded-lg px-2.5 py-2 text-base flex items-center gap-1.5 bg-white"
      >
        <Play size={14} className="flex-shrink-0 opacity-50" />
        <span className="truncate text-sm" style={{ color: color.videoUrl ? CHARCOAL : "rgba(0,0,0,0.4)" }}>
          {uploadingVideo ? "Загрузка..." : color.videoUrl ? "Видео загружено (нажмите, чтобы заменить)" : "Добавить видео (необязательно)"}
        </span>
      </button>
    </div>
  );
}

const emptyProduct = () => ({
  id: "p_" + Date.now(), category: "dresses", season: "all", name: "", price: "", fabric: "", fabricDetails: "",
  hasFit: true, minHeight: 150, maxHeight: 175, maxWeight: 70, freeSize: true, customSizes: "",
  inStock: true, colors: [{ name: "", hex: "#4A342A", imageUrl: "" }],
});

function ProductForm({ initial, onCancel, onSaved, showToast }) {
  const [p, setP] = useState(initial);
  const [saving, setSaving] = useState(false);
  const update = (patch) => setP((prev) => ({ ...prev, ...patch }));
  const updateColor = (idx, val) => { const colors = [...p.colors]; colors[idx] = val; update({ colors }); };
  const addColor = () => update({ colors: [...p.colors, { name: "", hex: "#4A342A", imageUrl: "" }] });
  const removeColor = (idx) => update({ colors: p.colors.filter((_, i) => i !== idx) });

  const validate = () => {
    if (!p.name.trim()) return "Введите название модели";
    if (!p.price || Number(p.price) <= 0) return "Укажите корректную цену";
    if (p.colors.some((c) => !c.name.trim())) return "Заполните названия всех цветов";
    return null;
  };

  const handleSave = async () => {
    const err = validate();
    if (err) { showToast(err, "error"); return; }
    setSaving(true);
    // Update the visible list right away so the panel never feels stuck —
    // storage sync is attempted separately below and doesn't block this.
    onSaved(p);
    showToast("Сохранено", "success");
    try {
      const result = await window.storage.set(`product:${p.id}`, JSON.stringify(p), true);
      if (!result) throw new Error("storage.set returned null");
    } catch (e) {
      console.warn("Background storage sync failed:", e);
      showToast("Сохранено на экране, но не в облаке (" + (e?.message || "ошибка сети") + ")", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-end sm:items-center justify-center">
      <div className="w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl max-h-[92vh] overflow-y-auto p-5" style={{ background: IVORY }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg" style={{ color: CHARCOAL }}>{initial.name ? "Редактировать" : "Новый товар"}</h2>
          <button onClick={onCancel}><X size={20} color={CHARCOAL} /></button>
        </div>
        <label className="block text-sm uppercase tracking-wide text-black/50 mb-1">Название модели</label>
        <input value={p.name} onChange={(e) => update({ name: e.target.value })} placeholder="Например: Модель Амира" className="w-full border border-black/15 rounded-xl px-3 py-2.5 text-base mb-4" />
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-sm uppercase tracking-wide text-black/50 mb-1">Категория</label>
            <select value={p.category} onChange={(e) => update({ category: e.target.value })} className="w-full border border-black/15 rounded-xl px-3 py-2.5 text-base bg-white">
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm uppercase tracking-wide text-black/50 mb-1">Сезон</label>
            <select value={p.season} onChange={(e) => update({ season: e.target.value })} className="w-full border border-black/15 rounded-xl px-3 py-2.5 text-base bg-white">
              {SEASONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>
        <label className="block text-sm uppercase tracking-wide text-black/50 mb-1">Цена (сум)</label>
        <input type="number" value={p.price} onChange={(e) => update({ price: e.target.value })} placeholder="350000" className="w-full border border-black/15 rounded-xl px-3 py-2.5 text-base mb-4" />
        <label className="block text-sm uppercase tracking-wide text-black/50 mb-1">Ткань (короткое название)</label>
        <input value={p.fabric} onChange={(e) => update({ fabric: e.target.value })} placeholder="Например: плотный трикотаж, 95% хлопок" className="w-full border border-black/15 rounded-xl px-3 py-2.5 text-base mb-4" />
        <label className="block text-sm uppercase tracking-wide text-black/50 mb-1">Подробнее о ткани (для кнопки «Подробнее»)</label>
        <textarea
          value={p.fabricDetails || ""}
          onChange={(e) => update({ fabricDetails: e.target.value })}
          rows={4}
          placeholder="Например: 100% натуральный хлопок, дышащая ткань, не требует глажки, подходит для жаркого климата..."
          className="w-full border border-black/15 rounded-xl px-3 py-2.5 text-base mb-4"
        />
        <div className="mb-4">
          <label className="flex items-center gap-2 text-base mb-2">
            <input type="checkbox" checked={p.freeSize} onChange={(e) => update({ freeSize: e.target.checked })} />
            Свободный размер
          </label>
          {!p.freeSize && (
            <input value={p.customSizes} onChange={(e) => update({ customSizes: e.target.value })} placeholder="S, M, L (через запятую)" className="w-full border border-black/15 rounded-xl px-3 py-2.5 text-base" />
          )}
        </div>
        <div className="mb-4 bg-black/[0.03] rounded-2xl p-3.5">
          <label className="flex items-center gap-2 text-base mb-3">
            <input type="checkbox" checked={p.hasFit} onChange={(e) => update({ hasFit: e.target.checked })} />
            Указать параметры посадки (рекомендуется)
          </label>
          {p.hasFit && (
            <div className="grid grid-cols-3 gap-2">
              <div><label className="block text-xs text-black/50 mb-1">Рост от, см</label><input type="number" value={p.minHeight} onChange={(e) => update({ minHeight: Number(e.target.value) })} className="w-full border border-black/15 rounded-lg px-2 py-1.5 text-base" /></div>
              <div><label className="block text-xs text-black/50 mb-1">Рост до, см</label><input type="number" value={p.maxHeight} onChange={(e) => update({ maxHeight: Number(e.target.value) })} className="w-full border border-black/15 rounded-lg px-2 py-1.5 text-base" /></div>
              <div><label className="block text-xs text-black/50 mb-1">Вес до, кг</label><input type="number" value={p.maxWeight} onChange={(e) => update({ maxWeight: Number(e.target.value) })} className="w-full border border-black/15 rounded-lg px-2 py-1.5 text-base" /></div>
            </div>
          )}
        </div>
        <label className="block text-sm uppercase tracking-wide text-black/50 mb-2">Цвета и фото</label>
        {p.colors.map((c, i) => <ColorRow key={i} color={c} onChange={(val) => updateColor(i, val)} onRemove={() => removeColor(i)} canRemove={p.colors.length > 1} />)}
        <button onClick={addColor} className="flex items-center gap-1 text-base mb-4" style={{ color: GOLD }}><Plus size={15} /> Добавить цвет</button>
        <label className="flex items-center gap-2 text-base mb-5">
          <input type="checkbox" checked={p.inStock} onChange={(e) => update({ inStock: e.target.checked })} />
          В наличии
        </label>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-3 rounded-full border border-black/15 text-base font-medium" style={{ color: CHARCOAL }}>Отмена</button>
          <button onClick={handleSave} disabled={saving} className="flex-1 py-3 rounded-full text-base font-medium text-white flex items-center justify-center gap-2" style={{ background: GOLD, opacity: saving ? 0.6 : 1 }}>
            <Save size={15} />{saving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ThemeImageRow({ label, value, onUploaded }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(true);
    const path = "site/" + Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9._-]/g, "");
    fetch(STORAGE_BUCKET_URL + "/product-images/" + path, {
      method: "POST",
      headers: { apikey: STORAGE_KEY, Authorization: "Bearer " + STORAGE_KEY, "Content-Type": file.type },
      body: file,
    })
      .then((res) => {
        if (!res.ok) throw new Error("upload failed: " + res.status);
        return res.json();
      })
      .then(() => {
        onUploaded(STORAGE_PUBLIC_URL + "/product-images/" + path);
        setUploading(false);
      })
      .catch(() => {
        setUploading(false);
        window.alert("Не удалось загрузить фото / Photo upload failed.");
      });
  };

  return (
    <div className="flex items-center gap-3 bg-white/70 rounded-2xl p-3 border border-black/5 mb-2">
      <div className="w-14 h-14 rounded-xl flex-shrink-0 bg-cover bg-center border border-black/10" style={{ backgroundImage: value ? `url(${value})` : undefined, backgroundColor: "#eee" }} />
      <label className="flex-1 border border-black/15 rounded-lg px-2.5 py-2 text-base flex items-center gap-1.5 cursor-pointer bg-white">
        <Upload size={14} className="flex-shrink-0 opacity-50" />
        <span className="truncate text-sm" style={{ color: CHARCOAL }}>
          {uploading ? "Загрузка..." : "Изменить фото"}
        </span>
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>
      <span className="text-sm w-20 flex-shrink-0" style={{ color: `${CHARCOAL}80` }}>{label}</span>
    </div>
  );
}

function FaqAdminPanel({ faqItems, saveFaqItems, showToast }) {
  const [editingIdx, setEditingIdx] = useState(null); // null = not editing, -1 = new, number = index
  const [draftQ, setDraftQ] = useState("");
  const [draftA, setDraftA] = useState("");

  const startNew = () => {
    setEditingIdx(-1);
    setDraftQ("");
    setDraftA("");
  };

  const startEdit = (idx) => {
    setEditingIdx(idx);
    setDraftQ(faqItems[idx].question);
    setDraftA(faqItems[idx].answer);
  };

  const handleSave = () => {
    if (!draftQ.trim() || !draftA.trim()) {
      showToast("Заполните вопрос и ответ", "error");
      return;
    }
    let next;
    if (editingIdx === -1) {
      next = [...faqItems, { id: "faq_" + Date.now(), question: draftQ, answer: draftA }];
    } else {
      next = faqItems.map((item, i) => (i === editingIdx ? { ...item, question: draftQ, answer: draftA } : item));
    }
    saveFaqItems(next);
    showToast("Сохранено");
    setEditingIdx(null);
  };

  const handleDelete = (idx) => {
    if (!window.confirm("Удалить этот вопрос?")) return;
    saveFaqItems(faqItems.filter((_, i) => i !== idx));
    showToast("Удалено");
  };

  return (
    <div className="px-5 pb-10">
      <p className="text-sm mb-3" style={{ color: `${CHARCOAL}80` }}>
        Вопросы и информация о тканях, видимые на главной странице покупателям.
      </p>

      {editingIdx !== null ? (
        <div className="bg-white/70 rounded-2xl p-4 border border-black/5 mb-3">
          <label className="block text-sm uppercase tracking-wide text-black/50 mb-1">Вопрос</label>
          <input
            value={draftQ}
            onChange={(e) => setDraftQ(e.target.value)}
            placeholder="Например: Из какой ткани сделаны платья?"
            className="w-full border border-black/15 rounded-xl px-3 py-2.5 text-base mb-3"
          />
          <label className="block text-sm uppercase tracking-wide text-black/50 mb-1">Ответ</label>
          <textarea
            value={draftA}
            onChange={(e) => setDraftA(e.target.value)}
            rows={4}
            placeholder="Подробный ответ..."
            className="w-full border border-black/15 rounded-xl px-3 py-2.5 text-base mb-3"
          />
          <div className="flex gap-2">
            <button onClick={() => setEditingIdx(null)} className="flex-1 py-2.5 rounded-full border border-black/15 text-base font-medium" style={{ color: CHARCOAL }}>
              Отмена
            </button>
            <button onClick={handleSave} className="flex-1 py-2.5 rounded-full text-base font-medium text-white" style={{ background: GOLD }}>
              Сохранить
            </button>
          </div>
        </div>
      ) : (
        <button onClick={startNew} className="flex items-center gap-1.5 text-base mb-4" style={{ color: GOLD }}>
          <Plus size={16} /> Добавить вопрос
        </button>
      )}

      {faqItems.length === 0 ? (
        <p className="text-base text-black/50">Пока нет вопросов</p>
      ) : (
        <div className="space-y-2">
          {faqItems.map((item, idx) => (
            <div key={item.id} className="flex items-start gap-2 bg-white/70 rounded-2xl p-3 border border-black/5">
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium" style={{ color: CHARCOAL }}>{item.question}</p>
                <p className="text-sm mt-0.5 line-clamp-2" style={{ color: `${CHARCOAL}80` }}>{item.answer}</p>
              </div>
              <button onClick={() => startEdit(idx)} className="p-1.5 flex-shrink-0"><Edit2 size={15} color={INK} /></button>
              <button onClick={() => handleDelete(idx)} className="p-1.5 flex-shrink-0"><Trash2 size={15} color="#9C5F5C" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminScreen({ t, products, upsertLocal, removeLocal, goShop, showToast, homeImages, saveHomeImages, faqItems, saveFaqItems }) {
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("all");
  const [tab, setTab] = useState("products"); // 'products' | 'theme'

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить этот товар?")) return;
    removeLocal(id);
    showToast("Удалено");
    try {
      await window.storage.delete(`product:${id}`, true);
    } catch (e) {
      console.warn("Background delete sync failed:", e);
    }
  };

  const filtered = products.filter((p) => filter === "all" || p.category === filter);

  const themeSlots = [
    { key: "hero", label: "Главный баннер / Hero" },
    { key: "dresses", label: "Платья / Dresses" },
    { key: "scarves", label: "Платки / Scarves" },
    { key: "namaznik", label: "Намазники / Namaznik" },
    { key: "faq", label: "Фото для «Вопросы» / FAQ tile" },
    { key: "bannerWinter", label: "Баннер осень-зима" },
    { key: "bannerSummer", label: "Баннер весна-лето" },
  ];

  return (
    <div className="min-h-screen" style={{ background: IVORY }}>
      <div className="sticky top-0 z-10 px-5 py-4 flex items-center justify-between" style={{ background: INK }}>
        <div>
          <button onClick={goShop} className="text-sm mb-1 block" style={{ color: `${IVORY}90` }}>{t.backToShop}</button>
          <h1 className="font-serif text-lg" style={{ color: IVORY }}>{t.forOwners}</h1>
        </div>
        {tab === "products" && (
          <button onClick={() => setEditing(emptyProduct())} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-base font-medium text-white" style={{ background: GOLD }}>
            <Plus size={16} /> Добавить
          </button>
        )}
      </div>

      <div className="flex gap-2 px-5 py-3">
        <button onClick={() => setTab("products")} className="px-4 py-1.5 rounded-full text-sm font-medium border" style={{
          background: tab === "products" ? INK : "transparent", color: tab === "products" ? IVORY : CHARCOAL, borderColor: tab === "products" ? INK : "rgba(0,0,0,0.15)",
        }}>Товары / Products</button>
        <button onClick={() => setTab("theme")} className="px-4 py-1.5 rounded-full text-sm font-medium border" style={{
          background: tab === "theme" ? INK : "transparent", color: tab === "theme" ? IVORY : CHARCOAL, borderColor: tab === "theme" ? INK : "rgba(0,0,0,0.15)",
        }}>Оформление / Theme</button>
        <button onClick={() => setTab("faq")} className="px-4 py-1.5 rounded-full text-sm font-medium border" style={{
          background: tab === "faq" ? INK : "transparent", color: tab === "faq" ? IVORY : CHARCOAL, borderColor: tab === "faq" ? INK : "rgba(0,0,0,0.15)",
        }}>Вопросы / FAQ</button>
      </div>

      {tab === "faq" ? (
        <FaqAdminPanel faqItems={faqItems} saveFaqItems={saveFaqItems} showToast={showToast} />
      ) : tab === "theme" ? (
        <div className="px-5 pb-10">
          <p className="text-sm mb-3" style={{ color: `${CHARCOAL}80` }}>
            Фото на главной странице (баннер, обложки категорий). Изменения появятся сразу после загрузки.
          </p>
          {themeSlots.map((slot) => (
            <ThemeImageRow
              key={slot.key}
              label={slot.label}
              value={homeImages[slot.key]}
              onUploaded={(url) => saveHomeImages({ ...homeImages, [slot.key]: url })}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="flex gap-2 px-5 pb-3 overflow-x-auto">
            {[{ value: "all", label: "Все / All" }, ...CATEGORIES].map((c) => (
              <button key={c.value} onClick={() => setFilter(c.value)} className="px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap border" style={{
                background: filter === c.value ? INK : "transparent", color: filter === c.value ? IVORY : CHARCOAL,
                borderColor: filter === c.value ? INK : "rgba(0,0,0,0.15)",
              }}>{c.label}</button>
            ))}
          </div>
          <div className="px-5 pb-10">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center text-center py-16">
                <Package size={32} color={INK} strokeWidth={1.3} className="mb-3 opacity-30" />
                <p className="text-base text-black/50">Товаров пока нет</p>
              </div>
            ) : (
              <div className="space-y-2 mt-1">
                {filtered.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 bg-white/70 rounded-2xl p-3 border border-black/5">
                    <div className="w-14 h-16 rounded-xl flex-shrink-0 bg-cover bg-center border border-black/10" style={{
                      backgroundImage: p.colors?.[0]?.imageUrl ? `url(${p.colors[0].imageUrl})` : (p.colors?.[0]?.hex2 ? `linear-gradient(135deg, ${p.colors[0].hex} 50%, ${p.colors[0].hex2} 50%)` : undefined),
                      backgroundColor: p.colors?.[0]?.hex || "#eee",
                    }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium truncate" style={{ color: CHARCOAL }}>{p.name}</p>
                      <p className="text-sm text-black/45">{CATEGORIES.find((c) => c.value === p.category)?.label} · {money(p.price)}</p>
                      {!p.inStock && <span className="text-xs text-white px-1.5 py-0.5 rounded-full" style={{ background: "#9C5F5C" }}>Нет в наличии</span>}
                    </div>
                    <button onClick={() => setEditing(p)} className="p-2"><Edit2 size={16} color={INK} /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-2"><Trash2 size={16} color="#9C5F5C" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      {editing && <ProductForm initial={editing} onCancel={() => setEditing(null)} onSaved={(p) => { setEditing(null); upsertLocal(p); }} showToast={showToast} />}
    </div>
  );
}

/* ============================ ROOT ============================ */
export default function App() {
  const [lang, setLang] = useState(null);
  const [view, setView] = useState("shop"); // 'shop' | 'admin'
  const [screen, setScreen] = useState("home");
  const [activeCategory, setActiveCategory] = useState("dresses");
  const [activeSeason, setActiveSeason] = useState("all");
  const [activeProduct, setActiveProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ message: "", kind: "success" });
  const { products, loading, reload, upsertLocal, removeLocal } = useProducts();
  const [homeImages, setHomeImages] = useState({});

  useEffect(() => {
    window.storage.get("home_images", true)
      .then((r) => setHomeImages(JSON.parse(r.value)))
      .catch(() => setHomeImages({}));
  }, []);

  const saveHomeImages = (images) => {
    setHomeImages(images); // update instantly on screen
    window.storage.set("home_images", JSON.stringify(images), true).catch((e) => {
      console.warn("Failed to save theme photos:", e);
    });
  };

  const [faqItems, setFaqItems] = useState([]);

  useEffect(() => {
    window.storage.get("faq_items", true)
      .then((r) => setFaqItems(JSON.parse(r.value)))
      .catch(() => setFaqItems([]));
  }, []);

  const saveFaqItems = (items) => {
    setFaqItems(items); // update instantly on screen
    window.storage.set("faq_items", JSON.stringify(items), true).catch((e) => {
      console.warn("Failed to save FAQ items:", e);
    });
  };

  const t = useMemo(() => T[lang || "ru"], [lang]);

  const tgUser = useMemo(() => getTelegramUser(), []);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    window.storage.get("favorites:" + tgUser.id, true)
      .then((r) => setFavorites(JSON.parse(r.value)))
      .catch(() => setFavorites([]));
  }, [tgUser.id]);

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const next = prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId];
      window.storage.set("favorites:" + tgUser.id, JSON.stringify(next), true).catch((e) => {
        console.warn("Failed to save favorites:", e);
      });
      return next;
    });
  };

  const showToast = (message, kind = "success") => {
    setToast({ message, kind });
    setTimeout(() => setToast({ message: "", kind: "success" }), 2200);
  };

  if (view === "admin") {
    return (
      <div style={{ fontFamily: "'Poppins', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600&display=swap'); .font-serif { font-family: 'Playfair Display', serif; }`}</style>
        <Toast message={toast.message} kind={toast.kind} />
        <AdminScreen t={t} products={products} upsertLocal={upsertLocal} removeLocal={removeLocal} goShop={() => setView("shop")} showToast={showToast} homeImages={homeImages} saveHomeImages={saveHomeImages} faqItems={faqItems} saveFaqItems={saveFaqItems} />
      </div>
    );
  }

  if (!lang) return <LangScreen onPick={setLang} />;

  const addToCart = (item) => setCart((c) => [...c, item]);
  const removeFromCart = (idx) => setCart((c) => c.filter((_, i) => i !== idx));
  const clearCart = () => setCart([]);
  const openProduct = (p) => { setActiveProduct(p); setScreen("product"); };

  return (
    <div className="max-w-md mx-auto min-h-screen" style={{ background: IVORY, fontFamily: "'Poppins', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap'); .font-serif { font-family: 'Playfair Display', serif; }`}</style>

      {loading ? (
        <p className="text-center py-24 text-base" style={{ color: `${CHARCOAL}66` }}>Загрузка...</p>
      ) : (
        <>
          {screen === "home" && <HomeScreen t={t} setScreen={setScreen} setActiveCategory={setActiveCategory} setActiveSeason={setActiveSeason} goAdmin={() => setView("admin")} homeImages={homeImages} />}
          {screen === "category" && <CategoryScreen t={t} products={products} category={activeCategory} season={activeSeason} setSeason={setActiveSeason} setActiveCategory={setActiveCategory} openProduct={openProduct} setScreen={setScreen} favorites={favorites} toggleFavorite={toggleFavorite} />}
          {screen === "product" && activeProduct && <ProductScreen t={t} product={activeProduct} setScreen={setScreen} addToCart={addToCart} favorites={favorites} toggleFavorite={toggleFavorite} />}
          {screen === "cart" && <CartScreen t={t} cart={cart} removeFromCart={removeFromCart} setScreen={setScreen} />}
          {screen === "checkout" && <CheckoutScreen t={t} cart={cart} setScreen={setScreen} clearCart={clearCart} tgUserId={tgUser.id} />}
          {screen === "confirmation" && <ConfirmationScreen t={t} setScreen={setScreen} />}
          {screen === "favorites" && <FavoritesScreen t={t} products={products} favorites={favorites} toggleFavorite={toggleFavorite} openProduct={openProduct} setScreen={setScreen} />}
          {screen === "profile" && <ProfileScreen t={t} tgUser={tgUser} />}
          {screen === "faq" && <FaqScreen t={t} faqItems={faqItems} setScreen={setScreen} />}
        </>
      )}

      {screen !== "confirmation" && screen !== "checkout" && !loading && (
        <BottomNav
          screen={screen}
          setScreen={setScreen}
          goCatalog={() => {
            setActiveCategory("all");
            setActiveSeason("all");
            setScreen("category");
          }}
          cartCount={cart.length}
          t={t}
        />
      )}
    </div>
  );
}
