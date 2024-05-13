import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = {
  title: string;
  classes?: string;
  buttonProps?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
};

const SubmitButton = ({ classes, title, buttonProps }: Props) => {
  return (
    <button
      type="submit"
      className={`btn btn-primary ${classes}`}
      {...buttonProps}
    >
      {title}
    </button>
  );
};

export default SubmitButton;
