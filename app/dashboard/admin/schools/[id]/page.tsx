import { prisma } from "@/lib/prisma";
import School from "./School";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  const [allProgrammes, currentOfferings] = await Promise.all([
    prisma.programmeType.findMany({ orderBy: { name: "asc" } }),
    prisma.programmeOffering.findMany({
      where: { schoolId: id },
      include: { programmeType: true },
    }),
  ]);

  const assignedIds = new Set(currentOfferings.map((o) => o.programmeTypeId));
  const assigned = currentOfferings.map((o) => o.programmeType);
  const available = allProgrammes.filter((p) => !assignedIds.has(p.id));

  return <School available={available} assigned={assigned} />;
}
