"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page({ params: { pid } }) {
  const navigate = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/products/" + pid)
      .then((data) => data.json())
      .then((res) => {
        setName(res.name);
        setCategory(res.category);
        setBrand(res.brand);
        setPrice(res.price);
      });
  }, []);

  async function HandleUpdateProduct() {
    if (!name && !category && !brand && !price) {
      alert("lease fill all fields");
    } else {
      const product = {
        name,
        category,
        brand,
        price,
      };
      const res = await fetch("http://localhost:3000/api/products/" + pid, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data) {
        setName("");
        setCategory("");
        setBrand("");
        setPrice("");
        navigate.push("/AddProduct");
      }
    }
  }

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
          onClick={HandleUpdateProduct}
          className="border p-3 bg-black text-white rounded"
        >
          Update Product
        </button>
      </div>
    </>
  );
}
