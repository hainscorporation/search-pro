const OrderReducer = (state, action) => {
  switch (action.type) {
    case 'FILTER_ORDERS_LIST':
      return { ...state, filters: action.payload}
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