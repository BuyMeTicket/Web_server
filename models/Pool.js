import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const PoolSchema = new Schema({
    address: String,
    title: String,
    description: String,
    image: String,
    startTime: Date,
    endTime: Date,
    targetPrice: Number,
    currentPrice: {
        type: Number,
        default: 0
    },
    holder: String,
    donators: {
        type: [{
            address: String,
            amount: Number
        }],
        default: []
    },
    watches: {
        type: Number,
        default: 0
    },
});
import { kConverter } from './query.js'
PoolSchema.virtual('startFunding').get(function () {
    return this.startTime.getTime() < Date.now() && this.endTime.getTime() > Date.now()
})
PoolSchema.virtual('endFunding').get(function () {
    return this.endTime.getTime() < Date.now()
})

PoolSchema.statics.smartQuery = function (keywords) {
    if (!keywords) return []
    const reg = new RegExp(keywords.replace(' ', '|'), 'i')
    const query = {
        $or: [
            { title: reg },
            { description: reg },
        ],
    }
    return query
}
PoolSchema.methods.getPublic = function () {
    let obj = { ...this._doc, _id: this._id.toString() }
    obj['startFunding'] = this.startFunding
    obj['endFunding'] = this.endFunding
    obj['currentPrice'] = kConverter(obj['currentPrice'])
    obj['targetPrice'] = kConverter(obj['targetPrice'])
    return obj
}

export default mongoose.model('Pool', PoolSchema)