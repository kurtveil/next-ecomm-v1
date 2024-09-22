import { connectDB } from "@/libs/mongodb";
import Product from '@/models/product';
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
export const dynamic = 'force-static'

export async function POST(req: Request) {
    
    const { name, price, amount, code, description } = await req.json();
    try {
        await connectDB();
        // Crea un nuevo producto
        if (name != '' && code != '' && amount != '' && price != '' && description !== ''){
            const newProduct = new Product({ name, price, code, amount, description});
            const savedProduct = await newProduct.save();
            return NextResponse.json({
                code: savedProduct.code,
                name: savedProduct.name,
                price: savedProduct.price
            })
        } else {
            return NextResponse.json({
                message: 'Datos incompletos!'
            }, {
                status: 404
            });
        }

    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 400
            });
        }
    }
}

export async function GET() {
    
    try { // get all products
        await connectDB();
        const response = await Product.find({});
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener los productos' , status: 500})
    }
}

export async function PUT(req: Request) {
    
    try { // update product
        await connectDB();
        const { name, price, amount, productId, description } = await req.json();
        
        console.log( name, price, amount, productId, description );
        
        
        const response = await Product.updateOne(
            { _id: productId },
            { name, price, amount, description }
        );
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ message: 'Error al actualizar el producto' , status: 500})
    }
}

export async function DELETE({params}: any)  {
  
  try {
    await connectDB();  
    
    const foundProduct = await Product.findOneAndDelete({ params }).exec();
    if (!foundProduct) {
      return NextResponse.json({
        error: `Error al buscar el producto ${params}`,
      });
    }
    return NextResponse.json({
      product: foundProduct,
  })
  } catch (error) {
    console.error('Error delete product:', error);
    return null;
  }
}
