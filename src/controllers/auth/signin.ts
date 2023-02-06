import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import { compare } from "../../utils/password";
import UsersModel from "../../models/users.model"


async function post(req : NextApiRequest, res : NextApiResponse){
  const {
    email,
    password
  } = req.body

  try{
    await dbConnect()
    const user = await UsersModel.findOne({email})
    if(!user){
      return res.status(401).json({success: false, message: "invalid"})
    }

    const passIsCorrect = await compare(password, user.password)

    if(passIsCorrect){
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      })
    }
    return res.status(401).json({success: false, message: "invalid"})
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export{
  post
}