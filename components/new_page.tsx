'use client'

import { DataTable } from "@/components/table/data_table";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import Title from "@/components/header";
import InputForm from "@/components/form";


export type PageProps = {
    data: any[],
    columns: ColumnDef<any>[],
}


function IndexPage(props: PageProps) {

    const [result, setResult] = useState(props.data);
    const [columns, setColumns] = useState(props.columns)         
    const [metadata, setMetada] = useState([{}]);         
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState("");
  
  
    useEffect(() => {
        toast({
          title: `${loading ? "Loading...":"Successful ✔"}`,
          description: `Prompt: ${prompt}`,
        })
    }, [loading]);
    
    
    const generateRequest = async (requestData: { prompt: string }) => {
      setLoading(true);
      setPrompt(requestData.prompt);
      const res = await fetch('/api/requests', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const response = await res.json();     
      setResult(response);
      if (res.ok) setLoading(false);
    }
    
  
    return (
      <>
        <Title/>
        <InputForm onSubmitRequest={generateRequest} loading={loading}/>
        <DataTable columns={columns} data={result} loading={loading}/>
      </>
    )
  }

  export default IndexPage