import express from 'express';
import { createContact, getContacts } from '../controllers/contact.controllers.js';
const router = express.Router();
router.get('/allcontacts', getContacts);
router.post('/createContact', createContact);
export default router;
//# sourceMappingURL=contact.routes.js.map