import bcrypt from "bcrypt";

const isCorrect = async (passwordHash: string, rawPassword: string) =>
  await bcrypt.compare(rawPassword, passwordHash);
export default isCorrect;
