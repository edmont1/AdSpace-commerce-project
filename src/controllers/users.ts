import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../utils/dbConnect";
import { encrypt } from "../utils/password";
import UsersModel from "../models/users.model"

type Data = {
  message?: string
  success?: boolean
}

async function get(req: NextApiRequest, res: NextApiResponse<Data>) {
  await dbConnect()
  res.status(200).json({ success: true })
}

async function post(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    await dbConnect()
    const {
      name,
      email,
      password
    } = req.body
    const cryptoPassword = await encrypt(password)
    const sameEmailArray = await UsersModel.find({ email })
    if (sameEmailArray.length === 0) {
      const user = new UsersModel({
        name,
        email,
        password: cryptoPassword
      })
      user.save()
      res.status(201).json({ success: true, message: "Cadastro bem sucedido." })
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

export {
  get,
  post
}