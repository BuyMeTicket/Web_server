import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ActivitySchema = new Schema({
    title: String,
    description: String,
    image: {
      data: Buffer,
      contentType: String,
    },
    date: Date,
    address: String,
    watches: {
      type: Number,
      default: 0,
    },
    tickets: [{
      price: Number,
      nft: {
        data: Buffer,
        contentType: String,
      },
      totalAmount: Number,
      soldAmount: {
        type: Number,
        default: 0,
      },
      name: String,
    }],
    startSellTime: Date,
    endSellTime: Date,
    holder: String,
    eventAddress: String,
    eventId: String,
});
import { buf2url } from './query.js'
ActivitySchema.virtual('imgSrc').get(buf2url())
ActivitySchema.virtual('startSelling').get(function(){
  return this.startSellTime.getTime() < Date.now() && this.endSellTime.getTime() > Date.now()
})
ActivitySchema.virtual('totalTickets').get(function(){
  return this.tickets.reduce((acc,cur)=>acc+cur.totalAmount,0)
})
ActivitySchema.virtual('soldTickets').get(function(){
  return this.tickets.reduce((acc,cur)=>acc+cur.soldAmount,0)
})
ActivitySchema.virtual('leftTickets').get(function(){
  return this.tickets.reduce((acc,cur)=>acc+cur.totalAmount-cur.soldAmount,0)
})
// use virtual fields to get nft src url of every ticket
ActivitySchema.virtual('tickets.nftSrc').get(buf2url('tickets.nft'))

ActivitySchema.methods.getPublic = function () {
  let obj = {...this._doc, _id: this._id.toString()}
  if(obj.tickets[0].nft.contentType){
    const nftSrcs = obj.tickets.map((ticket)=>{
      const key=ticket.nft
      return `data:${key.contentType};base64,${Buffer.from(key.data).toString(
        'base64',
        )}`})
        let tickets = obj.tickets.map((key,i)=>({...key._doc, nft: nftSrcs[i]}))
        delete obj.tickets
        obj['tickets'] = tickets
  }
  delete obj.image
  obj['image'] = this.imgSrc
  obj['startSelling'] = this.startSelling
  obj['totalTickets'] = this.totalTickets
  obj['soldTickets'] = this.soldTickets
  obj['leftTickets'] = this.leftTickets
  return obj
}

const Activity = mongoose.model("Activity", ActivitySchema);
export default Activity;