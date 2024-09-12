import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Products from '@/models/product';
import axios, { AxiosError } from "axios";

export async function getAllProducts() {
    try {
      const products = await fetch('/api/products', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await products.json();
   
      
      return data;
      
    } catch (error: any) {
      console.log(error);
      return new NextResponse(error);
    }

  }


  export async function createProduct (formData: FormData)  { // crear productos
    try {
        const res = await axios.post('/api/products', {
            name: formData.get('name'),
            price: formData.get('price'),
            amount: formData.get('amount'),
            code: formData.get('code'),
            description: formData.get('description'),
        });
        return res;
    } catch (error) {
        if (error instanceof AxiosError) {
            return NextResponse.json(error);
        }
    }
};


export async function getProductById(code: string) {
    try {
    } catch (error) {
     console.log(error);
        
    }

}