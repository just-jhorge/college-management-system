import { prisma } from "@/lib/prisma";
import School from "./School";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  const [school, allProgrammes] = await Promise.all([
    prisma.school.findUnique({
      where: { id },
      include: { programmesOffered: { select: { programmeType: true } } },
    }),
    prisma.programmeType.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!school) {
    return <div>School not found.</div>;
  }

  const assignedIds = new Set(
    school.programmesOffered.map((o) => o.programmeType.id),
  );
  const assigned = school.programmesOffered.map((o) => o.programmeType);
  const available = allProgrammes.filter((p) => !assignedIds.has(p.id));

  return <School id={id} available={available} assigned={assigned} />;
}
