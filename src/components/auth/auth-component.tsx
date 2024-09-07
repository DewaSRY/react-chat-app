import { ComponentProps, PropsWithChildren, useState } from "react";

import { Tabs } from "@mantine/core";

import UserLoginComponent from "./user-login-component";
import UserRegisterComponent from "./user-register-component";

interface AuthComponentProps extends ComponentProps<"div">, PropsWithChildren {}

export default function AuthComponent({
  children,
  ...resProps
}: AuthComponentProps) {
  const [isSubmited, setIsSubmited] = useState(false);

  return (
    <div {...resProps} className="w-screen h-screen py-[8vh] ">
      <Tabs defaultValue="login" className="max-w-[800px] mx-auto">
        <Tabs.List>
          <Tabs.Tab value="login">Login</Tabs.Tab>
          <Tabs.Tab value="register">Register</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="login">
          <UserLoginComponent
            submited={isSubmited}
            onStart={setIsSubmited.bind(null, true)}
            onFinishes={setIsSubmited.bind(null, false)}
          />
        </Tabs.Panel>
        <Tabs.Panel value="register">
          <UserRegisterComponent
            submited={isSubmited}
            onStart={setIsSubmited.bind(null, true)}
            onFinishes={setIsSubmited.bind(null, false)}
          />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
