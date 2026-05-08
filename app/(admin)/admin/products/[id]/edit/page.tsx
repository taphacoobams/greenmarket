import { notFound } from "next/navigation";
import { MOCK_PRODUCTS } from "@/mock/products";
import { AdminProductEditor } from "@/features/admin/admin-product-editor";

type Props = { params: Promise<{ id: string }> };

export default async function AdminEditProduct({ params }: Props) {
  const { id } = await params;
  const p = MOCK_PRODUCTS.find((x) => x.id === id);
  if (!p) notFound();
  return <AdminProductEditor product={p} />;
}
