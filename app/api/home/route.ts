import { getAllProducts } from "@/lib/productDB";
import { NextResponse } from "next/server";


export async function GET(){
    const products = getAllProducts();

    const featuredProducts = products.slice(0,6)

    return NextResponse.json(featuredProducts)
}