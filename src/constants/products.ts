import airConditionPhoto from '../assets/airConditionPhoto.png';
import remoteControlPhoto from '../assets/remoteControlPhoto.png';

export interface Accessory {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  rating: number;
  reviewCount: number;
  discount?: string;
  image: string;
  images: string[];
  brand: string;
  description: string;
  specifications: Specification[];
  features: string[];
  accessories: Accessory[];
  thumbnails: string[];
}

export const products: Product[] = [
  {
    id: "1",
    title: "Fresh Air Conditioner Turbo 1.5 HP Cool",
    price: "EGP 22,004",
    priceValue: 22004,
    rating: 5.0,
    reviewCount: 128,
    discount: "10%",
    image: airConditionPhoto,
    images: [airConditionPhoto, remoteControlPhoto],
    brand: "fresh",
    description: "Experience ultimate cooling with the Fresh Turbo Air Conditioner. Designed for efficiency and power, it cools your room in minutes while maintaining low energy consumption.",
    specifications: [
      { label: "Power", value: "1.5 HP" },
      { label: "Type", value: "Split System" },
      { label: "Energy Rating", value: "A++" },
      { label: "Cooling Capacity", value: "12000 BTU" }
    ],
    features: [
      "Turbo Cooling Mode",
      "Anti-Dust Filter",
      "Low Noise Operation",
      "Eco-Friendly Refrigerant"
    ],
    accessories: [
      {
        id: "acc1",
        name: "Remote Control",
        image: remoteControlPhoto,
        description: "Full-featured remote with LCD display and night glow buttons."
      },
      {
        id: "acc2",
        name: "Installation Kit",
        image: "https://picsum.photos/seed/kit/200/200",
        description: "Complete copper piping and mounting brackets for easy setup."
      }
    ],
    thumbnails: [airConditionPhoto, remoteControlPhoto]
  },
  {
    id: "2",
    title: "LG Dual Inverter AC 1.5 HP Cool & Heat",
    price: "EGP 28,500",
    priceValue: 28500,
    rating: 4.8,
    reviewCount: 95,
    image: airConditionPhoto,
    images: [airConditionPhoto, remoteControlPhoto],
    brand: "lg",
    description: "LG Dual Inverter technology ensures faster cooling and heating with significant energy savings. Quiet and durable performance for year-round comfort.",
    specifications: [
      { label: "Power", value: "1.5 HP" },
      { label: "Type", value: "Inverter Split" },
      { label: "Energy Rating", value: "A+++" },
      { label: "Cooling Capacity", value: "12500 BTU" }
    ],
    features: [
      "Dual Inverter Compressor",
      "Smart Diagnosis",
      "Gold Fin™ Condenser",
      "Active Energy Control"
    ],
    accessories: [
      {
        id: "acc3",
        name: "Smart Wi-Fi Dongle",
        image: remoteControlPhoto,
        description: "Control your AC from anywhere using the ThinQ app."
      }
    ],
    thumbnails: [airConditionPhoto, remoteControlPhoto]
  },
  {
    id: "3",
    title: "Carrier Optimax Split AC 2.25 HP",
    price: "EGP 35,200",
    priceValue: 35200,
    rating: 4.9,
    reviewCount: 150,
    discount: "5%",
    image: airConditionPhoto,
    images: [airConditionPhoto, remoteControlPhoto],
    brand: "carrier",
    description: "The Carrier Optimax is built for large spaces, providing powerful airflow and advanced air purification for a healthy home environment.",
    specifications: [
      { label: "Power", value: "2.25 HP" },
      { label: "Type", value: "Split System" },
      { label: "Energy Rating", value: "A+" },
      { label: "Cooling Capacity", value: "18000 BTU" }
    ],
    features: [
      "Follow Me Function",
      "Self-Cleaning Mode",
      "Carbon Air Filter",
      "Heavy Duty Compressor"
    ],
    accessories: [
      {
        id: "acc4",
        name: "Replacement Filters",
        image: remoteControlPhoto,
        description: "High-efficiency HEPA filters for cleaner air."
      }
    ],
    thumbnails: [airConditionPhoto, remoteControlPhoto]
  },
  {
    id: "4",
    title: "Samsung WindFree AC 1.5 HP",
    price: "EGP 31,000",
    priceValue: 31000,
    rating: 4.7,
    reviewCount: 64,
    image: airConditionPhoto,
    images: [airConditionPhoto, remoteControlPhoto],
    brand: "samsung",
    description: "Samsung WindFree technology gently and quietly disperses air through 23,000 micro air holes, so you don't feel a cold draft on your skin.",
    specifications: [
      { label: "Power", value: "1.5 HP" },
      { label: "Type", value: "WindFree Split" },
      { label: "Energy Rating", value: "A++" },
      { label: "Cooling Capacity", value: "12000 BTU" }
    ],
    features: [
      "WindFree™ Cooling",
      "AI Auto Cooling",
      "Tri-Care Filter",
      "Digital Inverter Boost"
    ],
    accessories: [
      {
        id: "acc5",
        name: "Protective Cover",
        image: remoteControlPhoto,
        description: "Outdoor unit cover to protect against dust and rain."
      }
    ],
    thumbnails: [airConditionPhoto, remoteControlPhoto]
  },
  {
    id: "5",
    title: "Sharp Inverter AC 1.5 HP Cool",
    price: "EGP 25,400",
    priceValue: 25400,
    rating: 4.6,
    reviewCount: 82,
    discount: "15%",
    image: airConditionPhoto,
    images: [airConditionPhoto, remoteControlPhoto],
    brand: "sharp",
    description: "Sharp Inverter AC with Plasmacluster technology helps keep the air in your room clean and fresh while saving energy.",
    specifications: [
      { label: "Power", value: "1.5 HP" },
      { label: "Type", value: "Inverter Split" },
      { label: "Energy Rating", value: "A++" },
      { label: "Cooling Capacity", value: "12000 BTU" }
    ],
    features: [
      "Plasmacluster Ion Technology",
      "J-Tech Inverter",
      "Gentle Cool Mode",
      "Self-Cleaning with Ions"
    ],
    accessories: [
      {
        id: "acc6",
        name: "Wall Mount Bracket",
        image: remoteControlPhoto,
        description: "Heavy-duty steel bracket for secure installation."
      }
    ],
    thumbnails: [airConditionPhoto, remoteControlPhoto]
  },
  {
    id: "6",
    title: "Tornado Split AC 1.5 HP Cool",
    price: "EGP 19,800",
    priceValue: 19800,
    rating: 4.5,
    reviewCount: 110,
    image: airConditionPhoto,
    images: [airConditionPhoto, remoteControlPhoto],
    brand: "tornado",
    description: "Tornado AC offers reliable cooling at an affordable price. Simple, durable, and effective for everyday use.",
    specifications: [
      { label: "Power", value: "1.5 HP" },
      { label: "Type", value: "Split System" },
      { label: "Energy Rating", value: "A" },
      { label: "Cooling Capacity", value: "12000 BTU" }
    ],
    features: [
      "Super Jet Function",
      "Auto Restart",
      "Dry Function",
      "Anti-Corrosion Outdoor Unit"
    ],
    accessories: [
      {
        id: "acc7",
        name: "Remote Control",
        image: remoteControlPhoto,
        description: "Wall-mounted holder for your AC remote."
      }
    ],
    thumbnails: [airConditionPhoto, remoteControlPhoto]
  },
  {
    id: "7",
    title: "Unionaire Artify AC 1.5 HP",
    price: "EGP 18,500",
    priceValue: 18500,
    rating: 4.4,
    reviewCount: 45,
    discount: "20%",
    image: airConditionPhoto,
    images: [airConditionPhoto, remoteControlPhoto],
    brand: "unionaire",
    description: "Unionaire Artify combines modern design with powerful cooling performance, making it a stylish addition to any room.",
    specifications: [
      { label: "Power", value: "1.5 HP" },
      { label: "Type", value: "Split System" },
      { label: "Energy Rating", value: "B" },
      { label: "Cooling Capacity", value: "12000 BTU" }
    ],
    features: [
      "Elegant Design",
      "LED Display",
      "Sleep Mode",
      "Fast Cooling"
    ],
    accessories: [
      {
        id: "acc8",
        name: "Remote Control",
        image: remoteControlPhoto,
        description: "Specialized spray for cleaning AC coils and filters."
      }
    ],
    thumbnails: [airConditionPhoto, remoteControlPhoto]
  },
  {
    id: "8",
    title: "Gree Eco AC 1.5 HP Cool",
    price: "EGP 21,200",
    priceValue: 21200,
    rating: 4.7,
    reviewCount: 73,
    image: airConditionPhoto,
    images: [airConditionPhoto, remoteControlPhoto],
    brand: "gree",
    description: "Gree Eco AC is designed for maximum efficiency and durability, featuring advanced compressor technology for extreme climates.",
    specifications: [
      { label: "Power", value: "1.5 HP" },
      { label: "Type", value: "Split System" },
      { label: "Energy Rating", value: "A+" },
      { label: "Cooling Capacity", value: "12000 BTU" }
    ],
    features: [
      "I-Feel Sensor",
      "Turbo Mode",
      "Cold Plasma Filter",
      "Intelligent Defrosting"
    ],
    accessories: [
      {
        id: "acc9",
        name: "Remote Control",
        image: remoteControlPhoto,
        description: "Flexible drain pipe for water condensation."
      }
    ],
    thumbnails: [airConditionPhoto, remoteControlPhoto]
  }
];
