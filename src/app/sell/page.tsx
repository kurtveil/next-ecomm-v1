'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import Table from '@/components/Table';
import Scanner from '@/components/Scanner';
import axios from 'axios';
import { getProductById } from '@/services/productService';

interface props {
  openModal: boolean,
  onCloseModal: any,
  product?: any
}

function Page(props: props) {
  // const { } = props
  const [products, setProducts] = useState();
  const [code, setCode] = useState();
  const [open, setOpen] = useState(true)
  const router = useRouter();
  // const [scannedResult, setScannedResult] = useState<any>(null);
  const [product, setProduct] = useState();

  const fetchPost = async (code: string)=> {
    try {
      console.log(code);
      await getProductById(code).then((res)=> {
        console.log(res);
        
      });
        // console.log(response);
        // let products = await response;
        // setAmount(response.data.product.price)
        // setProduct(products.data.product);
        // console.log(product);
        
    } catch (error) {
     console.log(error);
        
    }

}
  const handleScanResult = (result: any) => {
    if (result && result.codeResult.code) {
      setCode(result.codeResult.code);
      fetchPost(result.codeResult.code);
      setOpen(false);
      // router.push(`/invoice/${result.codeResult.code}`);
    }

  };





  const handleBooleanChange = (newValue: any) => {
    setProduct(newValue)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className=" sm:items-start">

                  <div className="mt-3 text-center sm:ml-2 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">

                      {props.product ? 'Editar Producto' : 'Registre el producto'}
                    </DialogTitle>
                      <Scanner closeModal={handleClose} onDetected={handleScanResult} stopScanner={open} />





                  </div>
                </div>
              </div>

            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {
        product ? (
          <Table products={products} onBooleanChange={handleBooleanChange}/>

        ) :(
          <div></div>
        )
      }
    </>
  )
}

export default Page
