import { NextResponse } from "next/server";
import { Connection } from "../../conn";
import { Product } from "../../ProductModel";

export async function GET(request, content) {
  const {
    params: { pid },
  } = content;
  Connection();
  const data = await Product.findById(pid);

  return NextResponse.json(data, { status: 200 });
}

export async function PUT(request, content) {
  const {
    params: { pid },
  } = content;
  Connection();

  const payload = await request.json();
  const products = await Product.updateOne({ _id: pid }, payload);

  return NextResponse.json(products, { status: 200 });
}

export async function DELETE(request, content) {
  const {
    params: { pid },
  } = content;
  Connection();

  const products = await Product.deleteOne({ _id: pid });

  return NextResponse.json(products, { status: 200 });
}
