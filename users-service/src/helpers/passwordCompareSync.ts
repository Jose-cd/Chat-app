import bcrypt from "bcryptjs";

const passwordCompareSync = (inputPassword: string, passwordHash: string) =>
  bcrypt.compareSync(inputPassword, passwordHash);

export default passwordCompareSync;
