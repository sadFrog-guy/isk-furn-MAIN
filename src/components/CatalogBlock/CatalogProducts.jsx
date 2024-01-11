import React, { useState, useEffect, useMemo } from "react";

import arrowR from "../icons/arrowPaginationR.svg";
import arrowL from "../icons/arrowPaginationL.svg";
import { useDispatch, useSelector } from "react-redux";
import ProductsItem from "../products/productsItem";
import "../../styles/components/CatalogProducts.scss";
import Loader from "../Loader/Loader";

export default function CatalogProducts({ title }) {
  const {
    products: { getProducts },
  } = useDispatch();
  const products = useSelector((state) => state.products.data);

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getProducts("?page=1");
      setLoading(false);
    };

    fetchData();
    // &categoryId=648debc5729053d175af919a
  }, []);

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  const [sortOrder, setSortOrder] = useState("desc");
  const sortedProducts = useMemo(() => {
    const sorted = [...allProducts].sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });
    return sorted;
  }, [allProducts, sortOrder]);

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const nextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(products.length / productsPerPage))
    );
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  console.log(products);
  return (
    <div className="catalogProducts container">
      <div className="catalogProducts-title">
        <h2>{title}</h2>
        <p className="catalogProducts-sorted" onClick={toggleSortOrder}>
          Сортировать по: &nbsp;
          <span>
            {sortOrder === "asc" ? "Возрастанию" : "Убыванию"}
            &nbsp;цены
          </span>
        </p>
      </div>
      <div className="catalogProducts-content">
        <div className="catalogProducts-items">
          {currentProducts.map((product) => (
            <ProductsItem key={product.id} product={product} />
          ))}
        </div>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            <img src={arrowL} alt="ico" />
          </button>
          {Array.from(
            { length: Math.ceil(products.length / productsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(products.length / productsPerPage)
            }
          >
            <img src={arrowR} alt="ico" />
          </button>
        </div>
      </div>
    </div>
  );
}
