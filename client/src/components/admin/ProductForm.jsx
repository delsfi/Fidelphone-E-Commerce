import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import UploadWidget from "../../components/admin/UploadWidget";
import { AdminContext } from "../../pages/admin/AdminLayout";

export default function ProductForm({ productById, productId }) {
  const [input, setInput] = useState({
    name: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const stateContext = useContext(AdminContext);

  const changeInput = (e) => {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleImageUpload = (url) => {
    setInput((prev) => ({ ...prev, imageUrl: url }));
    setIsImageUploaded(true);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (productId) {
        await updateDoc(doc(db, "products", productId), input);
      } else {
        await addDoc(collection(db, "products"), input);
      }

      toast.success(
        productId ? "Product edited successfully" : "Product added successfully"
      );
      navigate("/admin");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productById) {
      setInput(productById);
      if (productById.imageUrl) setIsImageUploaded(true);
    } else {
      setInput({
        name: "",
        price: "",
        imageUrl: "",
        description: "",
      });
    }
  }, [productById]);

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-start gap-6 p-3">
      {/* Form */}
      <div
        className={`w-full sm:w-1/2 max-w-md sm:max-w-none transition-all duration-300 ${
          stateContext.theme
            ? "bg-white text-gray-800"
            : "bg-gray-900 text-gray-300"
        }`}
      >
        <form className="space-y-4" onSubmit={handleOnSubmit}>
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <input
              onChange={changeInput}
              value={input.name}
              name="name"
              type="text"
              className={`mt-1 block w-full p-2 border rounded-md transition ${
                stateContext.theme
                  ? "border-gray-300 bg-white text-gray-900"
                  : "border-gray-600 bg-gray-700 text-gray-200"
              }`}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              onChange={changeInput}
              value={input.price}
              name="price"
              type="number"
              className={`mt-1 block w-full p-2 border rounded-md transition ${
                stateContext.theme
                  ? "border-gray-300 bg-white text-gray-900"
                  : "border-gray-600 bg-gray-700 text-gray-200"
              }`}
            />
          </div>

          {/* Image Upload */}
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium">Image</label>
            <div className="flex gap-2">
              <input
                value={input.imageUrl}
                name="imageUrl"
                className={`mt-1 p-2 flex-1 border rounded-md transition ${
                  stateContext.theme
                    ? "border-gray-300 bg-white text-gray-900"
                    : "border-gray-600 bg-gray-700 text-gray-200"
                }`}
                readOnly // Tidak bisa diketik manual, tapi bisa upload lagi
              />
              <UploadWidget onImageUpload={handleImageUpload} />
            </div>
          </div>
          
          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              onChange={changeInput}
              value={input.description}
              name="description"
              rows="4"
              className={`mt-1 block w-full p-2 border rounded-md transition ${
                stateContext.theme
                  ? "border-gray-300 bg-white text-gray-900"
                  : "border-gray-600 bg-gray-700 text-gray-200"
              }`}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end items-center gap-5">
            <div className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white cursor-pointer" onClick={() => navigate("/admin")}>
              Cancel
            </div>
          <button
            type="submit"
            className={`px-4 py-2 rounded-md transition flex items-center justify-center gap-2 shadow-md cursor-pointer ${
              stateContext.theme
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin" size={24} />
            ) : (
              "Submit"
            )}
          </button>
          </div>
        </form>
      </div>

      {/* Image Preview */}
      {input.imageUrl && (
        <div className="w-full sm:w-1/3 flex justify-center sm:block">
          <img
            src={input.imageUrl}
            alt="Uploaded"
            className="w-40 h-40 sm:w-64 sm:h-64 object-cover"
          />
        </div>
      )}
    </div>
  );
}
