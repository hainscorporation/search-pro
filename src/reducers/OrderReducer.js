const OrderReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_ORDER_DIALOG':
      return { ...state, isOpen: action.payload }
    default:
      return state
  }
}

export default OrderReducer