"use client"

import { SearchIcon } from 'lucide-react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/_components/ui/form";

import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  search: z
    .string({
      required_error: "Campo obrigatório.",
    })
    .trim()
    .min(1, "Campo obrigatório."),
});

interface SearchProps {
  defaultValues?: z.infer<typeof formSchema>;
}

export default function Search({defaultValues}: SearchProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function handleSubmit(data: z.infer<typeof formSchema>){
    router.push(`/barbershops?search=${data.search}`);
  };

  return (
    <div className="flex items-center gap-2">

      <Form {...form}>
        <form className="flex w-full gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            name="search"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder='Busque por uma barbearia...' {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      
          <Button variant="default">
            <SearchIcon size={20} type="submit"/>
          </Button>
        </form>
      </Form>
    </div>
  );
}
