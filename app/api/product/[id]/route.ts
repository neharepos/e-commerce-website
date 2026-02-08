import { getProductById } from "@/lib/productDB";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }>}
) {
    
    const {id}  = await context.params;

    const product = getProductById(id);

    if(!product){
        return new Response(
            JSON.stringify({ error: "Product not found"}), 
            { status: 404 }
        );
    }

    return new Response(JSON.stringify(product), { status: 200 });
}
