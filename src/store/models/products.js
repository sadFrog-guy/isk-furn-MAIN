import api from "../../services/api/index"

const products = {
    state: {
        data: [],
        liked: {},
    },
    reducers: {
        setProducts: (state, payload) => ({
            ...state,
            data: payload,
        }),
        setLiked: (state, payload) => ({
            ...state,
            liked: {
                ...state.liked,
                [payload]: state.liked[payload] ? false : true,
            },
        }),
    },
    effects: (dispatch) => ({
        async getProducts(params) {
            const {
                data: { objects },
            } = await api.get(`/api/getProducts${params}`)

            dispatch.products.setProducts(objects || [])
        },
    }),
}

export default products
