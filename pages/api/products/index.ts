import nextConnect from 'next-connect'
import { post, put } from '../../../src/controllers/products'

const route = nextConnect()

route.post(post)
route.put(put)

export default route

export const config = {
  api:{
    bodyParser: false
  }
}