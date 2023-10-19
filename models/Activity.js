import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ActivitySchema = new Schema({
    title: String,
    description: String,
    image: String,
    date: Date,
    address: String,
    watches: {
      type: Number,
      default: 0,
    },
    tickets: [{
      price: Number,
      nft: String,
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
ActivitySchema.virtual('startSelling').get(function(){
  return this.startSellTime.getTime() < Date.now() && this.endSellTime.getTime() > Date.now()
})
ActivitySchema.virtual('endSelling').get(function(){
  return this.endSellTime.getTime() < Date.now()
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

ActivitySchema.statics.smartQuery = function (keywords) {
  if (!keywords) return []
  const reg = new RegExp(keywords.replace(' ', '|'), 'i')
  //   console.log(reg)
  const query = {
    $or: [
      { title: reg },
      { description: reg },
      { 'tickets.name': reg },
    ],
  }
  return query
}

ActivitySchema.methods.getPublic = function () {
  let obj = {...this._doc, _id: this._id.toString()}
  obj['startSelling'] = this.startSelling
  obj['endSelling'] = this.endSelling
  obj['totalTickets'] = this.totalTickets
  obj['soldTickets'] = this.soldTickets
  obj['leftTickets'] = this.leftTickets

  return obj
}


const Activity = mongoose.model("Activity", ActivitySchema);
export default Activity;