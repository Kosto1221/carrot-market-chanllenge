import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// async function test() {
//   const user = await db.user.create({
//     data: {
//       username: "qweqweqwe",
//       email: "qwe@zod.com",
//       bio: "M",
//       password: "123123",
//     },
//   });
// }
// test();

export default db;
