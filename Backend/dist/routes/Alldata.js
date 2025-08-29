import { PrismaClient } from "@prisma/client/extension";
import express from "express";
const prisma = new PrismaClient;
const app = express();
let res = {};
export async function getData() {
    res = await prisma.contacts.findMany();
    console.log(res);
}
app.get('/', (req, res) => {
    getData();
    res.json(res);
});
app.listen(3000);
//# sourceMappingURL=Alldata.js.map