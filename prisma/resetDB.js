require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  await prisma.$executeRawUnsafe("DROP Database cc17_todo");
  await prisma.$executeRawUnsafe("CREATE Database cc17_todo");
}
console.log("Reset DB..");
run();
