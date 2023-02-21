import path from "path"
import fs from "fs"
import ProductsModel from "../models/products.model";
const formidable = require("formidable-serverless")
import dbConnect from "../lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next/types";
import { FormValues } from "../../pages/user/publish/formValues";


async function post(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: "public/uploads",
    keepExtensions: true
  })

  form.parse(req, async (error: Error, fields: FormValues, files: { files: any[] | {} }) => {
    if (error) {
      res.status(500)
    }

    const { files: images } = files

    const filesToRename = images instanceof Array ? images : [images]

    const filesToSave: { name: string, path: string }[] = []

    filesToRename.forEach(file => {
      const timestamp = Date.now()
      const random = Math.floor(Math.random() * 99999999) + 1
      const extension = path.extname(file.name)

      const fileName = `${timestamp}_${random}${extension}`

      const oldPath = file.path
      const newPath = path.join(file.path, "../" + fileName)

      filesToSave.push({
        name: fileName,
        path: newPath
      })

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.log(err)
          res.status(500).json({ ok: false })
        }
      })

    })

    const {
      title,
      category,
      description,
      price,
      name,
      email,
      tel,
      id,
      //image
    } = fields

    const products = new ProductsModel({
      title,
      category,
      description,
      price,
      user: {
        id,
        name,
        email,
        tel,
        //image,
      },
      files: filesToSave
    })

    const isSaved = await products.save()

    if (isSaved) {
      res.status(201).json({ success: true })
    }
    else {
      res.status(500).json({ success: false })
    }
  })

}

async function remove(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query
  await dbConnect()

  const deleted = await ProductsModel.findOneAndDelete({ _id: productId })

  if (deleted) {
    res.status(200).json({ success: true })
  }
  else {
    res.status(500).json({ success: false })
  }

}

export {
  post,
  remove
}