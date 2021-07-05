import M from 'minimatch';
import mongoose from 'mongoose';


const serviceSchema = mongoose.Schema(
    {
        serviceName: {type: String, required: true},
        duration: {type: Number, required: true, default: 60},
        price: {type: Number, required: true}
    },
    {
        timestamps: true
    }
)

const Service = mongoose.model('Service', serviceSchema);

export default Service;