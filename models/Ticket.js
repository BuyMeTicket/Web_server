import mongoose from 'mongoose';
import Activity from './Activity.js';

const Schema = mongoose.Schema;
const TicketSchema = new Schema({
    price: Number,
    status: {
        type: String,
        enum: ['available', 'used', 'others'],
        default: 'available',
    },
    nft:String,
    name: String,
    ticketId: String,
    owner: String,
    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity',
    },
    quantity: Number,
});


TicketSchema.methods.getPublic = async function () {
    let obj = {...this._doc, _id: this._id.toString()}
    const activity = await Activity.findById(this.activity)
    delete obj['activity']
    obj['activity'] = await activity.getPublic()
    return obj
}

const Ticket = mongoose.model("Ticket", TicketSchema);
export default Ticket;