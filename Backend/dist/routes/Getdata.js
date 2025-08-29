import express, {} from 'express';
import { PrismaClient } from '../generated/prisma/client.js';
const router = express.Router();
const prisma = new PrismaClient();
router.get('/contacts', async (req, res) => {
    try {
        console.log("i am running");
        const contacts = await prisma.contacts.findMany();
        res.json(contacts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
export default router;
//# sourceMappingURL=Getdata.js.map