import React, { useState } from "react";
import { db, storage } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddProduct = ({ onClose }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Silakan pilih file gambar!");
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleAddProduct = async () => {
    if (!productName || !price || !category || !description) {
      alert("Harap isi semua field!");
      return;
    }

    setLoading(true);
    let imageUrl = "";

    try {
      if (image) {
        const storageRef = ref(storage, `products/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "products"), {
        nama: productName,
        harga: Number(price),
        kategori: category,
        keterangan: description,
        imageUrl: imageUrl,
        createdAt: serverTimestamp(),
      });

      alert("Produk berhasil ditambahkan!");
      resetForm();
      onClose();
    } catch (error) {
      console.error("Gagal menambahkan produk:", error);
      alert("Terjadi kesalahan!");
    }

    setLoading(false);
  };

  const resetForm = () => {
    setProductName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>

      <input type="text" placeholder="Nama Produk" value={productName} onChange={(e) => setProductName(e.target.value)} className="border p-2 mb-3 w-full rounded" />
      <input type="number" placeholder="Harga Produk" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 mb-3 w-full rounded" />
      <input type="text" placeholder="Kategori" value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 mb-3 w-full rounded" />
      <textarea placeholder="Keterangan Produk" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 mb-3 w-full rounded"></textarea>

      <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 mb-3 w-full rounded" />

      {imagePreview && (
        <div className="mb-3">
          <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded" />
        </div>
      )}

      <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600 transition" disabled={loading}>
        {loading ? "Menambahkan..." : "Tambah Produk"}
      </button>
    </div>
  );
};

export default AddProduct;
