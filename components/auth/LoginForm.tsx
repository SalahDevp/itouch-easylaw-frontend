"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "@services/authentication.service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { loginFormSchema, loginRequest } from "@typings/auth/forms";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GiCancel } from "react-icons/gi";
const formSchema = loginFormSchema;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<loginRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: loginRequest) {
    setIsLoading(true);
    const result = await login(values);
    console.log(result);
    if (result?.status !== "success") {
      toast.error("خطأ في التسجيل", {
        description: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        position: "bottom-left",
        dismissible: true,
        duration: 5000,
        cancelButtonStyle: {
          backgroundColor: "red",
          color: "white",
        },
        cancel: {
          label: "إلغاء",
          onClick: () => {
            toast.dismiss();
          },
        },
        icon: <GiCancel className="text-lg text-red-500" />,
      });
    } else {
      if (result?.message === "user") {
        router.push("/");
      } else if (result?.message === "admin") {
        router.push("/admin/dashboard");
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="grid grid-cols-1 w-full lg:grid-cols-2">
      <div className="bg-red-500"></div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-slate-100 px-8 py-12 rounded-lg shadow-md w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input placeholder="البريد الإلكتروني" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>كلمة السر</FormLabel>
                <FormControl>
                  <Input placeholder="كلمة السر" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex lg:px-2 pt-6 justify-end">
            <Button disabled={isLoading} type="submit">
              {" "}
              {isLoading ? "الرجاء الإنتظار ..." : "تسجيل الدخول"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
