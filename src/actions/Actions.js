import { SHOW_ALL_ORDERS, ORDER_SEARCH_TERM, FILTER_STATUS, VALIDATE_LOT_ON_PLAN } from "../constants/action-types";

const ShowAllOrders = (payload) => {
  return { type: SHOW_ALL_ORDERS, payload }
}

const SearchOrderByTerm = (payload) => {
  return { type: ORDER_SEARCH_TERM, payload }
}

const FilterStatus = (payload) => {
  return { type: FILTER_STATUS, payload }
}

const ValidateLotOnPlan = (payload) => {
  return { type: VALIDATE_LOT_ON_PLAN, payload }
}
export { ShowAllOrders, SearchOrderByTerm, FilterStatus, ValidateLotOnPlan }

