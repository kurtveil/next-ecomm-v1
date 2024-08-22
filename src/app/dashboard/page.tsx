"use client"
import React from 'react';
import { useSession } from 'next-auth/react';
import Table from '@/components/Table';
// interface Props {}

function DashboardPage() {
    // const {data: session, status} = useSession();
    // console.log(session, status);
    
    return (
        <div>
            Dashboard page
            <Table/>
            </div>
    )
}

export default DashboardPage;