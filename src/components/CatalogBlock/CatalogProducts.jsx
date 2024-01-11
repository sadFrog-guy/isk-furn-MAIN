import { useState, useMemo } from "react";

import "../../styles/components/CatalogProducts.scss";
import Loader from "../Loader/Loader";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import api from "../../services/api";
import arrowR from "../icons/arrowPaginationR.svg";
import arrowL from "../icons/arrowPaginationL.svg";
import ProductsItem from "../products/productsItem";

export default function CatalogProducts({ title }) {
  const { id } = useParams()
  const { data: products, isLoading, isError } = useQuery(
    'products',
    () => api.get(`/api/getProducts?categoryId=${id}&page=1&limit=20`).then((res) => res.data.objects),
    { enabled: true }
  );


  const [sortOrder, setSortOrder] = useState("desc");
  const sortedProducts = useMemo(() => {
    const sorted = products?.sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });
    return sorted;
  }, [products, sortOrder]);

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const nextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(products?.length / productsPerPage))
    );
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

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
          {currentProducts?.map((product) => (
            <ProductsItem key={product.id} product={product} />
          ))}
        </div>

        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            <img src={arrowL} alt="ico" />
          </button>
          {Array.from(
            { length: Math.ceil(products?.length / productsPerPage) },
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
              currentPage === Math.ceil(products?.length / productsPerPage)
            }
          >
            <img src={arrowR} alt="ico" />
          </button>
        </div>
      </div>
    </div>
  );
}
