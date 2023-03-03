import path from "path"
import ProductsModel from "../models/products.model";
//const formidable = require("formidable-serverless")
const formidable = require("formidable")
import dbConnect from "../lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next/types";
import { FormValues } from "../utils/publishpage/formValues";
import mongoose from "mongoose"
import { PassThrough } from "stream";
import * as gcs from "../../src/lib/gcs"
import { Storage } from "@google-cloud/storage"


async function post(req: NextApiRequest, res: NextApiResponse) {
  let filesToSave: any[] = []
  await dbConnect()
  const form = new formidable.IncomingForm({
    multiples: true,
    keepExtensions: true,
    fileWriteStreamHandler: (file: any) => {
      const pass = new PassThrough();

      const timestamp = Date.now()
      const random = Math.floor(Math.random() * 99999999) + 1
      const extension = path.extname(file.originalFilename)

      const fileName = `${timestamp}_${random}${extension}`

      file.newFilename = fileName

      filesToSave.push({
        name: file.newFilename,
        path: file.filepath
      })

      const stream = gcs.createWriteStream(
        file.newFilename,
        file.mimetype ?? undefined
      );
      pass.pipe(stream);

      return pass;
    }
  })

  form.parse(req, async (error: Error, fields: FormValues, files: { files: any[] | {} }) => {
    if (error) {
      res.status(500)
    }

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

  
  const credential = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY as string, "base64").toString().replace(/\n/g,"")
  )
  const storage = new Storage({
    projectId: 'marine-aleph-379322',
    credentials: {
      type: credential.type,
      client_id: credential.client_id,
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
  })
  const bucket = storage.bucket(process.env.GCS_BUCKET as string)

  if (deleted) {
    deleted.files.forEach(async (photo: any) => {
      const file = bucket.file(`uploads/${photo.name}`)
      await file.delete()
    })
    res.status(200).json({ success: true })
  }
  else {
    res.status(500).json({ success: false })
  }

}

async function put(req: NextApiRequest, res: NextApiResponse) {
  let filesToSave: any[] = []
  await dbConnect()
  const form = new formidable.IncomingForm({
    multiples: true,
    keepExtensions: true,
    fileWriteStreamHandler: (file: any) => {
      const pass = new PassThrough();

      const timestamp = Date.now()
      const random = Math.floor(Math.random() * 99999999) + 1
      const extension = path.extname(file.originalFilename)

      const fileName = `${timestamp}_${random}${extension}`

      file.newFilename = fileName

      filesToSave.push({
        name: file.newFilename,
        path: file.filepath
      })

      const stream = gcs.createWriteStream(
        file.newFilename,
        file.mimetype ?? undefined
      );
      pass.pipe(stream);

      return pass;
    }
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

    const filesRemainingArray = JSON.parse(fields.filesremaining)

    const updated = await ProductsModel.findByIdAndUpdate({ _id: _id }, { files: filesRemainingArray })
    !updated && res.status(500)

    const previousStateArray = updated.files

    const result = previousStateArray.filter((file: any) =>
    !filesRemainingArray.some((file2: any) => file.name === file2.name))


    const credential = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_KEY as string, "base64").toString().replace(/\n/g,"")
    )
    const storage = new Storage({
      projectId: 'marine-aleph-379322',
      credentials: {
        type: credential.type,
        client_id: credential.client_id,
        client_email: credential.client_email,
        private_key: credential.private_key,
      },
    })
    const bucket = storage.bucket(process.env.GCS_BUCKET as string)

    result.forEach(async (photo: any) => {
      const file = bucket.file(`uploads/${photo.name}`)
      await file.delete()
    })


    if (filesToSave.length !== 0) {
      const updated = await ProductsModel.findByIdAndUpdate({ _id: _id }, { $addToSet: { files: filesToSave } })
      !updated && res.status(500)
    }

    const allUpdated = await ProductsModel.findByIdAndUpdate({ _id: _id }, productUpdate)
    !allUpdated && res.status(500)

    res.status(200).json({ success: true })

  })
}

export {
  post,
  remove,
  put,
}