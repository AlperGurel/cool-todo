import { login, getSession } from "../lib";
import { redirect } from "next/navigation";
import LoginButton from "./loginButton";
import { tryLogin } from "./actions";
import { useFormState } from "react-dom";
import LoginForm from "./loginForm";

export default async function Login() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex flex-col items-center">
      <LoginForm />
    </div>
  );
}
