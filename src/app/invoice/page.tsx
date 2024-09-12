'use client'
import Footer from '@/components/Footer';
import Table from '@/components/Table';
import axios from 'axios';
import {useEffect, useState} from 'react';
export default function ({params}: any){ 
    console.log(params);
    const [products, setProducts] = useState();
    const [product, setProduct] = useState([])
    const [totalAmount, setAmount] = useState();
    const [open, setOpen] = useState(false);
    const code = params.code
    useEffect(()=>{
        if (code){
            fetchPost();
        }
    }, []);

    const fetchPost = async ()=> {
        try {
            const response = await axios.get(`/api/products/${code}`);
            console.log(response);
            let products = await response;
            setAmount(response.data.product.price)
            setProduct(products.data.product)
        } catch (error) {
         console.log(error);
            
        }
  
    }

    
  const handleBooleanChange = (newValue: any) => {
    setProduct(newValue)
    setOpen(true);
  };

    return (
        <div>
           
                    <div>
                        <Table products={products} onBooleanChange={handleBooleanChange}/>
                        <Footer totalAmount={totalAmount} />
                    </div>
          
        </div>
    );
}