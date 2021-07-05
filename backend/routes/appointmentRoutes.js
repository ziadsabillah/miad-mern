import express from 'express'


const router = express.Router();
import {
    getAppointments,
    getAppointmentById,
    cancelAppointment
} from '../controllers/appointmentController.js'
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getAppointments);

router.route('/:id')
    .get(getAppointmentById)
    .put(cancelAppointment);

export default router
