// import { PrismaClient } from './generated/prisma/client.js'
// const prisma = new PrismaClient();
// async function insertUser(name:string,phoneno:string,address:string,label:string) {
//     const res = await prisma.contacts.create({
//         data:{
//             name,
//             phoneno,
//             address,
//             label
//         }
//     })
//     console.log(res);
// }
import { PrismaClient } from './generated/prisma/client.js';
import express from "express";
const prisma = new PrismaClient;
const app = express();
export async function getData() {
    const data = await prisma.contacts.findMany();
    console.log(data);
    return data;
}
app.get('/', async (req, res) => {
    const data = await getData();
    res.json(JSON.stringify(data));
});
app.listen(3000, () => {
    console.log("server is running");
});
//insertUser('rohan','0987654321','ujjain','teacher');
//# sourceMappingURL=index.js.map