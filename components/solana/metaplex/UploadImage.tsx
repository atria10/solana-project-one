"use client";
import { uploadImage } from "./functions";

type Props = {};

const UploadImage = (props: Props) => {
  return (
    <button onClick={() => uploadImage()} className="btn btn-primary">
      Upload Image
    </button>
  );
};

export default UploadImage;
