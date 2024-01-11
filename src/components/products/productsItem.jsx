import React, {useState} from 'react';
import { ReactComponent as ProductDefault } from '../icons/product-default.svg';
import { ReactComponent as Plus } from '../icons/plus.svg';
import { ReactComponent as Minus } from '../icons/minus.svg';
import { ReactComponent as Heart } from '../icons/heart.svg';
import { ReactComponent as HeartFilled } from '../icons/heart_filled.svg';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DetailOfProduct from '../../pages/DetailOfProduct';
import useCart from "../../hooks/useCart";
import { LightTooltip } from "../LightTooltip/LightTooltip";

const ProductsItem = ({ product }) => {
  const navigate = useNavigate();
  const [isHeartActive, setHeartActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    preventContextMenu,
    handleContextMenu,
    RemoveFromBasket,
    AddToBasket,
    isAdded,
    countCart
  } = useCart(product);

  const HandleHeartClick = () => {
    setHeartActive(!isHeartActive)
  }

  const navigateToDetail = () => {
    navigate(`/product`);
  };

  return (
      <>
        <Routes>
          <Route
              path={`/product`}
              element={<DetailOfProduct product={product} />}
          />
        </Routes>
        <div className='products-item'>
          <div className='products-item_imgdiv'>
            <div className='heart' onClick={HandleHeartClick}>
              {isHeartActive ? <HeartFilled/> : <Heart />}
            </div>
            {product.image !== null ? (
                <img
                    onLoad={() => setLoading(false)}
                    onClick={navigateToDetail}
                    src={product.image}
                    alt={product.name}
                />
            ) : (
                <ProductDefault onLoad={() => setLoading(false)} onClick={navigateToDetail} />
            )}

            {loading && <div className='blank' onClick={navigateToDetail}/>}
          </div>
          <h3 onClick={navigateToDetail}>{product.name}</h3>
          <h2>
          <span className={product.promoPrice > 0 ? 'redPrice' : 'normalPrice'}>
            {product.price} с
          </span>
            <span className='discountPrice'>
            {product.promoPrice > 0 ? product.promoPrice + 'c' : ''}
          </span>
          </h2>
          <h4>В наличии</h4>
          <h5>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='5.8'
                height='5.8'
                viewBox='0 0 7 8'
                fill='none'
            >
              <circle
                  cx='3.5'
                  cy='4'
                  r='3.5'
                  fill={product.productSet !== null ? '#82CF6F' : '#949494'}
              />
            </svg>
            <div>В комплекте</div>
          </h5>
          <div className='products-item_bottom'>
            <div
                className='mathDiv'
                onClick={RemoveFromBasket}
                onContextMenu={preventContextMenu}
            >
              <Minus/>
            </div>
            <div className='quantity'>{countCart}</div>
            <LightTooltip title="Нажмите ПКМ чтобы добавить товар в корзину" arrow placement="bottom">
              <div
                  className={`mathDiv ${isAdded ? 'added' : ''}`}
                  onClick={AddToBasket}
                  onContextMenu={handleContextMenu}
              >
                <Plus />
              </div>
            </LightTooltip>
          </div>
        </div>
      </>
  );
};

export default ProductsItem;