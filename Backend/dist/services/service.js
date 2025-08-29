import prisma from '../config/prisma.js';
export const insertUser = async (name, phoneno, address, label) => {
    return await prisma.contacts.create({
        data: { name, phoneno, address, label },
    });
};
export const getAllContacts = async () => {
    return await prisma.contacts.findMany();
};
//# sourceMappingURL=service.js.map