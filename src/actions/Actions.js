import { SHOW_ALL_ORDERS } from "../constants/action-types";


const ShowAllOrders = (payload) => {
  return { type: SHOW_ALL_ORDERS, payload }
}

export { ShowAllOrders }

