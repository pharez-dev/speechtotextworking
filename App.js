/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Home from './src/Home';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <PaperProvider theme={theme}>
        <Home />
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
