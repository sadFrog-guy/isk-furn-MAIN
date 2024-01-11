import React from 'react';

// Import css files
import Slider from 'react-slick';
import ProductsItem from './productsItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useQuery } from 'react-query';
import Loader from "../Loader/Loader";

export default function Products({ title }) {
  // const {
  //   products: { getProducts },
  // } = useDispatch();
  // const products = useSelector((state) => state.products.data);

  // useEffect(() => {
  //   getProducts('?bestseller=true&page=1');
  // }, []);

  const { data:products, isLoading, isError } = useQuery(
    'users',
    () => api.get('/api/getProducts?bestseller=true&page=1').then((res) => res.data.objects),
    { enabled: true }
  );
  console.log(products?.objects);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error :(</p>;

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className='products container'>
      <div className='products-title'>
        <h2>{title}</h2>
        <Link to='/catalog' className='categories-title_right'>
          перейти в каталог
        </Link>
      </div>
      <Slider {...settings}>
        {products.map((product) => (
          <ProductsItem key={product.id} product={product} />
        ))}

      </Slider>

      {/*<Loader/>*/}
    </div>
  );
}
