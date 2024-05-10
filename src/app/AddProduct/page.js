"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);

  async function HandleAddProduct() {
    if (!name && !category && !brand && !price) {
      alert("lease fill all fields");
    } else {
      const product = {
        name,
        category,
        brand,
        price,
      };
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data) {
        setName("");
        setCategory("");
        setBrand("");
        setPrice("");
      }
    }
  }

  async function HandleDelete(pid) {
    const data = await fetch("http://localhost:3000/api/products/" + pid, {
      method: "DELETE",
    });
    const res = await data.json();

    if (res.acknowledged) {
      setPrice("sharoz");
    }
  }

  useEffect(
    () => async () => {
      const data = await fetch("http://localhost:3000/api/products");
      const res = await data.json();
      setProducts(res);
    },
    [price]
  );

  return (
    <>
      <div className="border m-4 p-4 ">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 "
          placeholder="enter Name of Product"
        />
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border p-3 "
          placeholder="enter brand of Product"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 "
          placeholder="enter Category of Product"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-3 "
          placeholder="enter Price of Product"
        />

        <button
          onClick={HandleAddProduct}
          className="border p-3 bg-black text-white rounded"
        >
          Add Product
        </button>
      </div>

      <div className="border m-4 p-4">
        {products
          ?.map((p) => (
            <div key={p._id} className="border m-4 p-2">
              <span className="m-1">{p.name}</span>
              <span className="m-1">{p.brand}</span>
              <span className="m-1">{p.category}</span>
              <span className="m-1">{p.price}</span>
              <Link
                className="bg-green-300 text-white rounded m-3 p-2"
                href={`/AddProduct/${p._id}/update`}
              >
                update
              </Link>
              <button
                className="bg-red-300 text-white rounded m-3 p-2"
                onClick={() => HandleDelete(p._id)}
              >
                delete
              </button>
            </div>
          ))
          .reverse()}
      </div>
    </>
  );
}
