import { prisma } from "@/lib/prisma";
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/tables/DataTable";
import AddSchoolButton from "@/components/buttons/AddSchoolButton";
import { columns, School } from "@/components/tables/columns/admin/schools";

export default async function Page() {
  const rawSchools = await prisma.school.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      status: true,
      createdAt: true,
      _count: { select: { members: { where: { role: "STUDENT" } } } },
      admin: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const schools: School[] = rawSchools.map((s) => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    status: s.status,
    createdAt: s.createdAt,
    studentCount: s._count.members,
    primaryAdmin: s.admin ?? null,
  }));

  return (
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
  );
}
