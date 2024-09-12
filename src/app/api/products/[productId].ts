import { connectDB } from "@/libs/mongodb";
import  Product  from '@/models/product';
import { NextApiRequest, NextApiResponse } from "next";
export const dynamic = 'force-static'
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
    const { productId } = req.query;
    console.log(productId);
    
    const foundProduct = await Product.findById(productId);

    if (!foundProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    return res.status(200).json({ product: foundProduct });
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}

// export async function DELETE({params}: any)  {
  
//   try {
//     await connectDB(); 
//     console.log(params);
    
//     const foundProduct = await Product.findOneAndDelete({ params }).exec();
//     if (!foundProduct) {
//       return NextResponse.json({
//         error: `Error al eliminar producto ${params}`,
//       });
//     }
//     return NextResponse.json({
//       product: foundProduct,
//   })
//   } catch (error) {
//     console.error('Error delete product:', error);
//     return null;
//   }
// }

