import { cn } from "@/lib/utils";
import React, { ComponentProps, PropsWithChildren, useState } from "react";
import { toast } from "react-toastify";
import { userLogin, userRegister } from "@/firebase/user-utils";

interface LoginComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function LoginComponent({
  children,
  ...resProps
}: LoginComponentProps) {
  const [isSubmited, setIsSubmited] = useState(false);
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

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmited(true);
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    try {
      await userLogin({
        email: formData.get("email")?.toString() ?? "",
        password: formData.get("password")?.toString() ?? "",
      });
      toast.success("You are login!");
    } catch (e) {
      console.log("error");
    }

    toast.warn("hallo");
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    try {
      await userRegister({
        username: formData.get("username")?.toString() ?? "",
        email: formData.get("email")?.toString() ?? "",
        password: formData.get("password")?.toString() ?? "",
        avatar: avatar.file!,
      });
      toast.success("Account created! You can login now!");
    } catch (error) {
      console.log(error);
    }
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

          <ButtonComponent isSubmited={isSubmited}>Login</ButtonComponent>
        </form>
      </div>

      <div className="my-4"></div>

      <div className="item">
        <h2 className="text-2xl text-white">Create an Account</h2>
        <form
          onSubmit={handleRegister}
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
          <ButtonComponent isSubmited={isSubmited}>Sing Up</ButtonComponent>
        </form>
      </div>
    </div>
  );
}

function ButtonComponent({
  isSubmited,
  children,
}: PropsWithChildren & { isSubmited: boolean }) {
  return (
    <button disabled={isSubmited} className="bg-green-500">
      {isSubmited ? <p>Loading</p> : <> {children}</>}
    </button>
  );
}
