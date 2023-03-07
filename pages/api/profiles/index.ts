import nextConnect from 'next-connect'
import {post} from "../../../src/controllers/profiles"


const route = nextConnect()

//route.get(get)
route.post(post)

export default route
