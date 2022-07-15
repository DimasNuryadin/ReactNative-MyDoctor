// Tempat menyimpan state global

import { createStore } from 'redux';

const initialState = {
  loading: false,
};

// Mempunyai konsep merubah state secara global
const reducer = (state = initialState, action) => {
  return state;
};

// CreateStore() Memerlukan Value berupa Function
const store = createStore(reducer);

export default store;
