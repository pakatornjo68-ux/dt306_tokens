import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("12345678", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Admin",
        email: "admin@test.com",
        password,
        role: "ADMIN",
      },
      {
        name: "Staff",
        email: "staff@test.com",
        password,
        role: "STAFF",
      },
      {
        name: "Customer",
        email: "customer@test.com",
        password,
        role: "CUSTOMER",
      },
    ],
  });

  console.log("Test users created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());