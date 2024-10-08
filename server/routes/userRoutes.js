const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/submit',userController.createUser);
router.get('/submit',userController.getallUser);
router.get('/user/:id',userController.getsingleUser);
router.put('/user/:id',userController.updateUser);
router.delete('/user/:id',userController.deleteUser);



module.exports = router;