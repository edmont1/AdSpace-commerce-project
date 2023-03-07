import nextConnect from 'next-connect'
import {post, put} from "../../../src/controllers/profiles"


const route = nextConnect()

route.post(post)
route.put(put)

export default route
