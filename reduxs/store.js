import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import cart from './cart/reducer';
import setting from './setting/reducer';
import loginModal from './login-modal/reducer';
import publicModal from './public-modal/reducer';
import rightModal from './right-modal/reducer';
import product from './product/reducer';
import me from './me/reducer';
import error from './error/reducer';
import notification from './notification/reducer';
import order from './order/reducer';
import {useMemo} from 'react';

let store;

function initStore(preloadedState = {}) {
  return createStore(
    combineReducers({
      cart,
      setting,
      loginModal,
      publicModal,
      rightModal,
      product,
      me,
      error,
      notification,
      order,
    }),
    preloadedState,
    compose(applyMiddleware(thunk)),
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
