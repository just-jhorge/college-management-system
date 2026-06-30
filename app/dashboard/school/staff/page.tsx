import React from "react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { getUserSchool } from "@/actions/getUserSchool";
import { DataTable } from "@/components/tables/DataTable";
import { FileSpreadsheet, PlusIcon } from "lucide-react";
import { columns, User } from "@/components/tables/columns/school/users";

export default async function Page() {
  const school = await getUserSchool();

  if (!school) return <div>No assigned schools</div>;

  const rawMembers = await prisma.user.findMany({
    where: { schoolId: school.id, role: { notIn: ["STUDENT", "ADMIN"] } },
  });

  const members: User[] = rawMembers.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    image: m.image,
    email: m.email,
    contact: m.contact,
    createdAt: m.createdAt,
  }));

  return (
    <div className="py-4">
      <DataTable
        columns={columns}
        data={members}
        filterColumn="name"
        filterPlaceholder="Search for a user..."
        toolbar={
          <React.Fragment>
            <Button className="bg-green-700 hover:bg-green-700 text-white">
              <FileSpreadsheet /> Export to excel
            </Button>
            <Button>
              <PlusIcon /> Add Staff
            </Button>
          </React.Fragment>
        }
      />
    </div>
  );
}
