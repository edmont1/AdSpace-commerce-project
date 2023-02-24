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

    let flag = false

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

    //if sended a new file with dropzone
    if (Object.keys(files).length !== 0) {
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

      const filesUpdate = {
        files: filesToSave
      }

      const success = await ProductsModel.findByIdAndUpdate({ _id: _id }, { $addToSet: filesUpdate })
      success && (flag = true)
    }
    //if not, just use the object(product.files) sended to edit page to update database when user remove any file
    else{
      const success = await ProductsModel.findByIdAndUpdate({ _id: _id }, {files: JSON.parse(fields.filesremaining)})
      success && (flag = true)
    }
    //in any case, update the product
    const updated = await ProductsModel.findByIdAndUpdate({ _id: _id }, productUpdate)
    if(flag && updated){
      res.status(200).json({success : true})
    }
    else{
      res.status(500).json({success : false})
    }

  })
}

export {
  post,
  remove,
  put,
}