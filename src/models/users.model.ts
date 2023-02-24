import mongoose from "mongoose";


const schema = new mongoose.Schema({
  _id: String,
  name:{
    type: String,
    required: [true, "O campo 'nome' é obrigatório."],
  },
  email:{
    type: String,
    required: [true, "O campo 'email' é obrigatório."],
    unique: true
  },
  password:{
    type: String,
    required: [true, "O campo 'senha' é obrigatório."]
  },
})


export default mongoose.models.users || mongoose.model('users', schema)