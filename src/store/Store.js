import React, { useReducer, createContext, useEffect } from 'react';
import reducers from '../reducers/reducers'

const initialState = {
  OrderReducer: {
    showAllOrders: false,
    searchTerm: '',
    selectedStatus: []
  },
  FormReducer: {
    lotonplan: '',
    validatedLotOnPlan: {}
  }
}

const Store = ({ children }) => {

  const rootReducer = reducers => (state, action) => {
    let newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };

  const [state, dispatch] = useReducer(rootReducer(reducers), initialState);

  // check the updated state
  /* useEffect(() => {
    console.log(state);
  }, [state]) */

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
}

export const Context = createContext(initialState);
export default Store;