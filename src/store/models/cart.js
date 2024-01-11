import api from "../../services/api/index";

const cart = {
  state: {
    cart: [],
  },
  reducers: {
    addToCart: (state, {product, count}) => {
      return {
        ...state,
        cart: [...state.cart, {product, count}]
      }
    },

    removeFromCart: (state, productId) => {
      let x = {}
      const newCart = state.cart.filter(obj => {
        x = obj
        return obj.product._id !== productId
      })

      console.log(productId, x)

      return {
        ...state,
        cart: newCart
      }
    },

    removeAllCart: (state) => {
      return {
        ...state,
        cart: []
      }
    }

  },
};

export default cart;
