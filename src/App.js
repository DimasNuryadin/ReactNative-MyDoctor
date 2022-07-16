import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { Loading } from './components';
import Router from './router';

// Redux
// Provide mengumpulkan store yang sudah dibuat
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';

const MainApp = () => {
  // Redux / state management
  // Agar state bisa digunakan secara global dan digunakan dimana saja
  // Memanggil store yang sudah dimiliki
  const stateGlobal = useSelector(state => state);
  // console.log('State global : ', stateGlobal);

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  );
};

// Supaya mudah untuk mengkonsumsi storenya secara global (Redux)
const app = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default app;
