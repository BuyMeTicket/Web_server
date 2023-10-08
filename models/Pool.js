import mongoose from 'mongoose';   
const Schema = mongoose.Schema;
const PoolSchema = new Schema({
    address: String,
    title: String,
    description: String,
    image: {
        data: Buffer,
        contentType: String,
    },
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
import { buf2url, kConverter } from './query.js'
PoolSchema.virtual('imgSrc').get(buf2url())

PoolSchema.methods.getPublic = function () {
    let obj = {...this._doc, _id: this._id.toString()}
    delete obj.image
    obj['image'] = this.imgSrc
    obj['currentPrice'] = kConverter(obj['currentPrice'])
    obj['targetPrice'] = kConverter(obj['targetPrice'])
    return obj
}

export default mongoose.model('Pool', PoolSchema)