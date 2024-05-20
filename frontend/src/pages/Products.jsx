import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import productService from "../services/product.service";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

function Products() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = new URLSearchParams(window.location.search);
  const category = query.get("category");
  const navigate = useNavigate();

  async function getAllProducts() {
    productService
      .getProducts()
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }

  async function getCategories() {
    productService
    .getCategories()
    .then(res => res.data)
    .then(objects => objects.map(obj => obj.category))
    .then(data => setCategories(["all", ...data]))
    .catch(err => alert(err.message));
  }

  useEffect(() => {
    getCategories();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (!category) {
      getAllProducts();
    } else {
      productService
        .getProductsByCategory(category)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          setProducts(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [category]);

  return (
    <div className="flex-1 py-8 px-10">
      <h1 className="text-3xl text-center font-bold ">Products</h1>
      {error && <h1>{error.message}</h1>}
      <div className="flex space-x-2">
      {
        categories && categories.map(category => (
          <button className="text-white bg-black rounded px-4 py-2 hover:bg-gray-700" onClick={() => navigate(category == "all" ? "/products" : "?category="+category)}>{category}</button>
        ))
      }
      </div>

      <div className="flex flex-wrap items-start flex-1 justify-center h-full py-4 space-x-6 ">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        {loading &&
          Array.from(new Array(10)).map((item, index) => (
            <div key={index}>
              <Skeleton variant="rectangular" width={250} height={180} />
              <Skeleton />
              <Skeleton width="60%" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Products;
