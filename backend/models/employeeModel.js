import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema(
    {
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        
    },
    {
        timestamps: true
    }
)

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;

