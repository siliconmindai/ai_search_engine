"use client"

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { formSchema } from "@/lib/validation";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


interface InputFormProps {
  onSubmitRequest: (data: { prompt: string }) => void,
  loading: boolean,
}


export default function InputForm(props: InputFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    props.onSubmitRequest(data);
    form.setValue('prompt', '');
  }

  return (
    <div className="container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Input placeholder="Give me the cars sold before 1995" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={props.loading}>
            {props.loading ? "Searching":"Search"}
            </Button>
        </form>
      </Form>
    </div>
  )
}

