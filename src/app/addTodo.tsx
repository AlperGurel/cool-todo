"use client";

import { useRef, useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

type AddState = "none" | "add";

export default function AddTodo({
  addNewTodo,
  user,
}: {
  addNewTodo: any;
  user: string;
}) {
  const [addState, setAddState] = useState<AddState>("none");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [itemContent, setItemContent] = useState("");
  const inputRef = useRef(null);
  const [done, formAction] = useFormState(async () => {
    await addNewTodo(itemContent, tags, user);
    return true;
  }, false);

  useEffect(() => {
    if (addState === "add") {
      (inputRef.current as any)?.focus();
    }
  }, [addState]);

  useEffect(() => {
    if (done) {
      setAddState("none");
    }
  }, [done]);

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
            <form action={formAction}>
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
          <div className="mt-4 pt-4  flex justify-between">
            <div className="text-xs text-slate-400">Ek:</div>
            <div className="flex flex-col items-end">
              <div className="flex mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                  }}
                  placeholder="tag"
                  className="font-normal text-sm px-2 py-2 rounded-lg"
                />
                <button
                  className="ml-3 bg-slate-700 rounded-xl text-white text-sm py-2 px-3"
                  onClick={() => {
                    if (tagInput != "") {
                      setTags([tagInput, ...tags]);
                      setTagInput("");
                    }
                  }}
                >
                  Ekle
                </button>
              </div>
              <div className="flex gap-3 font-normal">
                {tags.map((el, index) => (
                  <div
                    key={index}
                    className="bg-red-200 text-red-500 text-sm py-2 px-3 rounded-xl"
                  >
                    {el}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {addState === "none" && (
        <button
          className="bg-sky-700 py-2 px-5 rounded-lg text-white mt-4"
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
