'use client'
import React, { useEffect, useState } from 'react'
import Table from '@/components/Table';
import LoadingSpinner from '@/components/LoadingSpinner'
import Alert from '@/components/Alert';
import Modal from '@/components/Modal';
import { createProduct, getAllProducts, updateProduct } from '@/services/productService';
import { AxiosError } from 'axios';
export default function Page() {

  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  async function fetchProducts() {
    try {
       await getAllProducts().then((data)=> {
         data.map((product: any)=> {
          if (product.price) {
            const formatter = new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP', // Código ISO de la moneda (peso colombiano)
            });
            product.price =  formatter.format(Number(product.price)) 
          }
        })
        setProducts(data)
      });
      setIsLoading(false)
    } catch (error: any) {
      console.log(error);
      setError(error)
    }

  }
  useEffect(() => {
   
    fetchProducts();
  }, []);

  const handleEventEmit = (product: any, event: string) => {
    console.log(event);
    
    console.log(product);
    const obj = {
      product , event
    }
    setProduct(obj)
    setOpen(true);
  };


  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenModal = () => {
    setOpen(true);
    setProduct({});
  };

  const handleSubmitEvent = async (data: any) => {
    if (product) { // editar producto
      try {
          await updateProduct(data.form, data.id);
          await fetchProducts();
          handleCloseModal();
      } catch (error) {
          if (error instanceof AxiosError) {
              console.log(error);
          }
      }
  } else { // crear producto
      try {
          await createProduct(data.form);
          await fetchProducts();
          handleCloseModal();
      } catch (error) {
          if (error instanceof AxiosError) {
              console.log(error);
          }
      }
  }
  }

  return (
    <>
      <div className='m-3 p-3'>

        {
          isLoading ?
            (
              <LoadingSpinner />
            ) :
            (
              <div>
                <button type="button" className="m-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  onClick={handleOpenModal}>Agregar</button>
                <Table products={products} emitProduct={handleEventEmit}/>
              </div>
            )
        }

        {
          error ?
            (
              <Alert error={error} />
            ) :
            (
              <div></div>
            )
        }
      </div>

      <Modal openModal={open} onCloseModal={handleCloseModal} product={product} form={handleSubmitEvent}/>
    
    </>
  )
}