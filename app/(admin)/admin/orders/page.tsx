import Link from "next/link";
import { MOCK_ORDERS } from "@/mock/orders";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDateTimeFr } from "@/lib/format";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Commandes</h1>
        <p className="text-muted-foreground">{MOCK_ORDERS.length} commandes</p>
      </div>
      <div className="overflow-x-auto rounded-[1.75rem] border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Créée</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_ORDERS.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-mono text-xs">{o.id}</TableCell>
                <TableCell>
                  <Badge variant="outline">{o.status}</Badge>
                </TableCell>
                <TableCell>{formatCurrency(o.total)}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{formatDateTimeFr(o.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <Link className="text-primary underline" href="/admin">
                    Suivi
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
