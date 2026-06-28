import { prisma } from "@/lib/prisma";
import { ProgrammeQualification } from "@/generated/prisma/enums";

const PROGRAMMES = [
  {
    name: "Registered General Nursing",
    code: "10050",
    qualification: ProgrammeQualification.DIPLOMA,
    duration: 3,
  },
  {
    name: "Registered Midwifery",
    code: "10051",
    qualification: ProgrammeQualification.DIPLOMA,
    duration: 3,
  },
  {
    name: "Critical Care Nursing",
    code: "10052",
    qualification: ProgrammeQualification.DEGREE,
    duration: 2,
  },
  {
    name: "Cardiology Nursing",
    code: "10053",
    qualification: ProgrammeQualification.DEGREE,
    duration: 2,
  },
  {
    name: "Endocrinology Nursing",
    code: "10054",
    qualification: ProgrammeQualification.DEGREE,
    duration: 2,
  },
];

export async function main() {
  console.log("========== seeding database ==========");

  for (const programme of PROGRAMMES) {
    await prisma.programmeType.upsert({
      where: { code: programme.code },
      update: {},
      create: {
        name: programme.name,
        code: programme.code,
        qualification: programme.qualification,
        durationYears: programme.duration,
      },
    });
  }

  console.log("========== seeding database completed ===========");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
