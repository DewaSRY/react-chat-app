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
    try {
      await userLogin({
        email: formData.get("email")?.toString() ?? "",
        password: formData.get("password")?.toString() ?? "",
      });
      toast.success("You are login!");
    } catch (e) {
      toast.error("failed to login, your email or password is incorect");
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
            placeholder="Insert Email"
            name="email"
            id="email"
          />
        </label>
        <label htmlFor="password-login">
          <span className="text-gray-100">Password</span>
          <Input
            required
            type="password"
            placeholder="Password must be 8 character"
            name="password"
            id="password-login"
            minLength={8}
          />
        </label>

        <FormButtonComponent isSubmited={submited}>Login</FormButtonComponent>
      </form>
    </div>
  );
}
