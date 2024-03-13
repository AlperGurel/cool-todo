"use server";

import { login } from "../lib";

export async function tryLogin(prevState: any, queryData: FormData) {
  const email = queryData.get("email")?.toString() || "";
  const res = await login(email);
  if (!res) {
    return { error: "Bu maile sahip bir kullanıcı yok!" };
  }
  console.log("answer : " + res);
}
