import {} from 'express';
import * as contactService from '../services/service.js';
export const createContact = async (req, res) => {
    try {
        const { name, phoneno, address, label } = req.body;
        const newContact = await contactService.insertUser(name, phoneno, address, label);
        res.status(201).json(newContact);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const getContacts = async (req, res) => {
    try {
        const contacts = await contactService.getAllContacts();
        res.json(contacts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
//# sourceMappingURL=contact.controllers.js.map