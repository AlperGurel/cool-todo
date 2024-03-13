import { getSession, logout, getTodosByUser } from "./lib";
import { addNewTodo, deleteTodo, markTodoComplete } from "./libFirebase";
import { redirect } from "next/navigation";
import AddTodo from "./addTodo";
import TodoCheckbox from "./todoCheckbox";
import Search from "./search";

export interface TodoEntry {
  user: string;
  content: string;
  attachment_type: "file" | "image" | "none";
  attachment_url: string;
  is_completed: boolean;
  id: string;
  tags: string[];
}

import { revalidatePath } from "next/cache";

async function TodoEntry({ entry }: { entry: TodoEntry }) {
  return (
    <div
      className={`${
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
              className="bg-red-500 text-white py-2 px-5 rounded-md text-sm"
            >
              Sil
            </button>
          </form>
        </div>
      </div>
      <div className="mt-4 pt-4  flex justify-between">
        <div className="text-xs text-slate-400">Ek:</div>
        <div className="flex gap-3">
          {entry.tags?.map((el, index) => (
            <div
              className="bg-red-200 text-red-500 text-sm py-2 px-3 rounded-xl"
              key={index}
            >
              {el}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const entries = await getTodosByUser(
    (session as any)?.user?.email,
    searchParams?.arama || ""
  );
  return (
    <>
      <div className="flex justify-between items-center">
        <Search />
        <form
          action={async () => {
            "use server";
            await logout();
          }}
        >
          <button
            type="submit"
            className="bg-red-700 py-2 px-5 rounded-lg text-white"
          >
            Çıkış Yap
          </button>
        </form>
      </div>

      <AddTodo
        addNewTodo={addNewTodo}
        user={(session as any).user?.email}
      />
      {searchParams?.arama && (
        <p className="text-stone-600 text-sm mt-4 pl-2">
          <b>{searchParams?.arama}</b> için bulunan sonuçlar.
        </p>
      )}

      {entries?.map((el: TodoEntry, index: number) => (
        <TodoEntry
          entry={el}
          key={el.id}
        />
      ))}
    </>
  );
}
