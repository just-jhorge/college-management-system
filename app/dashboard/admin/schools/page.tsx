import { prisma } from "@/lib/prisma";
import { columns, School } from "./Columns";
import { DataTable } from "@/components/tables/DataTable";
import AddSchoolButton from "@/components/buttons/AddSchoolButton";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";

export default async function Page() {
  const rawSchools = await prisma.school.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      status: true,
      createdAt: true,
      _count: { select: { users: true } },
      admin: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const schools: School[] = rawSchools.map((s) => ({
    id: s.id,
    name: s.name,
    status: s.status,
    createdAt: s.createdAt,
    studentCount: s._count.users,
    primaryAdmin: s.admin ?? null,
  }));

  return (
    <div>
      <DataTable
        columns={columns}
        data={schools}
        filterColumn="name"
        filterPlaceholder="Search for a school..."
        toolbar={
          <>
            <Button className="bg-green-700 hover:bg-green-700 text-white">
              <FileSpreadsheet /> Export
            </Button>
            <AddSchoolButton />
          </>
        }
      />
    </div>
  );
}
