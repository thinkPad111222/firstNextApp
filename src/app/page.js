import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello World</h1>
      <Link href={`/AddProduct`} className="bg-black text-white p-2 rounded">
        Add Product
      </Link>
      <Link href={`/Upload`} className="bg-black text-white p-2 rounded">
        Upload
      </Link>
    </main>
  );
}
