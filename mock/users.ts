import type { User } from "@/types";
import { DEMO_AVATAR_URL } from "@/lib/branding";

export const MOCK_USERS: User[] = [
  {
    id: "u-client-1",
    name: "Ndoffe Samb",
    email: "ndoffe.samb@demo.com",
    phone: "+221 77 000 01 02",
    avatarUrl: DEMO_AVATAR_URL,
    role: "client",
    address: "Almadies, Villa 12",
    city: "Dakar",
    createdAt: "2025-11-02T09:00:00.000Z",
  },
  {
    id: "u-manager",
    name: "Mamadou Seck",
    email: "manager@greenmarket.sn",
    phone: "+221 78 444 55 66",
    avatarUrl: DEMO_AVATAR_URL,
    role: "manager",
    createdAt: "2024-08-12T08:00:00.000Z",
  },
];
