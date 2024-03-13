import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

import { db } from "./firebase";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 hour from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

async function getUserByEmail(email: string) {
  try {
    const q = query(
      collection(db, "playable-factory-users"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return null;
    } else {
      return querySnapshot.docs[0].data();
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
}

export async function getTodosByUser(email: string, keyword: string) {
  try {
    const q = query(
      collection(db, "playable-factory-entries"),
      where("user", "==", email)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return [];
    } else {
      let dataList: any[] = [];
      querySnapshot.forEach((doc) => {
        dataList.push({ ...doc.data(), id: doc.id });
      });
      dataList = dataList.filter((e) =>
        e.content.toLowerCase().includes(keyword?.toLowerCase())
      );
      return dataList;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
}

export async function login(email: string): Promise<Boolean> {
  const loginData = { email: "grl.alper@gmail.com", name: "Alper" };
  const user = await getUserByEmail(email);
  if (!user) {
    return false;
  }
  const expires = new Date(Date.now() + 10 * 1000 * 60 * 10);
  const session = await encrypt({ user, expires });
  cookies().set("session", session, { expires, httpOnly: true });
  return true;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000 * 60 * 10);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}
