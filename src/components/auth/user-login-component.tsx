import { cn } from "@/lib/utils";
import React, { ComponentProps, PropsWithChildren } from "react";
import { toast } from "react-toastify";
import { userLogin } from "@/firebase/user-utils";
import FormButtonComponent from "./form-button-component";
import { Input } from "@mantine/core";
interface UserLoginComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {
  onStart: () => void;
  onFinishes: () => void;
  submited: boolean;
}

export default function UserLoginComponent({
  children,
  onStart,
  onFinishes,
  submited,
  ...resProps
}: UserLoginComponentProps) {
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onStart();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    console.log("call");
    try {
      await userLogin({
        email: formData.get("email")?.toString() ?? "",
        password: formData.get("password")?.toString() ?? "",
      });
      toast.success("You are login!");
    } catch (e) {
      console.log(e);
      toast.error("failed to login");
    } finally {
      onFinishes();
    }
  }

  return (
    <div className="w-full h-full " {...resProps}>
      <h2 className="text-2xl my-10 text-white">Welcome back,</h2>
      <form
        onSubmit={handleLogin}
        className={cn(
          "flex flex-col gap-2  text-gray-800",
          "[&>input]:p-2 [&>input]:bg-white/80 [&>input]:outline-none [&>input]:border-none"
        )}
      >
        <label htmlFor="email">
          <span className="text-gray-100">Email</span>
          <Input
            required
            type="email"
            placeholder="Email"
            name="email"
            id="email"
          />
        </label>
        <label htmlFor="password">
          <span className="text-gray-100">Password</span>
          <Input
            required
            defaultValue="April10Dua004"
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            minLength={8}
          />
        </label>

        <FormButtonComponent isSubmited={submited}>Login</FormButtonComponent>
      </form>
    </div>
  );
}
