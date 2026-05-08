import { MOCK_USERS } from "@/mock/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateTimeFr } from "@/lib/format";

export default function AdminCustomersPage() {
  const clients = MOCK_USERS.filter((u) => u.role === "client");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Clients</h1>
        <p className="text-muted-foreground">{clients.length} comptes acheteurs (démo)</p>
      </div>
      <div className="overflow-x-auto rounded-[1.75rem] border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Mail</TableHead>
              <TableHead>Créé</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={u.avatarUrl} alt="" />
                    <AvatarFallback>{u.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  {u.name}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{u.role}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                <TableCell className="text-xs">{formatDateTimeFr(u.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
