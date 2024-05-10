"use client";
import React, { useState } from "react";

export default function page() {
  const [file, setFile] = useState();
  function onSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("file", file);
    fetch("/api/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  return (
    <div>
      <form onSubmit={onSubmit} className="p-4 m-4 border ">
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <button className="p-2 border bg-black text-white rounded ">
          Submit
        </button>
      </form>
    </div>
  );
}
