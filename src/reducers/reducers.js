const OrderReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL_ORDERS':
      return { ...state, showAllOrders: action.payload }
    case 'ORDER_SEARCH_TERM':
      return  { ...state, searchTerm: action.payload }
    case 'FILTER_STATUS':
      return {...state, selectedStatus: action.payload }
    default:
      return state
  }
}

const FormReducer = (state, action) => {
  switch (action.type) { 
    case 'VALIDATE_LOT_ON_PLAN':
      return  { ...state, lotonplan: action.payload }
    case 'SAVE_LOT_ON_PLAN':
      return { ...state, validatedLotOnPlan: action.payload }
    default:
      return state
  }
}

export default { OrderReducer, FormReducer }