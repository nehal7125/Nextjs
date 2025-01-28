"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
}

const API: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Network issue");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Expected an array but got something else");
        }

        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } min-h-screen p-6`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product List</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {error ? (
        <p className="text-red-500">Error fetching products: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-800"
            >
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-green-600 font-bold">${product.price}</p>
              <p className="text-sm text-gray-500 mt-2 dark:text-gray-300">
                {product.description.substring(0, 50)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default API;
