import { getSession, logout, getTodosByUser } from "./lib";
import { addNewTodo, deleteTodo, markTodoComplete } from "./libFirebase";
import { redirect } from "next/navigation";
import AddTodo from "./addTodo";
import TodoCheckbox from "./todoCheckbox";

export interface TodoEntry {
  user: string;
  content: string;
  attachment_type: "file" | "image" | "none";
  attachment_url: string;
  is_completed: boolean;
  id: string;
}

import { revalidatePath } from "next/cache";

async function TodoEntry({ entry }: { entry: TodoEntry }) {
  return (
    <div
      className={`font-bold ${
        entry.is_completed ? "text-slate-400 bg-green-100" : "text-slate-700"
      } border-[1px] border-stone-300 bg-slate-100 rounded-md p-3 mt-2 divide-y divide-slate-300`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <TodoCheckbox
            entry={entry}
            markCompleted={markTodoComplete}
          />
          <div className={`${entry.is_completed && "line-through"}`}>
            {entry.content}
          </div>
          {/* <div>{entry.id}</div> */}
        </div>
        <div className="flex gap-2">
          <form
            action={async () => {
              "use server";
              deleteTodo(entry.id);
              revalidatePath("/");
            }}
          >
            <button
              type="submit"
              className="bg-red-400 text-white py-3 px-5 font-light text-xs rounded-md"
            >
              Sil
            </button>
          </form>
        </div>
      </div>
      <div className="mt-4 pt-4 text-xs text-slate-400">Ek:</div>
    </div>
  );
}

export default async function Home() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const entries = await getTodosByUser((session as any)?.user?.email);
  return (
    <>
      <AddTodo addNewTodo={addNewTodo} />
      {entries?.map((el: TodoEntry, index: number) => (
        <TodoEntry
          entry={el}
          key={el.id}
        />
      ))}
      <form
        action={async () => {
          "use server";
          await logout();
        }}
      >
        <button
          type="submit"
          className="bg-red-700 p-3 rounded-lg text-white mt-4"
        >
          Çıkış Yap
        </button>
      </form>
    </>
  );
}
