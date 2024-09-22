import { connectDB } from "@/libs/mongodb";
import  Product  from '@/models/product';
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
export const dynamic = 'force-static'
 
export async function GET(req: NextApiRequest, response: any) {
    await connectDB();
    const productId = response.params.productId;
    const foundProduct = await Product.findById(productId);

    if (!foundProduct) {
      return NextResponse.json("Producto no encontrado")
    }

    return NextResponse.json(foundProduct)
 
}
