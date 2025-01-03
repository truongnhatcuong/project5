/* eslint-disable react/no-unescaped-entities */
"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import FilterSidebar from "./components/SideBar";
import SelectForm from "./components/SelectForm";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";

interface IProduct {
  product_id: number;
  product_name: string;
  price: number;
  Images: { image_url: string | any }[];
}

const PageProduct = () => {
  const searchParams = useSearchParams();
  const category_Id = searchParams.get("category_id");
  const searchQuery = searchParams.get("search") || "";
  const [sortOption, setSortOption] = useState<string>("");
  const [product, setProduct] = useState<IProduct[]>([]);
  const [sortedProduct, setSortedProduct] = useState<IProduct[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [errorMessage, setErrorMessage] = useState<string>("");
  console.log(product);

  // Hàm gọi API
  useEffect(() => {
    async function fetchProducts() {
      const endpoint = category_Id
        ? `/api/categories/${category_Id}`
        : `/api/product?search=${searchQuery}`;
      try {
        const req = await fetch(endpoint);
        const data = await req.json();
        if (category_Id) {
          if (data.category?.Products && data.category.Products.length > 0) {
            setProduct(data.category.Products);
            setErrorMessage("");
          } else {
            setProduct([]);
            setErrorMessage("Không có sản phẩm trong danh mục này.");
          }
        } else {
          if (data.product && data.product.length > 0) {
            setProduct(data.product);
            setErrorMessage("");
          } else {
            setProduct(data.product || []);
            setErrorMessage("Không tìm thấy sản phẩm với từ khóa này.");
          }
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    }
    fetchProducts();
  }, [category_Id, searchQuery]);

  //Lọc sản phẩm dựa trên giá trị

  useEffect(() => {
    let filteredProduct;
    const minPrice = product.reduce(
      (min, item) => (item.price < min ? item.price : min),
      product[0]?.price || 50000
    );
    if (maxPrice === 0) {
      filteredProduct = product;
    } else if (maxPrice <= minPrice) {
      filteredProduct = product.filter((item) => item.price <= 50000);
    } else if (maxPrice <= 100000) {
      filteredProduct = product.filter(
        (item) => item.price <= 100000 && item.price > 50000
      );
    } else if (maxPrice <= 200000) {
      filteredProduct = product.filter(
        (item) => item.price <= 200000 && item.price > 100000
      );
    } else if (maxPrice <= 300000) {
      filteredProduct = product.filter(
        (item) => item.price <= 300000 && item.price > 200000
      );
    } else if (maxPrice <= 500000) {
      filteredProduct = product.filter(
        (item) => item.price <= 500000 && item.price > 300000
      );
    } else {
      filteredProduct = product.filter((item) => item.price > 500000);
    }
    setSortedProduct(filteredProduct);
  }, [product, maxPrice]);
  // Sắp xếp sản phẩm dựa trên sortOption
  useEffect(() => {
    if (product.length === 0) return; // Kiểm tra nếu không có sản phẩm nào, không cần sắp xếp

    let sortProduct = [...product];
    if (sortOption === "price_asc") {
      sortProduct = sortProduct.sort((a: any, b: any) => a.price - b.price);
    } else if (sortOption === "price_desc") {
      sortProduct = sortProduct.sort((a, b) => a.price - b.price).reverse();
    } else if (sortOption === "new") {
      sortProduct = sortProduct.reverse();
    } else if (sortOption === "a-z") {
      sortProduct = sortProduct.sort((a, b) =>
        a.product_name.localeCompare(b.product_name)
      );
    } else if (sortOption === "z-a") {
      sortProduct = sortProduct.sort((a, b) =>
        b.product_name.localeCompare(a.product_name)
      );
    }
    setSortedProduct(sortProduct); // Cập nhật lại danh sách sản phẩm đã sắp xếp
  }, [product, sortOption]); // Chạy lại mỗi khi `product` hoặc `sortOption` thay đổi

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10  border-t w-full h-full   ">
      {/* Sidebar */}
      <div className="sm:w-1/5 w-full   flex sm:flex-row flex-col shadow-lg  text-black dark:text-black dark:bg-white ">
        <FilterSidebar
          onCategoryChange={(categoryId) => console.log(categoryId)} // Cập nhật khi thay đổi danh mục
          onPriceChange={(price) => setMaxPrice(price)}
        />
      </div>

      {/* Giữa các phần: sidebar và nội dung */}
      <div className="flex-1 sm:w-4/5 w-full  ">
        {/* Select Form bên trái */}
        <div className="flex  text-base sm:text-2xl my-2 justify-end md:justify-end ">
          <SelectForm onSortChange={handleSortChange} />
        </div>{" "}
        <div className="mb-5">
          {" "}
          {searchQuery !== "" && (
            <p className="text-sm text-gray-500 ">
              Liên quan đến: "
              <span className="text-base uppercase text-red-500 font-semibold">
                {searchQuery}
              </span>
              "
            </p>
          )}
        </div>
        <div className="text-center md:my-1.5 my-0">
          <Title title1="Tất Cả" title2="Bộ Sưu Tập" />
        </div>
        {/* Content area */}
        <div className="grid   grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6 mx-5 md:mx-0">
          {sortedProduct.length > 0 ? (
            sortedProduct.map((item) => (
              <ProductItem {...item} key={item.product_id} />
            ))
          ) : (
            <div>không tìm thấy sản phẩm </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageProduct />
    </Suspense>
  );
}
