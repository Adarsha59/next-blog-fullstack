"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Home() {
  const { user } = useUser();
  console.log("hami", user);
  const notify = () => toast("Here is your toast.");

  return (
    <>
      <button onClick={notify}>Make me a toast</button>

      <Link href="/code">go there</Link>
    </>
  ); // <BlogHomepage />
}
