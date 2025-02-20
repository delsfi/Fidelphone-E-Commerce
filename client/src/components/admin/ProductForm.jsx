import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

export default function ProductForm({productById,productId}) {
  const [input, setInput] = useState({
    name: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const changeInput = (e) => {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let docRef;
      if (productId) {
        docRef = await updateDoc(doc(db, "products", productId), input)
      }else{
        docRef = await addDoc(collection(db, "products"), input);
      }
      
      toast.success(productId ? "Product edited successfully" : "Product added successfully");
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
    <div>
      <form className="space-y-4" onSubmit={handleOnSubmit}>
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            onChange={changeInput}
            value={input.name}
            name="name"
            id="id"
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            onChange={changeInput}
            value={input.price}
            name="price"
            id="price"
            type="number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            onChange={changeInput}
            value={input.imageUrl}
            name="imageUrl"
            id="imageUrl"
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            onChange={changeInput}
            value={input.description}
            name="description"
            id="description"
            rows="4"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {!isLoading && "Submit"}
          {isLoading && <LoaderCircle className="animate-spin" size={24} />}
        </button>
      </form>
    </div>
  );
}
