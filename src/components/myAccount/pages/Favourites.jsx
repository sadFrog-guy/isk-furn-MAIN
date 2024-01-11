import React from 'react';
import ProductsItem from '../../products/productsItem';
import Product from '../.../../../../components/icons/product-default.svg';
import '../../../styles/components/favourites.scss';
import EmptySection from "../../EmptySection/EmptySection";
import heart_icon from '../../icons/heart_nofav.svg';
import TopNavMobile from "../../TopNavMobile/TopNavMobile";
import useCheckMobileScreen from "../../../hooks/useCheckMobileScreen";
import searchIco from "../../icons/Search.svg";

const Favourites = () => {
  const isMobile = useCheckMobileScreen();
  const favorite = {
    name: 'Держатель для лейки BOOU PG605',
    image: Product,
    price: 1000,
    promoPrice: 1294,
    quantity: 1,
  };

  // можете заменять комментарий на 19 и 20 строках чтобы показать\спрятать товары

  const favourites = new Array(4).fill(favorite);
  // const favourites = []

  return (
    <div className='favourites_container'>
      {isMobile &&
        <TopNavMobile title='История заказов' additionalClass='profileEdit_nav'/>
      }

      {isMobile &&
        <div className="header-search favorite_search">
          <input type="text" placeholder="Поиск по товарам" />
          <img src={searchIco} alt="search" />
        </div>
      }

      <h1>Избранные товары</h1>
      <div className='favourites'>
        {favourites.length !== 0
          ? favourites.map((favourite, idx) => (
                <ProductsItem key={idx} product={favourite} />
            ))
          : <EmptySection icon={heart_icon} title='Избранных товаров нет'/>
        }
      </div>
    </div>
  );
};

export default Favourites;
