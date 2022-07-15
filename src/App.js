import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import { Loading } from './components';

// Redux
// Provide mengumpulkan store yang sudah dibuat
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
  // Redux / state management
  // Agar state bisa digunakan secara global dan digunakan dimana saja
  const [loading, setLoading] = useState(false);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {loading && <Loading />}
    </Provider>
  );
}
