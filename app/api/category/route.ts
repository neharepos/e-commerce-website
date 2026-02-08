import { NextResponse } from "next/server";
import { getProductsByCategory } from "@/lib/productDB";

export function GET(request){
    try{
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (!category){
        return NextResponse.json(
            { error: "Category is required" },
            { status: 400 }
        );
    }
    const products = getProductsByCategory(category);

    return NextResponse.json(products);
} catch (error){
     return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
}
}