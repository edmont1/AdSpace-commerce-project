import bcrypt from "bcrypt"

const encrypt = async (pwd:string) => {
  const salt = await bcrypt.genSalt()
  const password = await bcrypt.hash(pwd, salt)
  return password
}


const compare = (pwd: string, hash: string) => {
  const result = bcrypt.compare(pwd, hash)
  return result
}

export {
  encrypt,
  compare,
}