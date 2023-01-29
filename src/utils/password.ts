import bcrypt from "bcrypt"

const encrypt = async (pwd:string) => {
  const salt = await bcrypt.genSalt()
  const password = await bcrypt.hash(pwd, salt)
  return password
}

const decrypt = async(pwd:string) => {

}

export {
  encrypt,
  decrypt,
}