import express from 'express'
import upload from '../middleware/multer.js'
import {paginationMiddleware} from '../middleware/pagination.js'
import {createContact, getContacts,deleteData,editData ,uploadImageHandler,getsearchdataHandler,changeBookmarkHandler} from '../controllers/contact.controllers.js'

const router = express.Router();

router.get('/allcontacts',paginationMiddleware,getContacts);
router.get('/searchdata',paginationMiddleware,getsearchdataHandler)
router.post('/createContact',createContact);
router.delete('/deleteData',deleteData)
router.patch('/editData',editData)
router.post('/uploadToCloudinary', upload.single('image'),uploadImageHandler);
router.patch('/bookmark',changeBookmarkHandler);
export default router;