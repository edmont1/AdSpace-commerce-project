import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../lib/dbConnect";
import { compare, encrypt } from "../utils/password";
import UsersModel from "../models/users.model"
import mongoose from "mongoose";

import ProfilesModel from '../../src/models/profiles.model'


interface Data{
  message?: string
  success?: boolean
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()
  res.status(403).send(null)
}

async function post(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    await dbConnect()
    const {
      name,
      email,
      password,
    } = req.body

    const userId = new mongoose.Types.ObjectId()
    const profileId = new mongoose.Types.ObjectId()

    const cryptoPassword = await encrypt(password)
    const sameEmailArray = await UsersModel.find({ email })
    if (sameEmailArray.length === 0) {
      const user = new UsersModel({
        _id: userId,
        name,
        email,
        password: cryptoPassword,
      })

      const userIsSaved = await user.save()

      const profile = new ProfilesModel({
        _id: profileId,
        user:{
          id: userId,
          name,
          email
        },
        localization:{
          cep: "",
          rua: "",
          bairro: "",
          cidade: "",
          estado: "",
        }
      })

      const profileIsSaved = await profile.save()

      if(userIsSaved && profileIsSaved){
        res.status(201).json({ success: true, message: "Cadastro bem sucedido" })
      }
      else{
        res.status(500).json({success: false, message: "Erro ao cadastrar"})
      }
    }
    else {
      res.status(201).json({ success: false, message: "E-mail já cadastrado." })
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function put(req: NextApiRequest, res: NextApiResponse){
  const { id, name, email, password } = req.body
  await dbConnect()
  try{
    const user = await UsersModel.findOne({_id: id})
    const passIsCorrect = await compare(password, user.password)
    if(passIsCorrect){
      const updated = await user.updateOne({name, email})
      updated && res.status(200).send({success: true})
    }
    else{
      res.status(401).send({success: false})
    }
  }
  catch(error){
    if(error){
      res.status(500).send({success: false})
    }
  }
}

export {
  get,
  post,
  put
}