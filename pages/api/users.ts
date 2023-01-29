import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../src/utils/dbConnect'
import UserModel from "../../src/models/users.model"
import { encrypt } from "../../src/utils/password"

type Data = {
  message?: string
  success?: boolean
}

const users = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  if (req.method === "GET") {
    await dbConnect()
    res.status(200).json({ success: true })
  }
  else if (req.method === "POST") {
    try {
      await dbConnect()
      const {
        name,
        email,
        password
      } = req.body
      const cryptoPassword = await encrypt(password)
      const sameEmailArray = await UserModel.find({ email })
      if (sameEmailArray.length === 0) {
        const user = new UserModel({
          name,
          email,
          password: cryptoPassword
        })
        user.save()
        res.status(201).json({ success: true })
      }
      else {
        res.status(201).json({ success: false, message: "E-mail já cadastrado" })
      }
    }
    catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal server error" })
    }
  }
}

export default users
