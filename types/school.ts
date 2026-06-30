import { Prisma } from "@/generated/prisma/client";

export function getSchoolSelect() {
  return {
    id: true,
    name: true,
    slug: true,
    status: true,
    members: true,
    adminId: true,
    createdAt: true,
    programmesOffered: { select: { programmeType: true } },
  } satisfies Prisma.SchoolSelect;
}

export type SchoolDetailsData = Prisma.SchoolGetPayload<{
  select: ReturnType<typeof getSchoolSelect>;
}>;
