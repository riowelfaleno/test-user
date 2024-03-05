import * as bcrypt from "bcrypt";

export namespace PasswordHelper {
  export async function hashPassword(password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  }
}
