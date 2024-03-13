"use server";

import { revalidatePath } from "next/cache";

import { db } from "./firebase";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export async function addNewTodo(
  content: string,
  tags: string[],
  user: string
) {
  const docRef = await addDoc(collection(db, "playable-factory-entries"), {
    user: user,
    is_completed: false,
    content: content,
    attachment_type: "none",
    attachment_url: "",
    tags: tags,
  });
  revalidatePath("/");
  console.log("Document written with ID: ", docRef.id);
}

export async function deleteTodo(todoId: string) {
  try {
    await deleteDoc(doc(db, "playable-factory-entries", todoId));
    revalidatePath("/");
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
}

export async function markTodoComplete(todoId: string, completed: boolean) {
  try {
    const docRef = doc(db, "playable-factory-entries", todoId);
    await updateDoc(docRef, {
      is_completed: completed,
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
}
