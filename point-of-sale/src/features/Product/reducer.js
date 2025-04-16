import { FETCH_PRODUCTS, FILTER_PRODUCTS, SET_LOADING } from "./constants";

const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };
    case FILTER_PRODUCTS: {
      const categoryId = action.payload;

      if (categoryId === "all") {
        return {
          ...state,
          filteredProducts: state.products,
        };
      } else {
        return {
          ...state,
          filteredProducts: state.products.filter(
            (product) => product.categoryId === categoryId
          ),
        };
      }
    }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
