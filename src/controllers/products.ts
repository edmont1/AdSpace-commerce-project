import path from "path"
import fs from "fs"
import ProductsModel from "../models/products.model";
//const formidable = require("formidable-serverless")
const formidable = require("formidable")
import dbConnect from "../lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next/types";
import { FormValues } from "../utils/publishpage/formValues";
import mongoose from "mongoose"
import { PassThrough } from "stream";
import * as gcs from "../../src/lib/gcs"


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

  if (deleted) {
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


    const updated = await ProductsModel.findByIdAndUpdate({ _id: _id }, { files: JSON.parse(fields.filesremaining) })
    !updated && res.status(500)

    if (filesToSave.length !== 0) {
      const updated = await ProductsModel.findByIdAndUpdate({ _id: _id }, { $addToSet: {files : filesToSave} })
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