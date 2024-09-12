import React, { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import Scanner from './Scanner';
import Form from './Form';
import axios, { AxiosError } from 'axios';
import { createProduct, getAllProducts } from '@/services/productService';

interface props {
    openModal: boolean,
    onCloseModal: any,
    product?: any
}

function Modal(props: props) {
    const [open, setOpen] = useState(false);
    const [scannedResult, setScannedResult] = useState<any>(null);

    const handleFormSubmit = async (formData: FormData) => { // crear producto
        try {
            await createProduct(formData);
            await getAllProducts();
            setOpen(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
            }
        }
    };

    const handleScanResult = (result: any) => {
        if (result && result.codeResult.code) {
            setScannedResult(result.codeResult.code);
        }

    };

    const handleClose = (data: any) => {
        setOpen(false);
        props.onCloseModal();

    }
    return (
        <Dialog open={props.openModal} onClose={setOpen} className="relative z-10">
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
                                    {!scannedResult && !props.product ? (
                                         <Scanner closeModal={handleClose} onDetected={handleScanResult} stopScanner={open} />
                                      

                                    ) : (
                                        <div className="mt-2">
                                        <Form code={scannedResult} onSubmit={handleFormSubmit} cancelForm={handleClose} product={props.product} />
                                    </div>
                                    )}

                                 

                                </div>
                            </div>
                        </div>

                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default Modal