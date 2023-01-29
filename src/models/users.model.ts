import mongoose, { Schema } from "mongoose";


const schema: Schema = new Schema({
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
  }
})


export default mongoose.models.users || mongoose.model('users', schema)