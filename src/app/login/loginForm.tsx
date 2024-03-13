"use client";

import LoginButton from "./loginButton";
import { useFormState } from "react-dom";
import { tryLogin } from "./actions";

export default function LoginForm() {
  const [message, formAction] = useFormState(tryLogin, null);
  return (
    <form
      className="flex flex-col items-center w-[300px]"
      action={formAction}
    >
      <input
        type="email"
        required
        name="email"
        placeholder="doe@email.com"
        className="block p-3 rounded-lg mt-4 w-full"
      />
      <LoginButton />
      {message?.error && (
        <p className="text-red-400 font-bold mt-4">{message?.error}</p>
      )}
    </form>
  );
}
