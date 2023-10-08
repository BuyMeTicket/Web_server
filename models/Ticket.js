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
    name: String,
    ticketId: String,
    owner: String,
    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity',
    },
    quantity: Number,
});

// import { buf2url } from './query.js'
// TicketSchema.virtual('nftSrc').get(buf2url('nft'))
TicketSchema.virtual('nft').get(async function () {
    const activity = await Activity.findById(this.activity);
    if (activity && activity.tickets){
        const ticket = activity.tickets.find((ticket) => ticket.name === this.name);
        if (ticket.nft.contentType === undefined) return '';
        return `data:${ticket.nft.contentType};base64,${Buffer.from(ticket.nft.data).toString(
            'base64',
        )}`
    }
})
TicketSchema.methods.getPublic = async function () {
    let obj = {...this._doc, _id: this._id.toString()}
    obj['nft'] = await this.nft
    const activity = await Activity.findById(this.activity)
    delete obj['activity']
    obj['activity'] = await activity.getPublic()
    return obj
}

const Ticket = mongoose.model("Ticket", TicketSchema);
export default Ticket;