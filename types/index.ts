export type UserRole = "client" | "manager";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  role: UserRole;
  address?: string;
  city?: string;
  createdAt: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type ProductAvailability = "in_stock" | "low_stock" | "out_of_stock";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  /** `kg` : prix pour le lot `weightGrams` · `piece` : prix à la pièce (le panier stocke le nb de pièces dans `weightKg`). */
  saleUnit: "kg" | "piece";
  price: number;
  oldPrice: number | null;
  stock: number;
  image: string;
  weightGrams: number;
  origin: string;
  rating: number;
  reviews: Review[];
  featured: boolean;
  promo: boolean;
  bio: boolean;
  availability: ProductAvailability;
};

export type CartLine = {
  productId: string;
  /** Poids commandé (kg), pas à partir de 0,25 kg */
  weightKg: number;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "wave" | "orange_money" | "card" | "cod";

export type DeliveryMethod = "standard" | "express" | "slot";

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  image: string;
};

export type Order = {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  address: string;
  phone: string;
  trackingSteps: TrackingStep[];
  promoCode?: string;
};

export type TrackingStep = {
  id: string;
  label: string;
  description: string;
  done: boolean;
  at?: string;
};

export type Promotion = {
  id: string;
  title: string;
  description: string;
  code: string;
  percentOff: number;
  validUntil: string;
  image: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: "order" | "promo" | "system";
};

export type PaymentRecord = {
  id: string;
  orderId: string;
  method: PaymentMethod;
  amount: number;
  status: "completed" | "pending" | "failed";
  createdAt: string;
};

export type DashboardStats = {
  revenue: number;
  orders: number;
  customers: number;
  products: number;
  revenueChangePct: number;
  ordersChangePct: number;
};

export type TimeSeriesPoint = {
  date: string;
  revenue: number;
  orders: number;
};
