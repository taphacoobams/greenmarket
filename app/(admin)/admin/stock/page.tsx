import Image from "next/image";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/mock/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { productImageNeedsUnoptimized } from "@/lib/product-image";
import { unitRetailPrice } from "@/lib/product-pricing";

const availabilityLabel: Record<string, string> = {
  in_stock: "En stock",
  low_stock: "Stock bas",
  out_of_stock: "Rupture",
};

export default function AdminStockPage() {
  const sorted = [...MOCK_PRODUCTS].sort((a, b) => a.stock - b.stock);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Stocks</h1>
        <p className="text-muted-foreground">Inventaire démo trié par quantité croissante.</p>
      </div>
      <div className="overflow-x-auto rounded-[1.75rem] border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[72px]" />
              <TableHead>Produit</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Disponibilité</TableHead>
              <TableHead>Unité</TableHead>
              <TableHead>Prix affiché</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="relative size-12 overflow-hidden rounded-xl bg-muted">
                    <Image src={p.image} alt="" fill sizes="48px" className="object-cover" unoptimized={productImageNeedsUnoptimized(p.image)} />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="tabular-nums">{p.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      p.availability === "out_of_stock"
                        ? "destructive"
                        : p.availability === "low_stock"
                          ? "secondary"
                          : "outline"
                    }
                    className="rounded-full"
                  >
                    {availabilityLabel[p.availability] ?? p.availability}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{p.saleUnit === "piece" ? "Pièce" : "Kg"}</TableCell>
                <TableCell>
                  {formatCurrency(unitRetailPrice(p))}
                  <span className="text-muted-foreground"> / {p.saleUnit === "piece" ? "pièce" : "kg"}</span>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" size="sm" className="rounded-xl">
                    <Link href={`/admin/products/${p.id}/edit`}>Ajuster</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
