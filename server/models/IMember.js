const mongoose = require('mongoose');

let memberSchema = new mongoose.Schema({
  name : {type : String , required : true},
  gender : {type : String , required : true},
  email : {type : String , required : true , unique : true},
  phone : {type : String , required : true},
  created : {type : Date , default : Date.now()},
});
let Member = mongoose.model('member' , memberSchema);
module.exports = Member;
