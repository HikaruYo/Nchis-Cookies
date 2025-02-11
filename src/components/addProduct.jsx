import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
      alert("Choose yor File Image");
      setImage(null);
      setImagePreview(null);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hikaru");
    formData.append("cloud_name", "dx5xnee68");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dx5xnee68/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Cloudinary response:", data);

      if (!data.secure_url) {
        throw new Error("Failed to Upload Image!");
      }

      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return "";
    }
  };

  const handleAddProduct = async () => {
    if (!productName || !price || !category || !description) {
      alert("Please fill this field!");
      return;
    }

    setLoading(true);
    let imageUrl = "";

    try {
      if (image) {
        imageUrl = await uploadImageToCloudinary(image);
      }

      await addDoc(collection(db, "products"), {
        nama: productName,
        harga: Number(price),
        kategori: category,
        keterangan: description,
        imageUrl: imageUrl,
        createdAt: serverTimestamp(),
      });

      alert("Product added Succesfully!");
      resetForm();
      onClose();
    } catch (error) {
      console.error("Cancel added Product:", error);
      alert("Something went Wrong");
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
    <div className="p-5 bg-white rounded-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>

      <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} className="border p-2 mb-3 w-full rounded" />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 mb-3 w-full rounded" />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 mb-3 w-full rounded" />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 mb-3 w-full rounded"></textarea>

      <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 mb-3 w-full rounded" />

      {imagePreview && (
        <div className="mb-3">
          <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded" />
        </div>
      )}

      <button onClick={handleAddProduct} className="bg-amber-700 text-white px-4 py-2 w-full rounded hover:bg-amber-900 transition" disabled={loading}>
        {loading ? "Adding Product..." : "Submit"}
      </button>
    </div>
  );
};

export default AddProduct;
