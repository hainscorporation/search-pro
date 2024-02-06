import { OPEN_ORDER_DIALOG } from "../constants/action-types";

const OpenOrderDialog = (payload) => {
  return { type: OPEN_ORDER_DIALOG, payload }
}

export default OpenOrderDialog;

