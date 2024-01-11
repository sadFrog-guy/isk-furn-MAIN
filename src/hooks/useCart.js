import {useState} from "react";
import {useDispatch} from "react-redux";

const useCart = (product) => {
  const [countCart, setCountCart] = useState(0);
  const [isAdded, setAdded] = useState(false);
  const dispatch = useDispatch();

  const AddToBasket = (e) => {
    e.preventDefault();

    if (countCart < 99999) {
      setCountCart(countCart + 1)
    }
  };

  const RemoveFromBasket = (e) => {
    e.preventDefault();

    if (countCart > 0) {
      setCountCart(countCart - 1)
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault()

    setAdded(true)

    dispatch.cart.addToCart({
      product,
      count: countCart
    })

    setCountCart(0)

    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  const preventConextMenu = (e) => {
    e.preventDefault()
  }

  return {
    preventConextMenu,
    handleContextMenu,
    RemoveFromBasket,
    AddToBasket,
    isAdded,
    countCart
  }
}

export default useCart;