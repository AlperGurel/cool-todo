"use client";

import { useRef, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBAyyy7aFjwkEBdkMDOyWa9L4jwj1Aildw",
//   authDomain: "glov-case-97a55.firebaseapp.com",
//   projectId: "glov-case-97a55",
//   storageBucket: "glov-case-97a55.appspot.com",
//   messagingSenderId: "473371872077",
//   appId: "1:473371872077:web:454d37e6f5669eac904504",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

type AddState = "none" | "add";

// export async function addNewTodo(content: string) {
//   const docRef = await addDoc(collection(db, "playable-factory-entries"), {
//     user: "grl.alper@gmail.com",
//     is_completed: false,
//     content: content,
//     attachment_type: "none",
//     attachment_url: "",
//   });
//   console.log("Document written with ID: ", docRef.id);
// }

export default function AddTodo({ addNewTodo }: { addNewTodo: any }) {
  const [addState, setAddState] = useState<AddState>("none");
  const [itemContent, setItemContent] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (addState === "add") {
      (inputRef.current as any)?.focus();
    }
  }, [addState]);

  return (
    <>
      {addState == "add" && (
        <div
          className={`font-bold text-slate-700 border-[1px] border-stone-300 rounded-md p-3 mt-2 divide-y divide-slate-300 bg-slate-100`}
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center w-full">
              <div className="w-full">
                <input
                  type="text"
                  ref={inputRef}
                  value={itemContent}
                  onChange={(e) => {
                    setItemContent(e.target.value);
                  }}
                  className="bg-slate-100 border-[1px] border-slate-300 rounded-sm p-2 w-full"
                />
              </div>
            </div>
            <form
              action={() => {
                addNewTodo(itemContent);
              }}
            >
              {" "}
              <button
                className="ml-4 px-5 py-2 font-sans flex gap-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700"
                type="submit"
              >
                {" "}
                Ekle
              </button>
            </form>

            <button
              className="ml-4 px-5 py-2 flex gap-2 text-red-500 rounded-md hover:bg-red-100"
              onClick={() => {
                setAddState("none");
              }}
            >
              {" "}
              İptal
            </button>
          </div>
          <div className="mt-4 pt-4 text-xs text-slate-400">Ek:</div>
        </div>
      )}
      {addState === "none" && (
        <button
          className="bg-sky-700 p-3 rounded-lg text-white mt-4"
          onClick={() => {
            setAddState("add");
          }}
        >
          Todo Ekle
        </button>
      )}
    </>
  );
}
