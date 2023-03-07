import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../src/lib/dbConnect'
import ProfilesModel from '../../src/models/profiles.model'
import mongoose from "mongoose"

async function post (req: NextApiRequest, res: NextApiResponse) {
  const { id, name, email, image, cep, rua, bairro, cidade, estado } = req.body
  await dbConnect()
  const _id = new mongoose.Types.ObjectId()
  const profile = new ProfilesModel({
    _id,
    user: {
      id,
      name,
      email,
      image,
    },
    localization: {
      cep,
      rua,
      bairro,
      cidade,
      estado
    }
  })

  const isSaved = await profile.save()

  if (isSaved) {
    res.status(201).send({ success: true })
  }
  else {
    res.status(500).send({ success: false })
  }

}

export{
  post
}