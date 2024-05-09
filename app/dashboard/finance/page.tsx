"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  category: z.string(),
})

export default function Category() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
    }
  })




  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('data', data)
    try {


      form.reset()
      return
    } catch (error) {
      console.log('error', error)
      return error
    }
  }


  return (
    <main className="flex w-full mt-[1rem] flex-col items-center justify-between ">
      <div className="flex flex-col gap-3 mb-[5rem] w-full px-8">
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
          Random Finance
        </h1>
        <p className="leading-7">
          Get your money up bro
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter random piece of information</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>

      </div>
    </main>
  )
}