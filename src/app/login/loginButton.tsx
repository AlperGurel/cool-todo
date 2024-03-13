"use client";

import { useFormState, useFormStatus } from "react-dom";

export default function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-700 p-3 rounded-lg text-white mt-4 w-[100%] disabled:bg-slate-500"
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? "Bekleyin..." : "Giriş Yap"}
    </button>
  );
}
