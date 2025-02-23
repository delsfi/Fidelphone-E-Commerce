import { useEffect, useRef } from "react";

const UploadWidget = ({ onImageUpload }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dpryu9ui2",
        uploadPreset: "product-image",
      },
      function (error, result) {
        if (result && !error && result.event === "success") {
          onImageUpload(result.info.secure_url);
        }
      }
    );
  }, [onImageUpload]);

  return (
    <button
      onClick={() => widgetRef.current.open()}
      type="button"
      className="bg-blue-500 text-white mt-1 p-2  rounded-md hover:bg-blue-400 shadow-md cursor-pointer"
    >
      Upload Image
    </button>
  );
};

export default UploadWidget;
