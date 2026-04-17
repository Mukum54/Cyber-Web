import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const seedProducts = [
  {
    id: "prod-1",
    title: 'HP ProBook 450 G10 Laptop',
    description:
      "Powerful business laptop featuring Intel Core i7, 16GB RAM, 512GB SSD, and a 15.6-inch Full HD display. Perfect for professionals and developers who need reliable performance on the go.",
    shortDesc: "Intel Core i7, 16GB RAM, 512GB SSD, 15.6\" FHD",
    price: 285000,
    comparePrice: 320000,
    category: "ELECTRONICS",
    images: null,
    stock: 12,
    features: JSON.stringify([
      "Intel Core i7-1355U Processor",
      "16GB DDR4 RAM",
      "512GB NVMe SSD",
      '15.6" Full HD IPS Display',
      "Windows 11 Pro",
      "Fingerprint Reader",
      "Backlit Keyboard",
      "Up to 8 hours battery",
    ]),
    isFeatured: true,
  },
  {
    id: "prod-2",
    title: "Dell UltraSharp 27\" 4K Monitor",
    description:
      "Stunning 27-inch 4K UHD monitor with IPS panel, USB-C connectivity, and factory-calibrated color accuracy. Ideal for designers, developers, and content creators.",
    shortDesc: "4K UHD, IPS, USB-C, 99% sRGB",
    price: 185000,
    comparePrice: 210000,
    category: "ELECTRONICS",
    images: null,
    stock: 8,
    features: JSON.stringify([
      '27" 4K UHD (3840x2160)',
      "IPS Panel, 60Hz",
      "USB-C with 65W Power Delivery",
      "99% sRGB, 95% DCI-P3",
      "Built-in KVM Switch",
      "Height Adjustable Stand",
    ]),
    isFeatured: true,
  },
  {
    id: "prod-3",
    title: "Logitech MX Master 3S Mouse",
    description:
      "Premium wireless mouse with quiet clicks, 8K DPI tracking, and MagSpeed electromagnetic scrolling. Works on virtually any surface with USB-C quick charging.",
    shortDesc: "Wireless, 8K DPI, USB-C, Multi-device",
    price: 45000,
    comparePrice: 52000,
    category: "PERIPHERALS",
    images: null,
    stock: 25,
    features: JSON.stringify([
      "8K DPI Track-on-Glass Sensor",
      "MagSpeed Electromagnetic Scrolling",
      "USB-C Quick Charge",
      "3 Device Bluetooth Connections",
      "Quiet Clicks",
      "Ergonomic Design",
      "70 days battery life",
    ]),
    isFeatured: false,
  },
  {
    id: "prod-4",
    title: "Keychron K2 Pro Wireless Keyboard",
    description:
      "Tenkeyless wireless mechanical keyboard with hot-swappable switches, RGB backlighting, and QMK/VIA support. Connects via Bluetooth 5.1 or USB-C.",
    shortDesc: "Mechanical, Hot-swappable, RGB, Bluetooth 5.1",
    price: 38000,
    comparePrice: null,
    category: "PERIPHERALS",
    images: null,
    stock: 15,
    features: JSON.stringify([
      "Hot-swappable Gateron Pro Switches",
      "Bluetooth 5.1 + USB-C Wired",
      "Per-key RGB Backlighting",
      "QMK/VIA Firmware Support",
      "Mac & Windows Compatible",
      "Up to 400 hours battery (LED off)",
    ]),
    isFeatured: false,
  },
  {
    id: "prod-5",
    title: "TP-Link AX5400 WiFi 6 Router",
    description:
      "High-performance WiFi 6 router with up to 5400Mbps speeds, 6 antennas, and support for 160MHz bandwidth. Features 4 Gigabit LAN ports and USB 3.0 for storage sharing.",
    shortDesc: "WiFi 6, 5400Mbps, 6 Antennas, Gigabit",
    price: 75000,
    comparePrice: 89000,
    category: "NETWORKING",
    images: null,
    stock: 10,
    features: JSON.stringify([
      "WiFi 6 (802.11ax)",
      "Up to 5400Mbps Dual-Band",
      "6 High-Gain Antennas",
      "160MHz Channel Support",
      "4× Gigabit LAN Ports",
      "USB 3.0 Port",
      "HomeCare Security",
      "TP-Link HomeShield",
    ]),
    isFeatured: false,
  },
  {
    id: "prod-6",
    title: "Samsung 1TB T7 Portable SSD",
    description:
      "Ultra-fast portable SSD with USB 3.2 Gen 2, read speeds up to 1,050MB/s. Encrypted with AES 256-bit, shock-resistant with rubber casing.",
    shortDesc: "1TB, USB 3.2, 1050MB/s, AES 256-bit",
    price: 52000,
    comparePrice: 58000,
    category: "ACCESSORIES",
    images: null,
    stock: 20,
    features: JSON.stringify([
      "1TB Storage Capacity",
      "USB 3.2 Gen 2 Interface",
      "Up to 1,050 MB/s Read Speed",
      "AES 256-bit Hardware Encryption",
      "Shock Resistant (Drop: 2m)",
      "Compact & Lightweight (58g)",
    ]),
    isFeatured: false,
  },
  {
    id: "prod-7",
    title: "Lenovo ThinkPad X1 Carbon Gen 11",
    description:
      "Ultra-premium business ultrabook with 14-inch 2.8K OLED display, Intel Core i7, 32GB RAM, and 1TB SSD. MIL-STD-810H tested for durability.",
    shortDesc: "14\" 2.8K OLED, i7, 32GB RAM, 1TB SSD",
    price: 520000,
    comparePrice: 580000,
    category: "ELECTRONICS",
    images: null,
    stock: 5,
    features: JSON.stringify([
      "14\" 2.8K OLED Display (90Hz)",
      "Intel Core i7-1365U vPro",
      "32GB LPDDR5 RAM",
      "1TB PCIe Gen 4 SSD",
      "MIL-STD-810H Tested",
      "Fingerprint + IR Camera",
      "2× Thunderbolt 4",
      "Up to 15 hours battery",
    ]),
    isFeatured: true,
  },
  {
    id: "prod-8",
    title: "JBL Tune 770NC Headphones",
    description:
      "Over-ear wireless headphones with adaptive noise cancelling, 40mm drivers, and up to 44 hours of playtime. Multi-point connection for seamless device switching.",
    shortDesc: "ANC, 40mm Drivers, 44h Battery, Bluetooth 5.3",
    price: 35000,
    comparePrice: null,
    category: "ACCESSORIES",
    images: null,
    stock: 30,
    features: JSON.stringify([
      "Adaptive Noise Cancelling",
      "40mm Dynamic Drivers",
      "Up to 44 Hours Battery",
      "Bluetooth 5.3 with LE Audio",
      "Multi-Point Connection",
      "Lightweight & Foldable",
      "Built-in Microphone",
    ]),
    isFeatured: false,
  },
  {
    id: "prod-9",
    title: "Ubiquiti UniFi 6 Lite Access Point",
    description:
      "Compact WiFi 6 access point with dual-band speeds up to 1.5Gbps. Features seamless roaming, VLAN support, and can be managed via the UniFi Network Application.",
    shortDesc: "WiFi 6, 1.5Gbps, Dual-Band, PoE",
    price: 48000,
    comparePrice: 55000,
    category: "NETWORKING",
    images: null,
    stock: 18,
    features: JSON.stringify([
      "WiFi 6 (802.11ax)",
      "Up to 1.5 Gbps Aggregate",
      "Dual-Band (2.4 & 5 GHz)",
      "PoE Powered (802.3af)",
      "Seamless Roaming",
      "VLAN Support",
      "UniFi Network App Managed",
    ]),
    isFeatured: false,
  },
  {
    id: "prod-10",
    title: "Anker 65W USB-C Gan Charger",
    description:
      "Ultra-compact GaN charger with 3 ports (2× USB-C + 1× USB-A). Delivers 65W max for fast laptop charging. ActiveShield 2.0 temperature monitoring.",
    shortDesc: "65W, 3-Port, GaN, ActiveShield 2.0",
    price: 18000,
    comparePrice: 22000,
    category: "ACCESSORIES",
    images: null,
    stock: 50,
    features: JSON.stringify([
      "65W Maximum Output",
      "2× USB-C + 1× USB-A Ports",
      "GaN II Technology",
      "ActiveShield 2.0 Monitoring",
      "Foldable Plug Design",
      "Universal Compatibility",
    ]),
    isFeatured: false,
  },
  {
    id: "prod-11",
    title: "Razer BlackWidow V4 Mechanical Keyboard",
    description:
      "Full-size RGB mechanical gaming keyboard with Razer Green switches, magnetic wrist rest, multi-function digital dial, and dedicated media controls.",
    shortDesc: "Full-size, Razer Green, RGB, Media Dial",
    price: 65000,
    comparePrice: null,
    category: "PERIPHERALS",
    images: null,
    stock: 7,
    features: JSON.stringify([
      "Razer Green Mechanical Switches",
      "Per-key RGB (16.8M colors)",
      "Magnetic Ergonomic Wrist Rest",
      "Multi-function Digital Dial",
      "Dedicated Media Controls",
      "USB-C Detachable Cable",
      "Onboard Storage for Profiles",
    ]),
    isFeatured: false,
  },
  {
    id: "prod-12",
    title: "Cat 6 Ethernet Cable 50m Bundle",
    description:
      "High-quality Cat 6 UTP Ethernet cable bundle (50 meters) with RJ45 connectors. Supports up to 10Gbps speeds at 250MHz bandwidth. Perfect for home and office networking.",
    shortDesc: "Cat 6 UTP, 50m, 10Gbps, RJ45",
    price: 25000,
    comparePrice: 30000,
    category: "NETWORKING",
    images: null,
    stock: 40,
    features: JSON.stringify([
      "Cat 6 UTP Cable",
      "50 Meters Length",
      "Up to 10 Gbps Speed",
      "250 MHz Bandwidth",
      "RJ45 Connectors Included",
      "UV Resistant Jacket",
      "Copper Clad Aluminum",
    ]),
    isFeatured: false,
  },
];

export async function GET() {
  try {
    let products = await db.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    if (products.length === 0) {
      for (const p of seedProducts) {
        await db.product.upsert({ where: { id: p.id }, update: p, create: p });
      }
      products = await db.product.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
      });
    }
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(seedProducts);
  }
}
