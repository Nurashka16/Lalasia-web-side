import React from "react";
import Input, { InputProps } from "./Input";
import ArrowDownIcon from "../icons/ArrowDownIcon";

export default {
  title: "Input",
  component: Input,
  argTypes: {
    className: {
      control: "text",
    },
    value: {
      control: "text",
      mapping: {
        undefined: undefined,
      },
    },
    placeholder: {
      control: "text",
      mapping: {
        undefined: undefined,
      },
    },
    disabled: {
      mapping: {
        true: true,
        false: false,
        undefined: undefined,
      },
      control: "boolean",
    },
  },
};

export const Default = (props: InputProps) => (
  <Input
    {...props}
    onChange={() => {}}
    afterSlot={<ArrowDownIcon color="secondary" />}
  />
);