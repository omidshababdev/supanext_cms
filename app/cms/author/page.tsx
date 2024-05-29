"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAuthor } from "@/utils/actions/author/create-author";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string(),
  instagram: z.string(),
  twitter: z.string()
})

export default function Author() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      instagram: "",
      twitter: ""
    }
  })

  const [imageUploadUrl, setImageUploadUrl] = useState<string>("");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('data', data)
    try {
      const response = await createAuthor(data?.name, data?.instagram, data?.twitter, imageUploadUrl!)
      if (response?.error) {
        toast("Author creation failed")
        return
      }
      toast("Author has been created")
      form.reset()
      return response
    } catch (error) {
      console.log('error', error)
      return error
    }
  }

  return (
    <main className="flex w-full flex-col p-4 items-center justify-between ">
      <div className="flex flex-col mb-[5rem] w-full">
        <h1 className=" text-3xl font-semibold tracking-tight">
          Create an Author
        </h1>
        <p className="leading-7 text-sm dark:text-gray-400">
          Create an author to add to your articles
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[600px] mt-[0.5rem] space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your name</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your instagram username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="heytorontofoodie" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your twitter username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="heytorontofoodie" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  {!imageUploadUrl ? <Button type="button" size="sm" >
                    Upload Cover
                  </Button> : <Button type="button" size="sm">
                    Image Uploaded
                  </Button>}
                </DialogTrigger>
                <DialogContent>
                  <UploadDropzone
                    className="p-8"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImageUploadUrl(res?.[0]?.url);
                      toast(`Image uploaded`);
                    }}
                    onUploadError={(error: Error) => {
                      toast(`ERROR! ${error.message}`);
                    }}
                  />
                  <DialogClose asChild>
                    <div className="flex justify-end">
                      <Button type="button" variant="outline">Close</Button>
                    </div>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
            <Button type="submit" size="sm" variant="outline">Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  )
}