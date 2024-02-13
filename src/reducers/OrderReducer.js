const OrderReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL_ORDERS':
      return { ...state, showOrders: action.payload }
    default:
      return state
  }
}

export default OrderReducer