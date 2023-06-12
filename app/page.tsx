'use client';

import Link from "next/link";
import Title from "@/components/header";
import InputForm from "@/components/form";
import { DataTable } from "@/components/table/data_table";
import { ColumnDef } from "@tanstack/react-table"
import { useState, useEffect } from "react";

const chargeData = async () => {
  const res = await fetch('/api/db_managment', {
    method: "GET",
  });
  return await res.json(); 
}

export default function IndexPage() {

  const [result, setResult] = useState([{}]);         
  const [metadata, setMetada] = useState([{}]);         
  const [loading, setLoading] = useState(false);  //booleano

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await chargeData();
        setResult(data.rows);
        setMetada(data.fields);

      } catch (error) {
        console.error(error);

      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  
  const generateRequest = async (requestData: { prompt: string }) => {
    setLoading(true);
    console.log(requestData.prompt);
    const res = await fetch('/api/requests', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    const response = await res.json();     
    //setResult('response.text');       //sacar comillas                   
    console.log(response);
    
    if (res.ok) setLoading(false);
  }
  
  //Columns .tsx
  type ColumnsType = typeof result[0];

  const columns: ColumnDef<ColumnsType>[] = Object.keys(result[0]).map((key) => {
    const capitalizedKey = key.replace(/_/g, " ").replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
    return {
      accessorKey: key,
      header: capitalizedKey,
    };
  });

  return (
    <>
      <Title/>
      <InputForm onSubmitRequest={generateRequest}/>
      <DataTable columns={columns} data={result} loading={loading}/>
    </>
  )
}
