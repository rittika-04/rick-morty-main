import { setupStore } from '../store/store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

export function renderWithProviders(ui, { preloadedState = {}, store = setupStore({ ...preloadedState }), ...renderOptions } = {}) {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

