import { connectDB } from "@/libs/mongodb";
import Products from '@/models/product';
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
export const dynamic = 'force-static'

export async function POST(req: Request) {
    console.log(req);
    
    const { name, price, amount, code } = await req.json();
    try {
        await connectDB();
        // Crea un nuevo producto
        if (name != '' && code != '' && amount != '' && price != ''){
            const newProduct = new Products({ name, price, code, amount, });
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

export async function GET( res: NextApiResponse) {
    
    try { // Listar todos los productos
        await connectDB();
        const response = await Products.find({});
        return NextResponse.json(response);
        
    } catch (error) {
        console.log(error);
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
}

