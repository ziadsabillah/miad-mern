import M from 'minimatch';
import mongoose from 'mongoose';


const appointmentSchema = mongoose.Schema(
    {
        startTime: {type: Date, required: true},
        endTime: { type: Date, required: true },
        priceFull: { type: Number, required: true},
        canceled: { type: Boolean, required: false, default: false},
        cancellationReason: { type: String, required: false},
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Employee'
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Clinet'
        }

    },

    {
        timestamps: true
    }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;