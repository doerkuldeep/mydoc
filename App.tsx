import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation/AppNavigation';
import {Store} from './src/Store/Store';

const App = () => (
  <Provider store={Store}>
    <AppNavigator />
  </Provider>
);

export default App;
