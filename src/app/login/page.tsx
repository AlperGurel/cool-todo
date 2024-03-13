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
    <div className="flex flex-col divide-y-2 divide-slate-400">
      <div className="self-start font-mono text-slate-800 pb-4">
        <h2 className="font-bold">Proje Linki</h2>
        <p className="mt-2">Merhaba!</p>
        <p className="mt-2">
          {" "}
          <a
            href="https://github.com/AlperGurel/verbose-goggles"
            target="_blank"
            className="text-sky-600 font-bold"
          >
            Bu link
          </a>{" "}
          üzerinden projenin kaynak kodlarına erişebilirsiniz.
        </p>
        <p className="mt-2">
          Kurulum ile alakalı bilgiler <b>readme.md</b> dosyasında yer
          almaktadır.
        </p>
        <p className="mt-2">
          Database çözümü için Firebase kullandım. Bu nedenle ayrı bir database
          ve backend kurulumuna ihtiyaç olmadan projeyi kurabilirsiniz.
        </p>
        <h2 className="font-bold mt-4">Giriş Bilgileri</h2>
        <p className="mt-2">Kullanıcı bilgileri firestore'da saklanıyor.</p>
        <p className="mt-2">
          <a
            href="/"
            target="_blank"
            className="text-sky-600 font-bold"
          >
            /
          </a>{" "}
          adresine giriş yapmadan gitmeye çalışırsanız sistem sizi yeniden bu
          sayfaya yönlendirecek.
        </p>
        <p className="mt-2">
          Aşağıdaki bilgiler ile farklı kullanıcılar olarak giriş yapıp, her
          kullanıcıya ait farklı todo listesi saklandığını görebilirsiniz.
        </p>
        <div className="flex flex-col gap-2 w-[200px]">
          {" "}
          <code className="bg-sky-100 p-2 rounded-lg text-sky-800 mt-3">
            testuser1@gmail.com
          </code>
          <code className="bg-sky-100 p-2 rounded-lg text-sky-800 mt-3">
            testuser2@gmail.com
          </code>
          <code className="bg-sky-100 p-2 rounded-lg text-sky-800 mt-3">
            testuser3@gmail.com
          </code>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
