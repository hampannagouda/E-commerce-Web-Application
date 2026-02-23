import React, { useEffect, useState } from "react";
import AddProductForm from "./components/AddProductForm";

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleNewProduct = () => {
    fetchProducts();
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = async (id) => {
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");
    const newPrice = prompt("Enter new price:");
    try {
      await fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, description: newDescription, price: newPrice }),
      });
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700">StartSmart - Product Dashboard</h1>
      <AddProductForm onAdd={handleNewProduct} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-2xl shadow-xl p-4 hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-semibold text-gray-900 truncate">{product.title}</h2>
            <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
            <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => handleUpdate(product._id)} className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md">Update</button>
              <button onClick={() => handleDelete(product._id)} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;