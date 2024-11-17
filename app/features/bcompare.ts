import { compareSync } from "bcrypt-ts";

// async function checkPass(password: string, dbpassword: string): Promise<boolean> {
//   const match = await compareSync(password, dbpassword);

function checkPass(password: string, dbpassword: string): boolean {
  const match = compareSync(password, dbpassword);

  // if (match) {
  //   return true;
  // } else {
  //   return false;
  // }
  return match;
}

export default checkPass;
