import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import AddUserButton from "@/components/buttons/AddUserButton";
import { columns, User } from "@/components/tables/columns/admin/users";

export default async function Page() {
  const rawUsers = await prisma.user.findMany({
    where: { role: { not: "SUPER_ADMIN" } },
    include: { school: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  const users: User[] = rawUsers.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    contact: u.contact,
    role: u.role,
    createdAt: u.createdAt,
    institution: u.school?.name ?? null,
  }));

  return (
    <DataTable
      columns={columns}
      data={users}
      filterColumn="name"
      filterPlaceholder="Search for a user..."
      toolbar={
        <>
          <Button className="bg-green-700 hover:bg-green-700 text-white">
            <FileSpreadsheet /> Export
          </Button>
          <AddUserButton />
        </>
      }
    />
  );
}
