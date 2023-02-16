import path from "path"
import fs from "fs"
import ProductsModel from "../models/products.model";
const formidable =  require("formidable-serverless")
import dbConnect from "../lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next/types";
import { FormValues } from "../../pages/user/publish/formValues";

async function post(req:NextApiRequest, res:NextApiResponse){
  await dbConnect()
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: "public/uploads",
    keepExtensions: true
  })

  form.parse(req, (error:Error, fields:FormValues, files:{files: any[] | {}}) => {
    if(error){
      res.status(500)
    }

    const {files:images} = files

    const filesToRename = images instanceof Array ? images : [images]

    filesToRename.forEach(file => {
      const timestamp = Date.now()
      const random = Math.floor(Math.random() * 99999999) + 1
      const extension = path.extname(file.name)

      const fileName = `${timestamp}_${random}${extension}`

      const oldPath = file.path
      const newPath = path.join(file.path, "../" + fileName)

      fs.rename(oldPath, newPath, (err) => {
        if(err){
          console.log(err)
          res.status(500).json({ok: false})
        }
      })

    })
    
    res.status(200).json({ok: true})
  })

}

export{
  post
}