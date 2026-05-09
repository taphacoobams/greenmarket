import Image from "next/image";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/mock/products";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { productImageNeedsUnoptimized } from "@/lib/product-image";
import { oldPricePerKg, unitRetailPrice } from "@/lib/product-pricing";

export default function AdminPromotionsPage() {
  const promos = MOCK_PRODUCTS.filter((p) => p.promo);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Promotions</h1>
        <p className="text-muted-foreground">
          Produits marqués « promo » dans le catalogue ({promos.length} réf.).
        </p>
      </div>
      <div className="overflow-x-auto rounded-[1.75rem] border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[72px]" />
              <TableHead>Produit</TableHead>
              <TableHead>Prix affiché</TableHead>
              <TableHead>Ancien prix (affiché)</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {promos.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="relative size-12 overflow-hidden rounded-xl bg-muted">
                    <Image src={p.image} alt="" fill sizes="48px" className="object-cover" unoptimized={productImageNeedsUnoptimized(p.image)} />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(unitRetailPrice(p))}
                  <span className="text-muted-foreground"> / {p.saleUnit === "piece" ? "pièce" : "kg"}</span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {p.oldPrice != null ? (
                    <>
                      {formatCurrency(oldPricePerKg(p)!)}
                      <span className="text-muted-foreground"> / {p.saleUnit === "piece" ? "pièce" : "kg"}</span>
                    </>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-wrap justify-end gap-1">
                    <Badge className="rounded-full bg-brand-orange">promo</Badge>
                    <Link
                      href={`/shop/${p.slug}`}
                      className="inline-flex h-5 items-center rounded-full border border-border px-2 text-xs font-medium text-foreground hover:bg-muted"
                    >
                      Vitrine
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {promos.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucune promo active dans les données mock.</p>
      ) : null}
    </div>
  );
}
