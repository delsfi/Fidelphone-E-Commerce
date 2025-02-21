import ProductForm from "../../components/admin/ProductForm";

export default function AddProduct() {
    return (
        <>
        <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <ProductForm />
        </div>
        </>
    )
}