import Image from "next/image";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/mock/products";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Produits</h1>
          <p className="text-muted-foreground">{MOCK_PRODUCTS.length} références catalogue</p>
        </div>
        <Button asChild className="rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
          <Link href="/admin/products/new">Nouveau</Link>
        </Button>
      </div>
      <div className="overflow-x-auto rounded-[1.75rem] border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visuel</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Étiquettes</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_PRODUCTS.slice(0, 20).map((p) => (
              <TableRow key={p.id}>
                <TableCell className="w-[72px]">
                  <div className="relative size-12 overflow-hidden rounded-xl bg-muted">
                    <Image src={p.image} alt="" fill sizes="48px" className="object-cover" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>{formatCurrency(p.price)}</TableCell>
                <TableCell>
                  {p.promo && <Badge className="mr-1 rounded-full bg-brand-orange">promo</Badge>}
                  {p.bio && <Badge variant="outline">bio</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" size="sm" className="rounded-xl">
                    <Link href={`/admin/products/${p.id}/edit`}>Éditer</Link>
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
