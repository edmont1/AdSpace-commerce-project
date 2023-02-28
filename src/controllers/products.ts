import path from "path"
import fs from "fs"
import ProductsModel from "../models/products.model";
const formidable = require("formidable-serverless")
import dbConnect from "../lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next/types";
import { FormValues } from "../../pages/user/publish/formValues";
import mongoose from "mongoose"


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
          res.status(500).json({ success: false })
        }
      })

    })

    const _id = new mongoose.Types.ObjectId()
    
    const {
      title,
      category,
      description,
      price,
      name,
      email,
      tel,
      id,
      time,
      day,
      cep,
      rua,
      bairro,
      cidade,
      estado,
      image
    } = fields

    const products = new ProductsModel({
      _id,
      title,
      category,
      description,
      price,
      user: {
        id,
        name,
        email,
        tel,
        image,
      },
      date: {
        time,
        day
      },
      localization: {
        cep,
        rua,
        bairro,
        cidade,
        estado
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

async function put(req: NextApiRequest, res: NextApiResponse) {
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

    const {
      _id,
      title,
      category,
      description,
      price,
      name,
      email,
      tel,
      id,
      time,
      day,
      cep,
      rua,
      bairro,
      cidade,
      estado,
      image
    } = fields


    const productUpdate = {
      title,
      category,
      description,
      price,
      user: {
        id,
        name,
        email,
        tel,
        image,
      },
      date: {
        time,
        day
      },
      localization: {
        cep,
        rua,
        bairro,
        cidade,
        estado
      },
    }


    const filesToSave: { name: string, path: string }[] = []

    //if sended a new file with dropzone (object have a key)
    if (Object.keys(files).length !== 0) {

      const { files: images } = files

      //guarantee that the object files be an array if they are not already, to use the foreach
      const filesToRename = images instanceof Array ? images : [images]

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

    }

    const filesToUpdate = {
      files: filesToSave
    }

    //if dont have new files or have deleted files, was used a array of objects filtered from product page edit 
    //sended together with the body of put to update database with de same values that already contains in database
    //or with the not deleted values
    const updated = await ProductsModel.findByIdAndUpdate({ _id: _id }, { files: JSON.parse(fields.filesremaining) })
    !updated && res.status(500)
    //if has new files to add, they will be renamed and this condition will be triggered to add the files to database
    if(filesToUpdate.files.length !== 0){
      const updated = await ProductsModel.findByIdAndUpdate({ _id: _id }, { $addToSet: filesToUpdate })
      !updated && res.status(500)
    }
    
    //update the rest of the form anyway(without files field)
    const allUpdated = await ProductsModel.findByIdAndUpdate({ _id: _id }, productUpdate)
    !allUpdated && res.status(500)

    res.status(200).json({success: true})

  })
}

export {
  post,
  remove,
  put,
}