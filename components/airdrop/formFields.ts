import { NumberInputI } from "@/types/FormFields";

export const formFields: NumberInputI[] = [
  {
    type: "number",
    name: "amount",
    label: "Amount",
    min: 0.01,
    max: 3,
    step: 0.01,
    placeholder: "1",
  },
];
