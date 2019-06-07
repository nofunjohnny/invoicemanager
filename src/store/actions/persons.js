import Backendless from 'backendless'

import t from '../action-types';

export const loadInvoices = () => ({
  types  : [t.LOAD_INVOICES, t.LOAD_INVOICES_SUCCESS, t.LOAD_INVOICES_FAIL],
  apiCall: () => Backendless.Data.of('Invoice').find(),
});

export const createInvoice = invoice => ({
  types  : [null, t.CREATE_INVOICE_SUCCESS, null],
  apiCall: () => Backendless.Data.of('Invoice').save(invoice),
});

export const updateInvoice = invoice => ({
  types  : [null, t.UPDATE_INVOICE_SUCCESS, null],
  apiCall: () => Backendless.Data.of('Invoice').save(invoice),
});

export const removeInvoice = invoiceId => ({
  invoiceId,
  types  : [null, t.REMOVE_INVOICE_SUCCESS, null],
  apiCall: () => Backendless.Data.of('Invoice').remove(invoiceId),
});

export const onInvoiceCreate = invoice => ({
  invoice,
  type: t.ON_INVOICE_CREATE,
});

export const onInvoiceUpdate = invoice => ({
  invoice,
  type: t.ON_INVOICE_UPDATE,
});

export const onInvoiceRemove = invoice => ({
  invoice,
  type: t.ON_INVOICE_REMOVE,
});
