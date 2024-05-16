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

export type SelectInputI = {
  name: string;
  label: string;
  type: "select";
  placeholder: string;
  min: number;
  max: number;
  step: number;
};