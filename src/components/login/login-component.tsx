import { cn } from "@/lib/utils";
import React, { ComponentProps, PropsWithChildren, useState } from "react";
import { toast } from "react-toastify";
interface LoginComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function LoginComponent({
  children,
  ...resProps
}: LoginComponentProps) {
  const [avatar, setAvatar] = useState({
    file: null as File | null,
    url: "",
  });
  function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const formElement = e.target as HTMLInputElement;
    if (!formElement) return;
    if (!formElement.files) return;
    if (formElement.files[0]) {
      setAvatar({
        file: formElement.files[0],
        url: URL.createObjectURL(formElement.files[0]),
      });
    }
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("hallo");
    toast.warn("hallo");
  }
  return (
    <div className="login">
      <div className="item">
        <h2 className="text-2xl text-white">Welcome back,</h2>
        <form
          onSubmit={handleLogin}
          className={cn(
            "flex flex-col gap-2 ",
            "[&>input]:p-2 [&>input]:bg-white/80 [&>input]:outline-none [&>input]:border-none"
          )}
        >
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button className="bg-green-500">Login</button>
        </form>
      </div>

      <div className="my-4"></div>

      <div className="item">
        <h2 className="text-2xl text-white">Create an Account</h2>
        <form
          className={cn(
            "flex flex-col gap-2 ",
            "[&>input]:p-2 [&>input]:bg-white/80 [&>input]:outline-none [&>input]:border-none"
          )}
        >
          <label htmlFor="file">
            <div className="w-[100px] h-[100px]">
              <img
                className="aspect-square"
                src={avatar.url || "./avatar.png"}
                alt=""
              />
            </div>
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button className="bg-blue-400"> Sing Up</button>
        </form>
      </div>
    </div>
  );
}
