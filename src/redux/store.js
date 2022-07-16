// Tempat menyimpan state global

import { createStore } from 'redux';

const initialState = {
  loading: false,
  name: 'Dimas Nuryadin',
  address: 'Bandung',
};

// Mempunyai konsep merubah state secara global
const reducer = (state = initialState, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value,
    };
  }
  return state;
};

// CreateStore() Memerlukan Value berupa Function
const store = createStore(reducer);

export default store;
