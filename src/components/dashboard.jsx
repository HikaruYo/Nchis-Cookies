import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import logo from "../asset/logo.png";
import shopping from "../asset/shopping.png";
import add from "../asset/add.png";
import AddProduct from "./addProduct.jsx";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.nama || "Nama tidak tersedia",
            image: data.imageUrl || "https://example/img.jpg",
          };
        });
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-orange-100 h-screen flex flex-row">
      {/* Sidebar */}
      <div className="flex bg-amber-700/65 w-1/3 px-52 h-screen justify-center">
        <div className="relative rounded-2xl bg-orange-100 px-44 h-44 flex flex-col items-center justify-center my-10">
          <div className="absolute -left-2">
            <img src={logo} alt="logo" className="h-40 w-40" />
          </div>
          <div className="absolute ml-32">
            <h1 className="font-bold text-3xl">Nchis Cookies</h1>
            <p className="text-xl">Cookies & Cake</p>
          </div>
        </div>

        <div className="absolute my-60 gap-y-2">
          <h1 className="text-white text-2xl font-bold mr-32">Admin Dashboard</h1>
        </div>
        <div className='absolute rounded-2xl bg-orange-100 px-44 h-[410px] flex flex-col items-center justify-center my-72'>
          <button className='grid-col bg-amber-800 text-white absolute w-72 h-20 rounded-xl shadow-md shadow-gray-700 -mt-28'>
            <div className='absolute -left-2 bottom-2'>
              <img src={shopping} alt='shopping' className='h-16 w-16 ml-4'/>
            </div>
            <div className="font-bold text-3xl text-center">
              <h1>Product</h1>
            </div>
          </button>
          <button className='mt-20 grid-col bg-white hover:bg-amber-800 hover:text-white transition duration-300 absolute w-72 h-20 rounded-xl shadow-md shadow-gray-700'>
            <div className='absolute -mt-2'>
              <img src={add} alt='add' className='h-10 w-10 ml-4'/>
            </div>
            <div className="font-bold text-3xl text-center">Add Product</div>
          </button>
          <a href='/home' className='mt-72 grid-col bg-red-700 hover:bg-red-500 transition duration-300 absolute w-40 h-12 rounded-full shadow-md shadow-gray-700'>
            <div className='font-bold text-2xl mt-2 text-center text-white'>
              <h1>Logout</h1>
            </div>
          </a>
        </div>
      </div>

      {/* Product List */}
      <div className="w-2/3 flex flex-col gap-8 overflow-auto py-9 px-20">
        <h1 className="text-3xl font-bold">Product</h1>
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <div key={product.id} className="w-11/12 px-14 py-3 bg-white rounded-xl shadow-md shadow-gray-700 flex gap-10">
              <img src={product.image} alt={product.name} className="justify-start items-start h-32" />
              <h1 className="font-bold text-3xl flex-col self-center text-center">{product.name}</h1>
              <div className="flex items-center justify-end gap-4">
                <button className="bg-sky-400 w-32 h-16 rounded-xl text-white font-semibold text-xl hover:scale-75 transition-transform duration-300">
                  Edit
                </button>
                <button className="bg-red-500 w-32 h-16 rounded-xl text-white font-semibold text-xl hover:scale-75 transition-transform duration-300">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* upload file */}
      </div>

      {/* Modal Add Product */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg w-96 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-red-500"
            >
              &times;
            </button>
            <AddProduct onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
