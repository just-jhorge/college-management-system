import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/utils/generators";

const schools = [
  "Nursing and Midwifery Training College, Kumasi",
  "Korle-Bu Nursing and Midwifery Training College",
  "Pantang Nursing and Midwifery Training College",
  "Bekwai Nursing and Midwifery Training College",
  "Agogo Nursing and Midwifery Training College",
  "Berekum Nursing and Midwifery Training College",
  "Sunyani Nursing and Midwifery Training College",
  "Tamale Nursing and Midwifery Training College",
  "Bolgatanga Nursing and Midwifery Training College",
  "Wa Nursing and Midwifery Training College",
  "Ho Nursing and Midwifery Training College",
  "Cape Coast Nursing and Midwifery Training College",
  "Winneba Nursing and Midwifery Training College",
  "Nalerigu Nursing and Midwifery Training College",
  "Kintampo Rural Health Training School",
];

export async function main() {
  console.log("========== seeding database ==========");

  for (const name of schools) {
    await prisma.school.upsert({
      where: { name },
      update: {},
      create: { name, slug: generateSlug(name) },
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
