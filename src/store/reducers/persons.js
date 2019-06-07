import t from '../action-types'
import { reduceReducers, loadReducer, reducersMap } from './helpers'

const initialState = {
  list: []
};

const invoicesReducer = reduceReducers(initialState,
  loadReducer(t.LOAD_INVOICES, (state, action) => ({
    ...state,
    list: action.result
  })),

  reducersMap({
    [t.CREATE_INVOICE_SUCCESS]: (state, action) => addInvoice(state, action.result),
    [t.UPDATE_INVOICE_SUCCESS]: (state, action) => updateInvoice(state, action.result),
    [t.REMOVE_INVOICE_SUCCESS]: (state, action) => deleteInvoice(state, action.invoiceId),

    [t.ON_INVOICE_CREATE]: (state, action) => addInvoice(state, action.invoice),
    [t.ON_INVOICE_UPDATE]: (state, action) => updateInvoice(state, action.invoice),
    [t.ON_INVOICE_REMOVE]: (state, action) => deleteInvoice(state, action.invoice.objectId)
  })
);

function addInvoice(state, invoice) {
  if (state.list.find(p => p.objectId === invoice.objectId)) {
    return state
  }

  return {
    ...state,
    list: state.list.concat(invoice)
  }
}

function updateInvoice(state, invoice) {
  return {
    ...state,
    list: state.list.map(p => p.objectId === invoice.objectId ? invoice : p)
  }
}

function deleteInvoice(state, invoiceId) {
  return {
    ...state,
    list: state.list.filter(invoice => invoice.objectId !== invoiceId)
  }
}

export default invoicesReducer