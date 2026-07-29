import bycript, { hash } from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPassword = async(password) =>{
    return await bycript.hash(
        password,
        SALT_ROUNDS
    );
}

export const comparePassword = async(
    password, hash
) => {
    return  await bycript.compare(
        password,
        hash
    );
}