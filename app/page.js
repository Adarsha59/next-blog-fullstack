"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();
  console.log("hami", user);
  return (
    <>
      <Link href="/code">go there</Link>
    </>
  ); // <BlogHomepage />
}
