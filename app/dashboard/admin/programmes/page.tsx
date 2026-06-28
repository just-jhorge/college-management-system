import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, PlusIcon } from "lucide-react";
import { DataTable } from "@/components/tables/DataTable";
import { columns } from "@/components/tables/columns/admin/programmes";

export default async function Page() {
  const rawProgrammes = await prisma.programmeType.findMany();

  return (
    <DataTable
      columns={columns}
      data={rawProgrammes}
      filterColumn="name"
      filterPlaceholder="Search for a programme..."
      toolbar={
        <>
          <Button className="bg-green-700 hover:bg-green-700 text-white">
            <FileSpreadsheet /> Export
          </Button>
          <Button>
            <PlusIcon />
            Add Programme
          </Button>
        </>
      }
    />
  );
}
