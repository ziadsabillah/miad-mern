import asyncHandler from 'express-async-handler'
import Appointment from '../models/appointmentModel.js'


// @desc Fetch all appointments
// @route GET /api/appointments
// @access Private/Admin
const getAppointments = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const count = await Appointment.countDocuments();
    const appointments = await Appointment.find().limit(pageSize).skip(pageSize * (page - 1))
    console.log(appointments);
    res.json({ appointments, page, pages: Math.ceil(count / pageSize)})
})


// @desc Fetch single appointment
// @route GET /api/appointments/:id
// @access Private

const getAppointmentById = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id)

    if(appointment) {
        res.json(appointment)
    }else {
        throw new Error('Appointment not found')
    }
})

// @desc cancel appointment 
// @route DELETE /api/appointments/:id
// @access PRIVATE who created appointment

const cancelAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id)

    const { canceled } = req.body
    
    if(appointment) {
        appointment.canceled = canceled

        const canceledAppointment = await appointment.save()
        res.json(canceledAppointment)
    }  else {
        res.status(404)
        throw new Error('Appointment not found')
    }
})
export {
    getAppointmentById,
    getAppointments,
    cancelAppointment
}

