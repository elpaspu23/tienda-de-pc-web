export const products = [
  // ═══════════════════════════════════════
  // 🎮 GAMING
  // ═══════════════════════════════════════
  {
    id: 1,
    name: "PlayStation 5 Slim",
    category: "Gaming",
    price: 2499900,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    description: "Consola Sony PS5 Slim con lector de disco, 1TB SSD, DualSense incluido",
    rating: 4.9,
    reviews: 342,
    stock: 12,
    featured: true
  },
  {
    id: 2,
    name: "Xbox Series X",
    category: "Gaming",
    price: 2399900,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400",
    description: "Consola Microsoft 1TB, 4K a 120fps, Game Pass compatible",
    rating: 4.8,
    reviews: 256,
    stock: 8,
    featured: false
  },
  {
    id: 3,
    name: "Nintendo Switch OLED",
    category: "Gaming",
    price: 1749900,
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400",
    description: "Pantalla OLED 7 pulgadas, 64GB, dock incluido, Joy-Con blancos",
    rating: 4.7,
    reviews: 189,
    stock: 20,
    featured: false
  },
  {
    id: 4,
    name: "Silla Gamer Cougar Armor",
    category: "Gaming",
    price: 1299900,
    image: "https://gamerscolombia.com/cdn/shop/files/238.png?v=1758061083",
    description: "Ergonómica, reclinable 180°, soporte lumbar, base de acero",
    rating: 4.5,
    reviews: 134,
    stock: 15,
    featured: false
  },
  {
    id: 5,
    name: "Control DualSense Edge",
    category: "Gaming",
    price: 899900,
    image: "https://placehold.co/600x400/1a1a1a/ffffff?text=DualSense+Edge",
    description: "Control profesional PS5, gatillos ajustables, perfiles personalizables",
    rating: 4.6,
    reviews: 98,
    stock: 25,
    featured: false
  },

  // ═══════════════════════════════════════
  // 💻 LAPTOPS
  // ═══════════════════════════════════════
  {
    id: 6,
    name: "MacBook Pro M3 14\"",
    category: "Laptops",
    price: 7999900,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    description: "Chip M3 Pro, 18GB RAM, 512GB SSD, pantalla Liquid Retina XDR",
    rating: 4.9,
    reviews: 278,
    stock: 10,
    featured: true
  },
  {
    id: 7,
    name: "ASUS ROG Strix G16",
    category: "Laptops",
    price: 5499900,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
    description: "Intel i9-13980HX, RTX 4060, 16GB DDR5, 1TB SSD, 165Hz",
    rating: 4.7,
    reviews: 156,
    stock: 7,
    featured: true
  },
  {
    id: 8,
    name: "Lenovo ThinkPad X1 Carbon",
    category: "Laptops",
    price: 6299900,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
    description: "Intel i7-1365U, 16GB RAM, 512GB SSD, pantalla 14\" 2.8K OLED",
    rating: 4.8,
    reviews: 203,
    stock: 12,
    featured: false
  },
  {
    id: 9,
    name: "HP Pavilion 15",
    category: "Laptops",
    price: 2799900,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    description: "AMD Ryzen 5 7530U, 8GB RAM, 512GB SSD, pantalla FHD IPS",
    rating: 4.3,
    reviews: 312,
    stock: 30,
    featured: false
  },
  {
    id: 10,
    name: "Dell XPS 13 Plus",
    category: "Laptops",
    price: 5999900,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400",
    description: "Intel i7-1360P, 16GB, 512GB SSD, pantalla 13.4\" OLED 3.5K",
    rating: 4.6,
    reviews: 145,
    stock: 8,
    featured: false
  },

  // ═══════════════════════════════════════
  // 📱 CELULARES (Phones)
  // ═══════════════════════════════════════
  {
    id: 11,
    name: "iPhone 15 Pro Max",
    category: "Phones",
    price: 5999900,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
    description: "256GB, Titanio Natural, chip A17 Pro, cámara 48MP, USB-C",
    rating: 4.9,
    reviews: 456,
    stock: 15,
    featured: true
  },
  {
    id: 12,
    name: "Samsung Galaxy S24 Ultra",
    category: "Phones",
    price: 5499900,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
    description: "256GB, Galaxy AI, S Pen, cámara 200MP, Snapdragon 8 Gen 3",
    rating: 4.8,
    reviews: 389,
    stock: 18,
    featured: true
  },
  {
    id: 13,
    name: "Google Pixel 8 Pro",
    category: "Phones",
    price: 3999900,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
    description: "128GB, Tensor G3, cámara 50MP con Magic Eraser, Android 14",
    rating: 4.7,
    reviews: 198,
    stock: 10,
    featured: false
  },
  {
    id: 14,
    name: "Xiaomi 14 Ultra",
    category: "Phones",
    price: 3499900,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    description: "512GB, Leica optics, Snapdragon 8 Gen 3, carga 90W",
    rating: 4.6,
    reviews: 167,
    stock: 14,
    featured: false
  },
  {
    id: 15,
    name: "Samsung Galaxy A54 5G",
    category: "Phones",
    price: 1399900,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400",
    description: "128GB, Super AMOLED 6.4\", resistente al agua, batería 5000mAh",
    rating: 4.4,
    reviews: 534,
    stock: 40,
    featured: false
  },

  // ═══════════════════════════════════════
  // 🎧 AUDIO
  // ═══════════════════════════════════════
  {
    id: 16,
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: 1599900,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
    description: "Cancelación de ruido líder, 30hrs batería, audio Hi-Res, LDAC",
    rating: 4.9,
    reviews: 423,
    stock: 20,
    featured: true
  },
  {
    id: 17,
    name: "AirPods Pro 2 USB-C",
    category: "Audio",
    price: 1099900,
    image: "https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?w=400",
    description: "Cancelación activa de ruido, audio espacial, IP54, USB-C",
    rating: 4.8,
    reviews: 567,
    stock: 35,
    featured: false
  },
  {
    id: 18,
    name: "JBL Charge 5",
    category: "Audio",
    price: 599900,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    description: "Parlante portátil, 20hrs batería, IP67, PartyBoost, Power Bank",
    rating: 4.6,
    reviews: 289,
    stock: 25,
    featured: false
  },
  {
    id: 19,
    name: "HyperX Cloud III Wireless",
    category: "Audio",
    price: 599900,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400",
    description: "Gaming headset inalámbrico, DTS Spatial Audio, 120hrs batería",
    rating: 4.7,
    reviews: 178,
    stock: 18,
    featured: false
  },
  {
    id: 20,
    name: "Marshall Stanmore III",
    category: "Audio",
    price: 1899900,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400",
    description: "Parlante Bluetooth premium, diseño vintage, sonido envolvente",
    rating: 4.8,
    reviews: 156,
    stock: 8,
    featured: false
  },

  // ═══════════════════════════════════════
  // 🖥️ MONITORES
  // ═══════════════════════════════════════
  {
    id: 21,
    name: "Samsung Odyssey G9 49\"",
    category: "Monitors",
    price: 4999900,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
    description: "Super ultrawide curvo, 240Hz, 1ms, DQHD 5120x1440, HDR1000",
    rating: 4.8,
    reviews: 134,
    stock: 5,
    featured: true
  },
  {
    id: 22,
    name: "LG UltraGear 27GP850",
    category: "Monitors",
    price: 1799900,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400",
    description: "27\" QHD Nano IPS, 165Hz, 1ms, HDR400, G-Sync Compatible",
    rating: 4.7,
    reviews: 234,
    stock: 12,
    featured: false
  },
  {
    id: 23,
    name: "ASUS ProArt PA278QV",
    category: "Monitors",
    price: 1499900,
    image: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=400",
    description: "27\" WQHD IPS, 100% sRGB, Calman Verified, para diseño gráfico",
    rating: 4.6,
    reviews: 89,
    stock: 10,
    featured: false
  },
  {
    id: 24,
    name: "Dell UltraSharp U2723QE",
    category: "Monitors",
    price: 2599900,
    image: "https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=400",
    description: "27\" 4K UHD IPS Black, USB-C 90W, DCI-P3 98%, KVM integrado",
    rating: 4.8,
    reviews: 167,
    stock: 8,
    featured: false
  },

  // ═══════════════════════════════════════
  // ⌨️ PERIFÉRICOS
  // ═══════════════════════════════════════
  {
    id: 25,
    name: "Logitech MX Master 3S",
    category: "Peripherals",
    price: 449900,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    description: "Mouse ergonómico, sensor 8K DPI, MagSpeed, USB-C, multi-dispositivo",
    rating: 4.9,
    reviews: 456,
    stock: 30,
    featured: false
  },
  {
    id: 26,
    name: "Keychron Q1 Pro",
    category: "Peripherals",
    price: 799900,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400",
    description: "Teclado mecánico 75%, QMK/VIA, Gateron Jupiter switches, aluminio CNC",
    rating: 4.8,
    reviews: 189,
    stock: 12,
    featured: false
  },
  {
    id: 27,
    name: "Razer DeathAdder V3",
    category: "Peripherals",
    price: 399900,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400",
    description: "Mouse gaming, sensor Focus Pro 30K, 59g ultraligero, HyperSpeed",
    rating: 4.7,
    reviews: 234,
    stock: 20,
    featured: false
  },
  {
    id: 28,
    name: "Logitech G Pro X TKL",
    category: "Peripherals",
    price: 649900,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
    description: "Teclado gaming TKL inalámbrico, GX switches, LIGHTSYNC RGB",
    rating: 4.6,
    reviews: 312,
    stock: 15,
    featured: false
  },
  {
    id: 29,
    name: "Elgato Stream Deck MK.2",
    category: "Peripherals",
    price: 699900,
    image: "https://placehold.co/600x400/1a1a1a/ffffff?text=Stream+Deck",
    description: "15 teclas LCD personalizables, ideal para streaming y productividad",
    rating: 4.7,
    reviews: 145,
    stock: 10,
    featured: false
  },

  // ═══════════════════════════════════════
  // 📱 TABLETS
  // ═══════════════════════════════════════
  {
    id: 30,
    name: "iPad Pro M2 11\"",
    category: "Tablets",
    price: 4199900,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    description: "Chip M2, pantalla Liquid Retina, 128GB, Face ID, Apple Pencil 2",
    rating: 4.9,
    reviews: 278,
    stock: 10,
    featured: false
  },
  {
    id: 31,
    name: "Samsung Galaxy Tab S9 FE",
    category: "Tablets",
    price: 1699900,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400",
    description: "10.9\" LCD, Exynos 1380, 6GB RAM, S Pen incluido, IP68",
    rating: 4.5,
    reviews: 189,
    stock: 15,
    featured: false
  },
  {
    id: 32,
    name: "iPad Air M1",
    category: "Tablets",
    price: 2999900,
    image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=400",
    description: "Chip M1, 10.9\" Liquid Retina, 64GB, Touch ID, compatible Apple Pencil",
    rating: 4.7,
    reviews: 345,
    stock: 18,
    featured: false
  },

  // ═══════════════════════════════════════
  // ⌚ WEARABLES (Relojes)
  // ═══════════════════════════════════════
  {
    id: 33,
    name: "Apple Watch Series 9",
    category: "Wearables",
    price: 1999900,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400",
    description: "GPS + Cellular, 45mm, chip S9, doble toque, pantalla always-on",
    rating: 4.8,
    reviews: 345,
    stock: 20,
    featured: false
  },
  {
    id: 34,
    name: "Samsung Galaxy Watch 6 Classic",
    category: "Wearables",
    price: 1499900,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
    description: "47mm, bisel giratorio, sensor BioActive, Wear OS, GPS integrado",
    rating: 4.6,
    reviews: 198,
    stock: 15,
    featured: false
  },
  {
    id: 35,
    name: "Garmin Venu 3",
    category: "Wearables",
    price: 1799900,
    image: "https://placehold.co/600x400/1a1a1a/ffffff?text=Garmin+Venu+3",
    description: "AMOLED, Body Battery, Sleep Coach, 14 días batería, GPS multibanda",
    rating: 4.7,
    reviews: 134,
    stock: 10,
    featured: false
  },
  {
    id: 36,
    name: "Xiaomi Smart Band 8 Pro",
    category: "Wearables",
    price: 249900,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
    description: "AMOLED 1.74\", GPS independiente, SpO2, 150+ modos deportivos",
    rating: 4.4,
    reviews: 567,
    stock: 50,
    featured: false
  },

  // ═══════════════════════════════════════
  // 🔧 COMPONENTES
  // ═══════════════════════════════════════
  {
    id: 37,
    name: "NVIDIA RTX 4070 Ti Super",
    category: "Components",
    price: 4199900,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400",
    description: "16GB GDDR6X, DLSS 3, Ray Tracing, PCIe 4.0, ideal para 1440p",
    rating: 4.8,
    reviews: 198,
    stock: 6,
    featured: true
  },
  {
    id: 38,
    name: "AMD Ryzen 7 7800X3D",
    category: "Components",
    price: 1799900,
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400",
    description: "8 núcleos, 16 hilos, 3D V-Cache 96MB, AM5, el mejor para gaming",
    rating: 4.9,
    reviews: 267,
    stock: 12,
    featured: false
  },
  {
    id: 39,
    name: "Samsung 990 Pro 2TB NVMe",
    category: "Components",
    price: 899900,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400",
    description: "PCIe 4.0 NVMe M.2, 7450MB/s lectura, ideal para PS5 y PC",
    rating: 4.7,
    reviews: 345,
    stock: 25,
    featured: false
  },
  {
    id: 40,
    name: "Corsair Vengeance DDR5 32GB",
    category: "Components",
    price: 549900,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400",
    description: "2x16GB DDR5-6000, CL30, Intel XMP 3.0, RGB, optimizada para gaming",
    rating: 4.6,
    reviews: 178,
    stock: 20,
    featured: false
  },
  {
    id: 41,
    name: "ASUS ROG Strix B650E-F",
    category: "Components",
    price: 1199900,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
    description: "Motherboard AM5, DDR5, PCIe 5.0, WiFi 6E, USB4, Aura Sync RGB",
    rating: 4.7,
    reviews: 123,
    stock: 10,
    featured: false
  },
  {
    id: 42,
    name: "Corsair RM850x 2024",
    category: "Components",
    price: 599900,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400",
    description: "850W 80+ Gold, Full Modular, ATX 3.0, ventilador Zero RPM, 10 años garantía",
    rating: 4.8,
    reviews: 234,
    stock: 15,
    featured: false
  },

  // ═══════════════════════════════════════
  // 🎮 GAMING (extras)
  // ═══════════════════════════════════════
  {
    id: 43,
    name: "Steam Deck OLED 1TB",
    category: "Gaming",
    price: 2999900,
    image: "https://images.unsplash.com/photo-1640955014216-75201056c829?w=400",
    description: "Pantalla OLED HDR 7.4\", APU AMD, 1TB NVMe, SteamOS, 12hrs batería",
    rating: 4.8,
    reviews: 167,
    stock: 5,
    featured: true
  },

  // ═══════════════════════════════════════
  // 🎧 AUDIO (extra)
  // ═══════════════════════════════════════
  {
    id: 44,
    name: "Bose QuietComfort Ultra",
    category: "Audio",
    price: 1699900,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    description: "Inmersive audio, cancelación de ruido adaptativa, 24hrs batería",
    rating: 4.8,
    reviews: 234,
    stock: 12,
    featured: false
  },

  // ═══════════════════════════════════════
  // 🖥️ MONITORES (extra)
  // ═══════════════════════════════════════
  {
    id: 45,
    name: "BenQ MOBIUZ EX2710Q",
    category: "Monitors",
    price: 1999900,
    image: "https://placehold.co/600x400/1a1a1a/ffffff?text=BenQ+MOBIUZ",
    description: "27\" QHD IPS 165Hz, HDRi, treVolo speakers, FreeSync Premium",
    rating: 4.6,
    reviews: 112,
    stock: 9,
    featured: false
  }
];

export const categories = [
  { id: 1, name: "Gaming", icon: "gamepad2", count: 6 },
  { id: 2, name: "Laptops", icon: "laptop", count: 5 },
  { id: 3, name: "Phones", icon: "smartphone", count: 5 },
  { id: 4, name: "Audio", icon: "headphones", count: 6 },
  { id: 5, name: "Monitors", icon: "monitor", count: 5 },
  { id: 6, name: "Peripherals", icon: "keyboard", count: 5 },
  { id: 7, name: "Tablets", icon: "tablet", count: 3 },
  { id: 8, name: "Wearables", icon: "watch", count: 4 },
  { id: 9, name: "Components", icon: "cpu", count: 6 }
];
