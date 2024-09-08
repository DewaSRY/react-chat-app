import { Menu, Button } from "@mantine/core";

import React, { ComponentProps, PropsWithChildren } from "react";
import { usetextToSpeach } from "@/provider/text-to-speach-provider";
interface VoiceOptionComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function VoiceOptionComponent({
  children,
  ...restProps
}: VoiceOptionComponentProps) {
  const { selectedRef, voices, setVoices } = usetextToSpeach();

  function handleSelectedOption(e: React.ChangeEvent<HTMLSelectElement>) {
    setVoices(parseInt(e.target.value ?? 0));
  }

  return (
    <div key={voices.length} {...restProps}>
      <Menu shadow="md">
        <Menu.Target>
          <Button>Voice Options</Button>
        </Menu.Target>
        <Menu.Dropdown className="p-2">
          <Menu.Label>Select your Voice</Menu.Label>
          <Menu.Divider />
          <label htmlFor="">
            <select
              onChange={handleSelectedOption}
              ref={selectedRef}
              name=""
              id=""
            >
              {voices.map((v, idx) => (
                <option key={idx} value={idx}>
                  {v.name.split("-")[0]}
                </option>
              ))}
            </select>
          </label>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
