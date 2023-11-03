import Head from "next/head";
import Link from "next/link";

//home page

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home page</title>
      </Head>
      {/* here classname write in a different way, import global style and use file.classanme as classname */}
     
        Hello world!
        <Link href="profile">Profile</Link>
    </div>
  );
}
