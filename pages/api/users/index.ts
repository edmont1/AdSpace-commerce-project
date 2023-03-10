import nextConnect from 'next-connect'
import { get, post, put } from '../../../src/controllers/users'

const route = nextConnect()

route.get(get)
route.post(post)
route.put(put)

export default route
