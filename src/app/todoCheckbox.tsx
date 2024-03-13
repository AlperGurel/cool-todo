"use client";

import { TodoEntry } from "./page";
import { useState, useEffect } from "react";

export default function TodoCheckbox({
  entry,
  markCompleted,
}: {
  entry: TodoEntry;
  markCompleted: any;
}) {
  const [done, setDone] = useState(entry.is_completed);

  useEffect(() => {
    markCompleted(entry.id, done);
  }, [done]);
  return (
    <div
      className={`h-[20px] w-[20px] border-[1px] ${
        done ? "border-slate-400 bg-green-400" : "border-slate-700"
      }  cursor-pointer hover:bg-green-200 rounded-full`}
      onClick={() => {
        setDone(!done);
      }}
    ></div>
  );
}
