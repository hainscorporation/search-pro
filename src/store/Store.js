import React, { useReducer, createContext, useEffect } from 'react';
import OrderReducer from '../reducers/OrderReducer';

const initialState = { showAllOrders: false, searchTerm: '' };

const Store = ({ children }) => {

  const [state, dispatch] = useReducer(OrderReducer, initialState);

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