import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import Cookies from '../asset/cookies-about.png';

const ProductCard = ({ item, isBundle }) => {
  const PopUp = () => {
    alert('User Login Needed');
  };

  return (
    <div className="lg:h-auto lg:w-64 h-80 w-44 rounded-2xl bg-gray-100 shadow-2xl shadow-black flex flex-col items-center justify-between pb-4">
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
            {item.description || 'Tanpa keterangan'}
          </p>
        </details>
      ) : (
        <h2 className="font-light lg:text-lg text-md text-gray-500 mt-2">
          {item.description || 'Tanpa keterangan'}
        </h2>
      )}

      <h2 className="font-semibold lg:text-2xl text-xl text-amber-600">
        {item.price ? `Rp. ${item.price.toLocaleString('id-ID')}` : 'Harga tidak tersedia'}
      </h2>

      <button
        onClick={PopUp}
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

        // console.log("Data retrieved:", productList); // Debugging

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
        }));

        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="product" className="min-h-screen flex flex-col">
      <h1 className="text-center lg:font-bold font-semibold lg:text-5xl text-3xl mb-8 text-white">
        Product
      </h1>
      <div>
        {categories.map((category, index) => (
          <ProductTemplate
            key={index}
            title={category.title}
            data={category.data}
            image={category.image}
            isBundle={category.isBundle}
          />
        ))}
      </div>
    </section>
  );
};

export default Product;
