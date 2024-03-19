import { FILTER_ORDERS_LIST, VALIDATE_LOT_ON_PLAN, SAVE_LOT_ON_PLAN } from "../constants/action-types";

const FilterOrdersList = (payload) => {
  return { type: FILTER_ORDERS_LIST, payload }
}

const ValidateLotOnPlan = (payload) => {
  return { type: VALIDATE_LOT_ON_PLAN, payload }
}

const SaveLotOnPlan = (payload) => {
  return { type: SAVE_LOT_ON_PLAN, payload }
}

export { FilterOrdersList, ValidateLotOnPlan, SaveLotOnPlan }

