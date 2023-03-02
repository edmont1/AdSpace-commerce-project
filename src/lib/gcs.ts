import { Storage } from "@google-cloud/storage"
const credential = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY as string, "base64").toString().replace(/\n/g,"")
  )
  

const storage = new Storage({
    credentials: {
        client_email: credential.client_email,
        private_key: credential.private_key,
      },
});

export const bucket = storage.bucket(process.env.GCS_BUCKET as string)

export const createWriteStream = (filename: string, contentType?: string) => {
    const ref = bucket.file(`uploads/${filename}`)

    const stream = ref.createWriteStream({
        gzip: true,
        contentType: contentType,
    });

    return stream
};