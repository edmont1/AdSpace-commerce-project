import mongoose from "mongoose";


const schema = new mongoose.Schema({
  _id: String,
  user:{
    id:String,
    name:String,
    email:String,
    tel:String,
    image:String || null
  },
  localization:{
    cep: String,
    rua: String,
    bairro: String,
    cidade: String,
    estado: String
  }
})


export default mongoose.models.profiles || mongoose.model('profiles', schema)