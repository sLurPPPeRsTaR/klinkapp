import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Router from './router/index';
import {QueryClientProvider, QueryClient} from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
