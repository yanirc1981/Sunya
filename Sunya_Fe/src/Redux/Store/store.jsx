import { createStore, applyMiddleware, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from '../Reducer/reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Seleccionar la función compose adecuada para habilitar Redux DevTools Extension
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Crear el store de Redux
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Configurar persistor para guardar el estado persistente
export const persistor = persistStore(store);
