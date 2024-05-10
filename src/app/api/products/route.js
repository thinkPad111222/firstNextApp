import { NextResponse } from "next/server";
import { Connection } from "../conn";
import { Product } from "../ProductModel";

export async function GET(request) {
  Connection();

  const products = await Product.find();

  return NextResponse.json(products, { status: 200 });
}

export async function POST(request) {
  Connection();

  const payload = await request.json();
  const products = new Product(payload);
  const response = await products.save();
  console.log(response);

  return NextResponse.json(products, { status: 200 });
}
