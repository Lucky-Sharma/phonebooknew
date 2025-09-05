import express from 'express'
import upload from '../middleware/multer.js'
import {paginationMiddleware} from '../middleware/pagination.js'
import {AuthVerifier} from '../middleware/AuthVerifier.js'
import {createContact, getContacts,deleteData,editData ,uploadImageHandler,getsearchdataHandler,changeBookmarkHandler,SigninHandler} from '../controllers/contact.controllers.js'

const router = express.Router();

router.get('/allcontacts',AuthVerifier,paginationMiddleware,getContacts);
router.get('/searchdata',AuthVerifier,paginationMiddleware,getsearchdataHandler)
router.post('/createContact',AuthVerifier,createContact);
router.delete('/deleteData',deleteData)
router.patch('/editData',AuthVerifier,editData)
router.post('/uploadToCloudinary', upload.single('image'),uploadImageHandler);
router.patch('/bookmark',AuthVerifier,changeBookmarkHandler);
router.post('/signin',SigninHandler);
export default router;