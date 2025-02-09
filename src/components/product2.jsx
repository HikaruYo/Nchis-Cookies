import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "../asset/cookies-about.png";

const ProductCard = ({ item, addToCart }) => {
  return (
    <div
      className="lg:h-auto lg:w-64 h-80 w-44 rounded-2xl bg-gray-100 shadow-2xl shadow-black flex flex-col items-center justify-between pb-4">
      <img
        src={item.image || 'https://via.placeholder.com/150'}
        alt={item.name || 'Produk'}
        className="lg:h-36 h-32 mt-4 lg:mt-8"
      />

      <h2 className="font-semibold lg:text-2xl text-lg text-center mt-2">
        {item.name || 'Tidak ada nama'}
      </h2>

      {isBundle ? (
        <details className="text-gray-500 text-center mt-2">
          <summary className="font-light lg:text-lg text-md cursor-pointer">
            Lihat Deskripsi
          </summary>
          <p className="mt-2 px-1 font-light text-sm">
            {item.category || 'Tanpa kategori'}
          </p>
        </details>
      ) : (
        <h2 className="font-light lg:text-lg text-md text-gray-500 mt-2">
          {item.category || 'Tanpa kategori'}
        </h2>
      )}

      <h2 className="font-semibold lg:text-2xl text-xl text-amber-600">
        {item.price ? `Rp. ${item.price.toLocaleString('id-ID')}` : 'Harga tidak tersedia'}
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

const ProductTemplate = ({ title, data, image, isBundle = false }) => {
  return (
    <>
      <div className="max-w-4xl text-start ml-10 mt-20 text-white">
        <h2 className="text-3xl lg:font-bold font-semibold lg:px-24">{title}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-y-10 gap-y-4 mx-6 md:mx-36 mt-11">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} isBundle={isBundle} />
        ))}
      </div>
    </>
  );
};


const Product = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.nama || "Nama tidak tersedia",
            description: data.keterangan || "Deskripsi tidak tersedia",
            price: data.harga || 0,
            category: data.kategori || "Uncategorized",
            image: data.imageUrl || Cookies,
          };
        });

        console.log("Data retrieved:", productList); // Debugging

        const groupedProducts = {};
        productList.forEach((product) => {
          if (!groupedProducts[product.category]) {
            groupedProducts[product.category] = [];
          }
          groupedProducts[product.category].push(product);
        });

        const categoryList = Object.keys(groupedProducts).map((category) => ({
          title: category,
          data: groupedProducts[category],
          image: groupedProducts[category][0]?.image || Cookies,
          isBundle: category.toLowerCase().includes('bundle'),
        }));

        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching products:", error);
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
        updatedCart[existingItemIndex].totalPrice = updatedCart[existingItemIndex].quantity * product.price;
        return updatedCart;
      } else {
        return [...prevCart, {...product, quantity: 1, totalPrice: product.price}];
      }
    });

    toast.success(`${product.name} (${product.variant}) ditambahkan ke keranjang!`);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity -= 1;
        updatedCart[index].totalPrice = updatedCart[index].quantity * updatedCart[index].price;
      } else {
        updatedCart.splice(index, 1);
      }
      return updatedCart;
    });
  };

  const resetCart = () => {
    setCart([]);
  };

  const handleOrder = () => {
    if (cart.length === 0) return;

    const itemsList = cart
      .map((item, index) => `${index + 1}. ${item.name} - ${item.variant} - Rp. ${item.price.toLocaleString("id-ID")}`)
      .join('\n');

    const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0);

    const message = `Halo Kak, saya ingin memesan:\n\n${itemsList}\n\nTotal Harga: Rp. ${totalPrice.toLocaleString("id-ID")}\n\nTerima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/6285701557609?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
    setCart([]);
  };

  return (
    <section id="product" className='min-h-screen flex flex-col'>
      <ToastContainer />
      <h1 className='text-center lg:font-bold font-semibold lg:text-5xl text-3xl mb-8 text-white'>Product</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-y-10 gap-y-4 mx-6 md:mx-36 mt-11">
        {products.map((item) => (
          <ProductCard key={item.id} item={item} addToCart={addToCart} />
        ))}
      </div>

      {/* Cart */}
      {cart.length > 0 && (
        <div className="min-h-auto flex items-center justify-center pt-8 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl bg-amber-900 bg-opacity-50 border-2 border-amber-800 rounded-lg text-white p-6 flex flex-col items-center mt-10 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Keranjang</h2>
            <ul className="w-full space-y-4">
              {cart.map((item, index) => (
                <li key={index} className="flex flex-wrap justify-between items-center w-full bg-amber-800 bg-opacity-40 p-4 rounded-md">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-200">{item.category}</span>
                    <span className="text-sm text-gray-200">x{item.quantity}</span>
                  </div>
                  <div className="flex items-center mt-2 sm:mt-0 space-x-4">
                    <button onClick={() => removeFromCart(index)} className="text-red-400 hover:text-red-600 transition">
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className='font-bold mt-2'>Total:
              Rp. {cart.reduce((total, item) => total + item.totalPrice, 0).toLocaleString("id-ID")}
            </h3>
            <div className='flex space-x-10 mt-6'>
              <button onClick={resetCart} className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition duration-300">
                Reset
              </button>
              <button onClick={handleOrder} className="px-6 py-2 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition duration-300">
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;
