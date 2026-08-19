import prisma from "../src/config/prisma.js";

async function main() {
  const campus = await prisma.campus.upsert({
  where: {
    slug: "unc-pembroke",
  },
  update: {},
  create: {
    name: "University of North Carolina at Pembroke",
    slug: "unc-pembroke",
    description: "UNC Pembroke campus",
    emailDomain: "uncp.edu",
    websiteUrl: "https://www.uncp.edu",
  },
});
const existingBuilding = await prisma.building.findFirst({
  where: {
    campusId: campus.id,
    name: "Test Building",
  },
});

if (!existingBuilding) {
  await prisma.building.create({
    data: {
      campusId: campus.id,
      name: "Test Building",
      category: "Academic",
      description: "Development building used to verify campus relationships.",
      latitude: 34.0,
      longitude: -79.0,
    },
  });
}
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });