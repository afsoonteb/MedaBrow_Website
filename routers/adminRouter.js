const express = require('express');
const { createUser, deleteUser, getAllUsers, getUserByEmail, updateUser } = require('../controllers/adminControllers');
const { verifyToken, verifyAdmin } = require('../middlewares/verifyToken');


const router = express.Router();

router.get('/get-all-users', verifyToken, verifyAdmin, getAllUsers);
router.get('/get-user', verifyToken, verifyAdmin, getUserByEmail);
router.delete('/delete-user', verifyToken, verifyAdmin, deleteUser);
router.put('/update-user', verifyToken, verifyAdmin, updateUser);
router.post('/create-user', verifyToken, verifyAdmin, createUser);

module.exports = router;
