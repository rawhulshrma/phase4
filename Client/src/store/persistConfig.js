import storage from 'redux-persist/lib/storage';

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['owner','auth','product','productCategory','companies','people','customer','admin','employee','branch','customization'] 
  // Added 'branch'
};
