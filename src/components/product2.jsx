import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ item, addToCart }) => {
  return (
    <div className="lg:h-auto lg:w-64 h-80 w-44 rounded-2xl bg-gray-100 shadow-2xl shadow-black flex flex-col items-center justify-between pb-4">
      {item.imageUrl ? (
        <img src={item.imageUrl} alt={item.nama} className="lg:h-36 h-32 mt-4 lg:mt-8 object-cover rounded" />
      ) : (
        <div className="lg:h-36 h-32 mt-4 lg:mt-8 bg-gray-200 flex items-center justify-center w-full">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      <h2 className="font-semibold lg:text-2xl text-lg text-center mt-2">{item.nama}</h2>
      <h2 className="font-light lg:text-lg text-md text-gray-500 mt-2">{item.kategori}</h2>
      <h2 className="font-semibold lg:text-2xl text-xl text-amber-600">
        Rp. {item.harga ? item.harga.toLocaleString("id-ID") : "0"}
      </h2>

      <button
        onClick={() => addToCart(item)}
        className="mt-4 lg:px-12 lg:py-2 px-8 py-1 text-amber-700 border-2 border-amber-700 rounded-full hover:bg-amber-700 hover:text-white transition duration-300"
      >
        Add
      </button>
    </div>
  );
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        updatedCart[existingItemIndex].totalPrice = updatedCart[existingItemIndex].quantity * product.harga;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1, totalPrice: product.harga }];
      }
    });

    toast.success(`${product.nama} (${product.kategori}) ditambahkan ke keranjang!`);
  };

  return (
    <section id="product" className='min-h-screen flex flex-col'>
      <ToastContainer />
      <h1 className='text-center lg:font-bold font-semibold lg:text-5xl text-3xl mb-8 text-white'>Product</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-gray-400 text-lg">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-y-10 gap-y-4 mx-6 md:mx-36 mt-11">
          {products.length > 0 ? (
            products.map((item) => (
              <ProductCard key={item.id} item={item} addToCart={addToCart} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-4">Tidak ada produk yang tersedia</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Product;
