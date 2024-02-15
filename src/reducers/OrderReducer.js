const OrderReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL_ORDERS':
      return { ...state, showAllOrders: action.payload }
    case 'ORDER_SEARCH_TERM':
      return  { ...state, searchTerm: action.payload }
    default:
      return state
  }
}

export default OrderReducer