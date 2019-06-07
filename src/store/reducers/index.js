import { combineReducers } from 'redux'

import invoices from './invoices'

const rootReducer = combineReducers({
  invoices
});

export default rootReducer;

export const getInvoices = state => state.invoices;
