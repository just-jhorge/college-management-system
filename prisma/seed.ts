import { prisma } from "@/lib/prisma";

const PROGRAMMES = [
  { name: "Registered General Nursing", code: "10050" },
  { name: "Registered Community Nursing", code: "10051" },
  { name: "Registered Midwifery", code: "10052" },
  { name: "Registered Mental Nursing", code: "10053" },
  { name: "Peri-Operative Nursing", code: "10054" },
  { name: "Ophthalmic Nursing", code: "10055" },
  { name: "Critical Care Nursing", code: "10056" },
  { name: "Cardiology Nursing", code: "10057" },
  { name: "Endocrinology Nursing", code: "10058" },
  { name: "Oncology Nursing", code: "10059" },
  { name: "Paediatric Nursing", code: "10060" },
  { name: "Ear, Nose and Throat", code: "10061" },
  { name: "Nurse Assistant (Clinical)", code: "10062" },
  { name: "Nurse Assistant (Preventive)", code: "10063" },
  { name: "Emergency Nursing", code: "10064" },
  { name: "Registered Public Health Nursing", code: "10065" },
  { name: "Registered Community Mental Nursing", code: "10066" },
  { name: "Registered Midwifery (PNNM)", code: "10067" },
  { name: "Registered Paediatric Nursing", code: "10068" },
  { name: "Public Health Nursing", code: "10069" },
  { name: "Nurse Practictioner", code: "10070" },
];

export async function main() {
  console.log("========== seeding database ==========");

  for (const programme of PROGRAMMES) {
    await prisma.programmeType.upsert({
      where: { name: programme.name, code: programme.code },
      update: {},
      create: { name: programme.name, code: programme.code },
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
