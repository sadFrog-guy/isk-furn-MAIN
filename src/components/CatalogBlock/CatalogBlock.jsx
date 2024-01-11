import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesItem from '../categories/categoriesItem';
import catalogLocation from '../icons/catalogLocation.svg';
import { Link } from 'react-router-dom';

const CatalogBlock = () => {
  const [sortedCategories, setSortedCategories] = useState([]);
  const categories = useSelector((state) => state.categories.data);
  const {
    categories: { getCategories },
  } = useDispatch();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setSortedCategories(categories.filter((category) => category.img !== ''));
  }, [categories]);

  return (
    <div className='categories container'>
      <div className='categories-title'>
        <h2>Выберите категорию</h2>
        <div className='catalogBlock-title_right'>
          Бишкек
          <img src={catalogLocation} alt='image' />
        </div>
      </div>
      <div className='categories-items'>
        {sortedCategories.length > 0 &&
          sortedCategories.map((category) => (
            <Link to={'/catalog/category/' + category._id} key={category._id}>
              <CategoriesItem key={category._id} category={category} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CatalogBlock;
