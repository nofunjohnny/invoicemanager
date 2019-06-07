export default mirrorKeys({
  LOAD_INVOICES        : null,
  LOAD_INVOICES_SUCCESS: null,
  LOAD_INVOICES_FAIL   : null,

  CREATE_INVOICE_SUCCESS: null,
  UPDATE_INVOICE_SUCCESS: null,
  REMOVE_INVOICE_SUCCESS: null,

  ON_INVOICE_CREATE: null,
  ON_INVOICE_UPDATE: null,
  ON_INVOICE_REMOVE: null,
});

function mirrorKeys(obj) {
  const mirroredObject = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      mirroredObject[key] = key
    }
  }

  return mirroredObject
}
