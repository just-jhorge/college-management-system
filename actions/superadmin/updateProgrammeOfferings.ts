"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/utils/session";

export async function updateProgrammeOfferings(
  schoolId: string,
  newProgrammeTypeIds: string[],
) {
  const session = await getSession();
  const user = session?.user;

  if (!user || user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  const existing = await prisma.programmeOffering.findMany({
    where: { schoolId },
    select: { id: true, programmeTypeId: true },
  });

  const existingIds = new Set(existing.map((o) => o.programmeTypeId));
  const newIds = new Set(newProgrammeTypeIds);

  const toAdd = newProgrammeTypeIds.filter((id) => !existingIds.has(id));
  const toRemove = existing.filter((o) => !newIds.has(o.programmeTypeId));

  await prisma.$transaction(async (tx) => {
    if (toRemove.length > 0) {
      // GUARD: block removal if students/bills are tied to it
      const offeringIds = toRemove.map((o) => o.id);
      // const inUse = await tx.studentProfile.findFirst({
      //   where: {programmeOfferingId: {in: offeringIds}}
      // })
      // if(inUse) {
      //   return {success: false, message: "Cannot remove a programme with enrolled students"}
      // }

      await tx.programmeOffering.deleteMany({
        where: { id: { in: offeringIds } },
      });
    }

    if (toAdd.length > 0) {
      await tx.programmeOffering.createMany({
        data: toAdd.map((ptId) => ({
          schoolId: schoolId,
          programmeTypeId: ptId,
        })),
      });
    }
  });

  revalidatePath(`/dashboard/admin/schools/${schoolId}`);
}
