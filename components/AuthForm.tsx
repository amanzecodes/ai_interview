"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const authFormSchema = (type: FormType) => {
    return z.object({
      name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
      email: z.string().email(),
      password: z.string().min(3),
    });
  };

  const formSchema = authFormSchema(type);
  type FormField = z.infer<typeof formSchema>;
  const form = useForm<FormField>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormField) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password
        })

        if(!result?.success) {
          toast.error(result?.message)
        }
        toast.success("Account created successfully. Please Sign-in");
        router.push("/sign-in");
      } else {
        const { email, password } = values
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const idToken = await userCredential.user.getIdToken()
        if(!idToken) {
          toast.error("Sign in failed")
          return;
        }

        await signIn({
          email, idToken
        })
        toast.success("Sign in successful")
        router.push("/")
      }
    } catch (error) {
      console.error(error);
      toast.error(`There was an error: ${error}`);
    }
  }

  const isSign = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">InterView</h2>
        </div>
        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-4 space-y-6"
          >
            {!isSign && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="John Doe"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="john.doe@example.com"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="*******"
              type="password"
            />
            <Button
              className="!w-full !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !min-h-10 !font-bold !px-5 cursor-pointer"
              type="submit"
            >
              {isSign ? "Sign in" : "Create an account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSign ? "No account yet?" : "Have an account already?"}{" "}
          <Link
            href={!isSign ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSign ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
