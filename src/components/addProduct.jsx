import React, { useState } from "react";
import { db, storage } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddProduct = ({ onClose }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    if (!productName || !price || !category || !description) {
      alert("Harap isi semua field kecuali gambar!");
      return;
    }

    setLoading(true);
    let imageUrl = "";

    try {
      if (image) {
        const storageRef = ref(storage, `products/${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "products"), {
        name: productName,
        price: parseFloat(price),
        category: category,
        description: description,
        imageUrl: imageUrl,
        createdAt: new Date(),
      });

      alert("Produk berhasil ditambahkan!");
      setProductName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setImage(null);
      onClose();
    } catch (error) {
      console.error("Gagal menambahkan produk:", error);
      alert("Terjadi kesalahan!");
    }

    setLoading(false);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>

      <input type="text" placeholder="Nama Produk" value={productName} onChange={(e) => setProductName(e.target.value)} className="border p-2 mb-3 w-full" />
      <input type="number" placeholder="Harga Produk" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 mb-3 w-full" />
      <input type="text" placeholder="Kategori" value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 mb-3 w-full" />
      <textarea placeholder="Keterangan Produk" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 mb-3 w-full"></textarea>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} className="border p-2 mb-3 w-full" />

      <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2" disabled={loading}>
        {loading ? "Menambahkan..." : "Tambah Produk"}
      </button>
    </div>
  );
};

export default AddProduct;
