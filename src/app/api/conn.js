import mongoose from "mongoose";

export async function Connection() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecom");
    console.log("Mongodb connected with server");
  } catch (err) {
    console.log("*****error*****", err);
  }
}
