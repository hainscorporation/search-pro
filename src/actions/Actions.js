import { SHOW_ALL_ORDERS, ORDER_SEARCH_TERM } from "../constants/action-types";

const ShowAllOrders = (payload) => {
  return { type: SHOW_ALL_ORDERS, payload }
}

const SearchOrderByTerm = (payload) => {
  return { type: ORDER_SEARCH_TERM, payload }
}
export { ShowAllOrders, SearchOrderByTerm }

