import React, { useState, useEffect, useMemo } from "react";
import {
  Globe,
  ChevronLeft,
  ShoppingBag,
  Home,
  Grid3x3,
  Package,
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
  AlertCircle,
  CheckCircle2,
  Settings,
} from "lucide-react";

/* ----------------------------------------------------------------
   PALETTE
   Ink Plum #3A2432 · Ivory #F7F2EA · Brick Gold #B8834A
   Dusty Rose #C08A87 · Sage #7C8C6C · Charcoal #2A2420
   ---------------------------------------------------------------- */
const INK = "#3A2432";
const IVORY = "#F7F2EA";
const GOLD = "#B8834A";
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
      { name: "Графит", hex: "#3A2432", imageUrl: "https://picsum.photos/seed/dina-graphite/500/650" },
      { name: "Бордовый", hex: "#7A3B3B", imageUrl: "https://picsum.photos/seed/dina-burgundy/500/650" },
    ],
  },
  {
    id: "p4", category: "namaznik", season: "all", name: "Намазник Сафия", price: "280000",
    fabric: "Мягкий вискозный трикотаж", freeSize: true, customSizes: "",
    hasFit: true, minHeight: 150, maxHeight: 180, maxWeight: 85, inStock: true,
    colors: [
      { name: "Изумрудный", hex: "#3F5A48", imageUrl: "https://picsum.photos/seed/safiya-emerald/500/650" },
      { name: "Пыльная роза", hex: "#B8834A", imageUrl: "https://picsum.photos/seed/safiya-gold/500/650" },
    ],
  },
];

const money = (n) => Number(n || 0).toLocaleString("ru-RU") + " сум";

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
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg text-white"
      style={{ background: kind === "error" ? "#9C5F5C" : "#5C6B4E" }}
    >
      {kind === "error" ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
      {message}
    </div>
  );
}

/* ============================ STOREFRONT ============================ */
function BottomNav({ screen, setScreen, cartCount, t }) {
  const items = [
    { key: "home", icon: Home, label: t.home },
    { key: "catalog", icon: Grid3x3, label: t.catalog },
    { key: "cart", icon: ShoppingBag, label: t.cart, badge: cartCount },
    { key: "orders", icon: Package, label: t.orders },
  ];
  return (
    <div className="fixed bottom-0 inset-x-0 z-20 bg-[#F7F2EA] border-t border-[#3A2432]/10 flex justify-around py-2 max-w-md mx-auto">
      {items.map(({ key, icon: Icon, label, badge }) => {
        const active = screen === key || (key === "catalog" && screen === "category");
        return (
          <button key={key} onClick={() => setScreen(key)} className="flex flex-col items-center gap-0.5 px-3 py-1 relative">
            <Icon size={20} strokeWidth={active ? 2.4 : 1.8} color={active ? GOLD : INK} />
            {badge > 0 && (
              <span className="absolute -top-0.5 right-1 bg-[#B8834A] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {badge}
              </span>
            )}
            <span className={`text-[10px] ${active ? "font-medium" : ""}`} style={{ color: active ? GOLD : `${CHARCOAL}99` }}>
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
    return <span className="text-[10px] uppercase tracking-wider bg-[#7C8C6C]/15 text-[#5C6B4E] px-2 py-0.5 rounded-full">{t.seasonWinter}</span>;
  if (season === "summer")
    return <span className="text-[10px] uppercase tracking-wider bg-[#C08A87]/15 text-[#9C5F5C] px-2 py-0.5 rounded-full">{t.seasonSummer}</span>;
  return null;
}

function FitGauge({ product, t }) {
  if (!product.hasFit) return null;
  const scaleMin = 140, scaleMax = 190;
  const leftPct = ((product.minHeight - scaleMin) / (scaleMax - scaleMin)) * 100;
  const widthPct = ((product.maxHeight - product.minHeight) / (scaleMax - scaleMin)) * 100;
  return (
    <div className="bg-[#3A2432]/[0.04] rounded-2xl p-4 mt-4">
      <div className="flex items-center gap-2 mb-1.5">
        <Ruler size={16} color={GOLD} />
        <span className="font-medium text-sm" style={{ color: CHARCOAL }}>{t.fitTitle}</span>
      </div>
      <p className="text-xs text-[#2A2420]/70 mb-3 leading-relaxed">{t.fitDesc}</p>
      <div className="relative h-2 rounded-full bg-[#3A2432]/10 mb-2">
        <div className="absolute h-2 rounded-full" style={{ left: `${leftPct}%`, width: `${widthPct}%`, background: GOLD }} />
      </div>
      <div className="flex justify-between text-[11px] text-[#2A2420]/60 mb-3">
        <span>{scaleMin}cm</span><span>{scaleMax}cm</span>
      </div>
      <div className="flex gap-4 text-xs" style={{ color: CHARCOAL }}>
        <div><span className="text-[#2A2420]/50">{t.height}: </span><span className="font-medium">{t.fitFrom} {product.minHeight}–{product.maxHeight}cm</span></div>
        <div><span className="text-[#2A2420]/50">{t.weightUpTo}: </span><span className="font-medium">{product.maxWeight}kg</span></div>
      </div>
      <p className="text-[11px] text-[#9C5F5C] mt-2 italic">{t.oversizeNote}</p>
    </div>
  );
}

function HomeScreen({ t, setScreen, setActiveCategory, setActiveSeason, goAdmin }) {
  const cats = [
    { key: "dresses", label: t.dresses, seed: "cat-dresses" },
    { key: "scarves", label: t.scarves, seed: "cat-scarves" },
    { key: "namaznik", label: t.namaznik, seed: "cat-namaznik" },
  ];
  return (
    <div className="pb-24">
      <div className="relative h-56 flex items-end p-5" style={{
        backgroundImage: `linear-gradient(180deg, rgba(58,36,50,0.15), rgba(58,36,50,0.85)), url(https://picsum.photos/seed/hero-collection/800/600)`,
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <div>
          <p style={{ color: GOLD }} className="text-xs uppercase tracking-[0.2em] mb-1">{t.newArrivals}</p>
          <h1 className="font-serif text-2xl leading-tight" style={{ color: IVORY }}>{t.tagline}</h1>
        </div>
      </div>
      <div className="px-4 mt-5">
        <h2 className="font-serif text-lg mb-3" style={{ color: CHARCOAL }}>{t.catalog}</h2>
        <div className="grid grid-cols-3 gap-3">
          {cats.map((c) => (
            <button key={c.key} onClick={() => { setActiveCategory(c.key); setActiveSeason("all"); setScreen("category"); }} className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square rounded-2xl bg-cover bg-center border border-[#3A2432]/10" style={{ backgroundImage: `url(https://picsum.photos/seed/${c.seed}/300/300)` }} />
              <span className="text-xs font-medium" style={{ color: CHARCOAL }}>{c.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 mt-6">
        <div className="flex gap-3">
          <button onClick={() => { setActiveCategory("dresses"); setActiveSeason("winter"); setScreen("category"); }} className="flex-1 rounded-2xl overflow-hidden relative h-28" style={{
            backgroundImage: `linear-gradient(180deg, rgba(58,36,50,0.1), rgba(58,36,50,0.75)), url(https://picsum.photos/seed/banner-winter/400/300)`,
            backgroundSize: "cover", backgroundPosition: "center",
          }}>
            <span className="absolute bottom-2 left-3 text-xs font-medium" style={{ color: IVORY }}>{t.seasonWinter}</span>
          </button>
          <button onClick={() => { setActiveCategory("dresses"); setActiveSeason("summer"); setScreen("category"); }} className="flex-1 rounded-2xl overflow-hidden relative h-28" style={{
            backgroundImage: `linear-gradient(180deg, rgba(58,36,50,0.1), rgba(58,36,50,0.75)), url(https://picsum.photos/seed/banner-summer/400/300)`,
            backgroundSize: "cover", backgroundPosition: "center",
          }}>
            <span className="absolute bottom-2 left-3 text-xs font-medium" style={{ color: IVORY }}>{t.seasonSummer}</span>
          </button>
        </div>
      </div>
      <div className="px-4 mt-8 text-center">
        <button onClick={goAdmin} className="text-xs inline-flex items-center gap-1.5" style={{ color: `${CHARCOAL}66` }}>
          <Settings size={12} /> {t.forOwners}
        </button>
      </div>
    </div>
  );
}

function CategoryScreen({ t, products, category, season, setSeason, openProduct, setScreen }) {
  const catLabel = { dresses: t.dresses, scarves: t.scarves, namaznik: t.namaznik }[category];
  const list = products.filter(
    (p) => p.category === category && p.inStock !== false && (season === "all" || p.season === season || p.season === "all")
  );
  const showSeasonFilter = category === "dresses";

  return (
    <div className="pb-24">
      <TopBar title={catLabel} onBack={() => setScreen("home")} />
      {showSeasonFilter && (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          {[{ key: "all", label: t.all }, { key: "winter", label: t.seasonWinter }, { key: "summer", label: t.seasonSummer }].map((s) => (
            <button key={s.key} onClick={() => setSeason(s.key)} className="px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap border" style={{
              background: season === s.key ? INK : "transparent", color: season === s.key ? IVORY : `${CHARCOAL}B3`,
              borderColor: season === s.key ? INK : "rgba(58,36,50,0.2)",
            }}>
              {s.label}
            </button>
          ))}
        </div>
      )}
      {list.length === 0 ? (
        <p className="text-sm text-center py-16" style={{ color: `${CHARCOAL}66` }}>{t.noProducts}</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4 mt-1">
          {list.map((p) => (
            <button key={p.id} onClick={() => openProduct(p)} className="text-left">
              <div className="w-full aspect-[3/4] rounded-2xl bg-cover bg-center mb-2 border border-[#3A2432]/10" style={{
                backgroundImage: p.colors?.[0]?.imageUrl ? `url(${p.colors[0].imageUrl})` : undefined,
                backgroundColor: p.colors?.[0]?.hex || "#eee",
              }} />
              <p className="text-sm font-medium leading-snug" style={{ color: CHARCOAL }}>{p.name}</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: GOLD }}>{money(p.price)}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductScreen({ t, product, setScreen, addToCart }) {
  const [colorIdx, setColorIdx] = useState(0);
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
      <div className="w-full aspect-[4/5] bg-cover bg-center" style={{
        backgroundImage: color.imageUrl ? `url(${color.imageUrl})` : undefined, backgroundColor: color.hex,
      }} />
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-xl" style={{ color: CHARCOAL }}>{product.name}</h1>
          <SeasonTag season={product.season} t={t} />
        </div>
        <p className="font-medium mt-1" style={{ color: GOLD }}>{money(product.price)}</p>

        <div className="mt-5">
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: `${CHARCOAL}80` }}>{t.color}: <span style={{ color: CHARCOAL }}>{color.name}</span></p>
          <div className="flex gap-2">
            {product.colors.map((c, i) => (
              <button key={c.name + i} onClick={() => setColorIdx(i)} className="w-8 h-8 rounded-full border-2" style={{ backgroundColor: c.hex, borderColor: i === colorIdx ? GOLD : "transparent" }} />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: `${CHARCOAL}80` }}>{t.size}</p>
          <div className="flex gap-2">
            {sizes.map((s) => (
              <button key={s} onClick={() => setSize(s)} className="px-4 py-1.5 rounded-full text-sm border" style={{
                background: size === s ? INK : "transparent", color: size === s ? IVORY : CHARCOAL,
                borderColor: size === s ? INK : "rgba(58,36,50,0.2)",
              }}>
                {s === "freeSize" ? t.freeSize : s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: `${CHARCOAL}80` }}>{t.fabric}</p>
          <p className="text-sm" style={{ color: CHARCOAL }}>{product.fabric}</p>
        </div>

        <FitGauge product={product} t={t} />
      </div>

      <div className="fixed bottom-16 inset-x-0 max-w-md mx-auto px-4 py-3 bg-[#F7F2EA]/95 backdrop-blur border-t border-[#3A2432]/10">
        <button onClick={handleAdd} className="w-full py-3 rounded-full text-white font-medium flex items-center justify-center gap-2 active:opacity-90" style={{ background: GOLD }}>
          {justAdded ? (<><Check size={18} /> {t.added}</>) : t.addToCart}
        </button>
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
          <p className="text-sm mt-1" style={{ color: `${CHARCOAL}80` }}>{t.emptyCartSub}</p>
        </div>
      ) : (
        <>
          <div className="px-4 mt-3 space-y-3">
            {cart.map((item, idx) => (
              <div key={idx} className="flex gap-3 bg-white/60 rounded-2xl p-2.5 border border-[#3A2432]/10">
                <div className="w-16 h-20 rounded-xl bg-cover bg-center flex-shrink-0" style={{
                  backgroundImage: item.color.imageUrl ? `url(${item.color.imageUrl})` : undefined, backgroundColor: item.color.hex,
                }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: CHARCOAL }}>{item.product.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: `${CHARCOAL}99` }}>{item.color.name} · {item.size === "freeSize" ? t.freeSize : item.size}</p>
                  <p className="text-sm font-medium mt-1" style={{ color: GOLD }}>{money(item.product.price)}</p>
                </div>
                <button onClick={() => removeFromCart(idx)} className="p-1 self-start"><Trash2 size={16} color="#9C5F5C" /></button>
              </div>
            ))}
          </div>
          <div className="fixed bottom-16 inset-x-0 max-w-md mx-auto px-4 py-3 bg-[#F7F2EA]/95 backdrop-blur border-t border-[#3A2432]/10">
            <div className="flex justify-between text-sm mb-2">
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

function CheckoutScreen({ t, cart, setScreen, clearCart }) {
  const total = cart.reduce((s, item) => s + Number(item.product.price || 0), 0);
  const [locationShared, setLocationShared] = useState(false);
  const [phone, setPhone] = useState("");
  const [checkUploaded, setCheckUploaded] = useState(false);
  const canSubmit = locationShared && phone.trim().length > 5 && checkUploaded;

  return (
    <div className="pb-28">
      <TopBar title={t.checkout} onBack={() => setScreen("cart")} />
      <div className="px-4 mt-4">
        <h2 className="font-serif text-base mb-2" style={{ color: CHARCOAL }}>{t.deliveryTitle}</h2>
        <p className="text-xs mb-3" style={{ color: `${CHARCOAL}99` }}>{t.deliverySub}</p>
        <button onClick={() => setLocationShared(true)} className="w-full flex items-center gap-2 py-3 rounded-xl border text-sm mb-3 justify-center" style={{
          background: locationShared ? "rgba(124,140,108,0.1)" : "transparent",
          borderColor: locationShared ? "#7C8C6C" : "rgba(58,36,50,0.2)", color: locationShared ? "#5C6B4E" : CHARCOAL,
        }}>
          {locationShared ? <Check size={16} /> : <MapPin size={16} />}
          {locationShared ? t.locationShared : t.shareLocation}
        </button>
        <div className="flex items-center gap-2 border border-[#3A2432]/20 rounded-xl px-3 py-2.5 mb-2">
          <Phone size={16} color={INK} className="opacity-60" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phonePlaceholder} className="flex-1 bg-transparent text-sm outline-none" style={{ color: CHARCOAL }} />
        </div>
        <p className="text-[11px] leading-relaxed" style={{ color: `${CHARCOAL}80` }}>{t.deliveryEstimate}</p>
      </div>
      <div className="px-4 mt-6">
        <h2 className="font-serif text-base mb-2" style={{ color: CHARCOAL }}>{t.paymentTitle}</h2>
        <p className="text-xs mb-3 leading-relaxed" style={{ color: `${CHARCOAL}99` }}>{t.paymentSub}</p>
        <div className="rounded-2xl p-4 mb-3" style={{ background: INK }}>
          <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: `${IVORY}80` }}>{t.cardNumber}</p>
          <p className="font-mono text-lg tracking-wider" style={{ color: IVORY }}>8600 XXXX XXXX 1234</p>
        </div>
        <button onClick={() => setCheckUploaded(true)} className="w-full flex items-center gap-2 py-3 rounded-xl border text-sm justify-center" style={{
          background: checkUploaded ? "rgba(124,140,108,0.1)" : "transparent",
          borderColor: checkUploaded ? "#7C8C6C" : "rgba(58,36,50,0.2)", color: checkUploaded ? "#5C6B4E" : CHARCOAL,
        }}>
          {checkUploaded ? <Check size={16} /> : <Upload size={16} />}
          {checkUploaded ? t.uploadedCheck : t.uploadCheck}
        </button>
      </div>
      <div className="fixed bottom-16 inset-x-0 max-w-md mx-auto px-4 py-3 bg-[#F7F2EA]/95 backdrop-blur border-t border-[#3A2432]/10">
        <div className="flex justify-between text-sm mb-2">
          <span style={{ color: `${CHARCOAL}99` }}>{t.total}</span>
          <span className="font-medium" style={{ color: CHARCOAL }}>{money(total)}</span>
        </div>
        <button disabled={!canSubmit} onClick={() => { clearCart(); setScreen("confirmation"); }} className="w-full py-3 rounded-full font-medium flex items-center justify-center gap-2" style={{
          background: canSubmit ? GOLD : "rgba(58,36,50,0.15)", color: canSubmit ? "#fff" : "rgba(42,36,32,0.4)",
        }}>
          <CreditCard size={16} />{t.placeOrder}
        </button>
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
      <p className="text-sm leading-relaxed mb-8" style={{ color: `${CHARCOAL}99` }}>{t.orderSentSub}</p>
      <button onClick={() => setScreen("home")} className="px-6 py-3 rounded-full text-sm font-medium" style={{ background: INK, color: IVORY }}>{t.backToHome}</button>
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
      <p className="text-sm mb-8" style={{ color: `${IVORY}80` }}>Modest fashion, made with care</p>
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
function ColorRow({ color, onChange, onRemove, canRemove }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <input type="color" value={color.hex} onChange={(e) => onChange({ ...color, hex: e.target.value })} className="w-9 h-9 rounded-lg border border-black/10 cursor-pointer flex-shrink-0" />
      <input placeholder="Название цвета" value={color.name} onChange={(e) => onChange({ ...color, name: e.target.value })} className="flex-1 min-w-0 border border-black/15 rounded-lg px-2.5 py-2 text-sm" />
      <input placeholder="Ссылка на фото" value={color.imageUrl} onChange={(e) => onChange({ ...color, imageUrl: e.target.value })} className="flex-[1.4] min-w-0 border border-black/15 rounded-lg px-2.5 py-2 text-sm" />
      {canRemove && <button onClick={onRemove} className="p-1.5 flex-shrink-0"><Trash2 size={16} color="#9C5F5C" /></button>}
    </div>
  );
}

const emptyProduct = () => ({
  id: "p_" + Date.now(), category: "dresses", season: "all", name: "", price: "", fabric: "",
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
        <label className="block text-xs uppercase tracking-wide text-black/50 mb-1">Название модели</label>
        <input value={p.name} onChange={(e) => update({ name: e.target.value })} placeholder="Например: Модель Амира" className="w-full border border-black/15 rounded-xl px-3 py-2.5 text-sm mb-4" />
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs uppercase tracking-wide text-black/50 mb-1">Категория</label>
            <select value={p.category} onChange={(e) => update({ category: e.target.value })} className="w-full border border-black/15 rounded-xl px-3 py-2.5 text-sm bg-white">
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-black/50 mb-1">Сезон</label>
            <select value={p.season} onChange={(e) => update({ season: e.target.value })} className="w-full border border-black/15 rounded-xl px-3 py-2.5 text-sm bg-white">
              {SEASONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>
        <label className="block text-xs uppercase tracking-wide text-black/50 mb-1">Цена (сум)</label>
        <input type="number" value={p.price} onChange={(e) => update({ price: e.target.value })} placeholder="350000" className="w-full border border-black/15 rounded-xl px-3 py-2.5 text-sm mb-4" />
        <label className="block text-xs uppercase tracking-wide text-black/50 mb-1">Ткань</label>
        <input value={p.fabric} onChange={(e) => update({ fabric: e.target.value })} placeholder="Например: плотный трикотаж, 95% хлопок" className="w-full border border-black/15 rounded-xl px-3 py-2.5 text-sm mb-4" />
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm mb-2">
            <input type="checkbox" checked={p.freeSize} onChange={(e) => update({ freeSize: e.target.checked })} />
            Свободный размер
          </label>
          {!p.freeSize && (
            <input value={p.customSizes} onChange={(e) => update({ customSizes: e.target.value })} placeholder="S, M, L (через запятую)" className="w-full border border-black/15 rounded-xl px-3 py-2.5 text-sm" />
          )}
        </div>
        <div className="mb-4 bg-black/[0.03] rounded-2xl p-3.5">
          <label className="flex items-center gap-2 text-sm mb-3">
            <input type="checkbox" checked={p.hasFit} onChange={(e) => update({ hasFit: e.target.checked })} />
            Указать параметры посадки (рекомендуется)
          </label>
          {p.hasFit && (
            <div className="grid grid-cols-3 gap-2">
              <div><label className="block text-[10px] text-black/50 mb-1">Рост от, см</label><input type="number" value={p.minHeight} onChange={(e) => update({ minHeight: Number(e.target.value) })} className="w-full border border-black/15 rounded-lg px-2 py-1.5 text-sm" /></div>
              <div><label className="block text-[10px] text-black/50 mb-1">Рост до, см</label><input type="number" value={p.maxHeight} onChange={(e) => update({ maxHeight: Number(e.target.value) })} className="w-full border border-black/15 rounded-lg px-2 py-1.5 text-sm" /></div>
              <div><label className="block text-[10px] text-black/50 mb-1">Вес до, кг</label><input type="number" value={p.maxWeight} onChange={(e) => update({ maxWeight: Number(e.target.value) })} className="w-full border border-black/15 rounded-lg px-2 py-1.5 text-sm" /></div>
            </div>
          )}
        </div>
        <label className="block text-xs uppercase tracking-wide text-black/50 mb-2">Цвета и фото</label>
        {p.colors.map((c, i) => <ColorRow key={i} color={c} onChange={(val) => updateColor(i, val)} onRemove={() => removeColor(i)} canRemove={p.colors.length > 1} />)}
        <button onClick={addColor} className="flex items-center gap-1 text-sm mb-4" style={{ color: GOLD }}><Plus size={15} /> Добавить цвет</button>
        <label className="flex items-center gap-2 text-sm mb-5">
          <input type="checkbox" checked={p.inStock} onChange={(e) => update({ inStock: e.target.checked })} />
          В наличии
        </label>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-3 rounded-full border border-black/15 text-sm font-medium" style={{ color: CHARCOAL }}>Отмена</button>
          <button onClick={handleSave} disabled={saving} className="flex-1 py-3 rounded-full text-sm font-medium text-white flex items-center justify-center gap-2" style={{ background: GOLD, opacity: saving ? 0.6 : 1 }}>
            <Save size={15} />{saving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminScreen({ t, products, upsertLocal, removeLocal, goShop, showToast }) {
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("all");

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

  return (
    <div className="min-h-screen" style={{ background: IVORY }}>
      <div className="sticky top-0 z-10 px-5 py-4 flex items-center justify-between" style={{ background: INK }}>
        <div>
          <button onClick={goShop} className="text-xs mb-1 block" style={{ color: `${IVORY}90` }}>{t.backToShop}</button>
          <h1 className="font-serif text-lg" style={{ color: IVORY }}>{t.forOwners}</h1>
        </div>
        <button onClick={() => setEditing(emptyProduct())} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-white" style={{ background: GOLD }}>
          <Plus size={16} /> Добавить
        </button>
      </div>
      <div className="flex gap-2 px-5 py-3 overflow-x-auto">
        {[{ value: "all", label: "Все / All" }, ...CATEGORIES].map((c) => (
          <button key={c.value} onClick={() => setFilter(c.value)} className="px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap border" style={{
            background: filter === c.value ? INK : "transparent", color: filter === c.value ? IVORY : CHARCOAL,
            borderColor: filter === c.value ? INK : "rgba(0,0,0,0.15)",
          }}>{c.label}</button>
        ))}
      </div>
      <div className="px-5 pb-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center text-center py-16">
            <Package size={32} color={INK} strokeWidth={1.3} className="mb-3 opacity-30" />
            <p className="text-sm text-black/50">Товаров пока нет</p>
          </div>
        ) : (
          <div className="space-y-2 mt-1">
            {filtered.map((p) => (
              <div key={p.id} className="flex items-center gap-3 bg-white/70 rounded-2xl p-3 border border-black/5">
                <div className="w-14 h-16 rounded-xl flex-shrink-0 bg-cover bg-center border border-black/10" style={{
                  backgroundImage: p.colors?.[0]?.imageUrl ? `url(${p.colors[0].imageUrl})` : undefined, backgroundColor: p.colors?.[0]?.hex || "#eee",
                }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: CHARCOAL }}>{p.name}</p>
                  <p className="text-xs text-black/45">{CATEGORIES.find((c) => c.value === p.category)?.label} · {money(p.price)}</p>
                  {!p.inStock && <span className="text-[10px] text-white px-1.5 py-0.5 rounded-full" style={{ background: "#9C5F5C" }}>Нет в наличии</span>}
                </div>
                <button onClick={() => setEditing(p)} className="p-2"><Edit2 size={16} color={INK} /></button>
                <button onClick={() => handleDelete(p.id)} className="p-2"><Trash2 size={16} color="#9C5F5C" /></button>
              </div>
            ))}
          </div>
        )}
      </div>
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

  const t = useMemo(() => T[lang || "ru"], [lang]);

  const showToast = (message, kind = "success") => {
    setToast({ message, kind });
    setTimeout(() => setToast({ message: "", kind: "success" }), 2200);
  };

  if (view === "admin") {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600&display=swap'); .font-serif { font-family: 'Playfair Display', serif; }`}</style>
        <Toast message={toast.message} kind={toast.kind} />
        <AdminScreen t={t} products={products} upsertLocal={upsertLocal} removeLocal={removeLocal} goShop={() => setView("shop")} showToast={showToast} />
      </div>
    );
  }

  if (!lang) return <LangScreen onPick={setLang} />;

  const addToCart = (item) => setCart((c) => [...c, item]);
  const removeFromCart = (idx) => setCart((c) => c.filter((_, i) => i !== idx));
  const clearCart = () => setCart([]);
  const openProduct = (p) => { setActiveProduct(p); setScreen("product"); };

  return (
    <div className="max-w-md mx-auto min-h-screen" style={{ background: IVORY, fontFamily: "'Manrope', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap'); .font-serif { font-family: 'Playfair Display', serif; }`}</style>

      {loading ? (
        <p className="text-center py-24 text-sm" style={{ color: `${CHARCOAL}66` }}>Загрузка...</p>
      ) : (
        <>
          {screen === "home" && <HomeScreen t={t} setScreen={setScreen} setActiveCategory={setActiveCategory} setActiveSeason={setActiveSeason} goAdmin={() => setView("admin")} />}
          {screen === "category" && <CategoryScreen t={t} products={products} category={activeCategory} season={activeSeason} setSeason={setActiveSeason} openProduct={openProduct} setScreen={setScreen} />}
          {screen === "product" && activeProduct && <ProductScreen t={t} product={activeProduct} setScreen={setScreen} addToCart={addToCart} />}
          {screen === "cart" && <CartScreen t={t} cart={cart} removeFromCart={removeFromCart} setScreen={setScreen} />}
          {screen === "checkout" && <CheckoutScreen t={t} cart={cart} setScreen={setScreen} clearCart={clearCart} />}
          {screen === "confirmation" && <ConfirmationScreen t={t} setScreen={setScreen} />}
          {screen === "orders" && (
            <div className="pb-24">
              <TopBar title={t.orders} />
              <div className="flex flex-col items-center justify-center text-center px-8 py-24">
                <Package size={36} color={INK} strokeWidth={1.3} className="mb-3 opacity-40" />
              </div>
            </div>
          )}
        </>
      )}

      {screen !== "confirmation" && !loading && <BottomNav screen={screen} setScreen={setScreen} cartCount={cart.length} t={t} />}
    </div>
  );
}
