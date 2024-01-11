import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as IcoArrow } from "../icons/arrowCategory.svg";
import "rc-slider/assets/index.css";
import { useQuery } from "react-query";
import api from './../../services/api/index';

const CatalogSidebar = ({ title, display, setShow }) => {
  const {id} = useParams()
  const [openCategories, setOpenCategories] = useState([]);
  const [price, setPrice] = useState([0, 100]);
  const [aPriceRange, aPSetPriceRange] = useState([0, 100]);

  const handleSliderChange = (value) => {
    aPSetPriceRange(value);
  };
  
  
  const { data:products, isLoading, isError } = useQuery(
    'products',
    () => api.get(`/api/getProducts?categoryId=${id}&page=1&limit=20`).then((res) => res.data.objects),
    { enabled: true }
  );
  const categories = []
  console.log(products);
  // const products = useSelector((state) => state.products.data);

  // const categories = useSelector((state) => state.categories.data);
  // const {
  //   categories: { getCategories },
  // } = useDispatch();
  // useEffect(() => {
  // getCategories();
  // }, []);

  const toggleCategory = (_id) => {
    if (openCategories.includes(_id)) {
      setOpenCategories(openCategories.filter((id) => id !== _id));
    } else {
      setOpenCategories([...openCategories, _id]);
    }
  };

  const filteredCategories = categories.filter(
    (category) =>
      !category.parent &&
      categories.some((subCategory) => subCategory.parent === category._id)
  );
  useEffect(() => {
    if (products?.length > 0) {
      const allPrices = products.map((product) => product.price);
      const minPrice = Math.min(...allPrices);
      const maxPrice = Math.max(...allPrices);
      setPrice([minPrice, maxPrice]);
      aPSetPriceRange([minPrice, maxPrice]);
    }
  }, [products]);

  // products.forEach((dsd) => {
  //   console.log(dsd);
  // });
  // console.log(categories);
  return (
    <div
      className="category-sidebar"
      style={display ? { display: "block" } : null}
    >
      <div className="category-sidebar_title">
        <h2>{title}</h2>
      </div>

      <div className="category-sidebar_blocks">
        <div className="category-sidebar_block">
          {filteredCategories.map((category) => (
            <div className="block-item" key={category._id}>
              {!category.parent && (
                <button onClick={() => toggleCategory(category._id)}>
                  {category.name} <IcoArrow />
                </button>
              )}
              <ul className={openCategories.includes(category._id) ? "open" : "closed"}>
                {categories
                  .filter((subCategory) => subCategory.parent === category._id)
                  .map((subCategory) => (
                    <li
                      key={subCategory._id}
                      onClick={() => {
                        setShow();
                      }}
                    >
                      <Link to={`/category/${subCategory._id}`}>
                        {subCategory.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="slider">
          <h4>По цене</h4>
          <p className="price-range">
            <span>{aPriceRange[0]}&nbsp;с</span>
            <span>{aPriceRange[1]}&nbsp;с</span>
          </p>
          <Slider
            range
            min={price[0]}
            max={price[1]}
            value={aPriceRange}
            onChange={handleSliderChange}
            className="slider-block"
          />
          <div className="slider-buttons">
            <button className="btn-show">Показать</button>
            <button className="btn-reset">Х Сбросить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogSidebar;
