export type TextInputI = {
  name: string;
  label: string;
  type: "text";
  placeholder: string;
};

export type NumberInputI = {
  name: string;
  label: string;
  type: "number";
  placeholder: string;
  min: number;
  max: number;
  step: number;
};
