import bcryptjs from "bcryptjs";

async function getPass(password) {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
}

console.log(await getPass("password"));
