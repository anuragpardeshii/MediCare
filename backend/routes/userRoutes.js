const express = require('express');
const { getUsers, getUser, getDoctors, deleteUser, getPatients } = require('../controllers/userController.js');

const router = express.Router();

router.route('/').get(getUsers);
router.route('/patient').get(getPatients);
router.route('/doctor').get(getDoctors);
router.route('/:id').get(getUser);
router.delete('/:id', deleteUser);

module.exports = router; // ✅ Fix: Use CommonJS export
