import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { createInvoice, updateInvoice } from '../store';

class InvoiceEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      invoice     : props.invoice || {},
      saving     : false,
      serverError: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const prevInvoice = this.props.invoice || {};
    const nextInvoice = nextProps.invoice || {};

    if (prevInvoice.objectId !== nextInvoice.objectId) {
      this.setState({ invoice: nextInvoice })
    }
  }

  close = () => {
    this.setState({
      invoice     : {},
      saving     : false,
      serverError: null
    });

    this.props.onHide()
  };

  prepareInvoice() {
    const { invoice } = this.state;

    return {
      ...invoice,
      customer: (invoice.customer || '').trim() || null,
      account: (invoice.account || '').trim() || null,
      quantity: (invoice.quantity || '').trim() || null,
      product: (invoice.product || '').trim() || null,
      salestotal: (invoice.salestotal || '').trim() || null,
    }
  }

  save = () => {
    const invoice = this.prepareInvoice();

    const action = this.props.invoice
      ? this.props.updateInvoice
      : this.props.createInvoice;

    action(invoice)
      .then(() => this.close())
      .catch(e => this.setState({ serverError: e.message }));
  };

  onCustomerChange = e => this.setState({ invoice: { ...this.state.invoice, customer: e.target.value } });
  onAccountChange = e => this.setState({ invoice: { ...this.state.invoice, account: e.target.value } });
  onQuantityChange = e => this.setState({ invoice: { ...this.state.invoice, quantity: e.target.value } });
  onProductChange = e => this.setState({ invoice: { ...this.state.invoice, product: e.target.value } });
  onaSalestotalChange = e => this.setState({ invoice: { ...this.state.invoice, salestotal: e.target.value } });

  render() {
    const { show } = this.props;
    const { invoice, serverError, saving } = this.state;

    const isNew = !this.props.invoice;

    return (
      <Modal show={show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isNew ? 'Add' : 'Edit'} Invoice
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Customer:</label>
              <input
                className="form-control"
                placeholder="Add Customer Name"
                value={invoice.customer || ''}
                onChange={this.onCustomerChange}
              />
            </div>

            <div className="form-group">
              <label>Account:</label>
              <input
                className="form-control"
                placeholder="JZ or BZ"
                value={invoice.account || ''}
                onChange={this.onAccountChange}
              />
            </div>

            <div className="form-group">
              <label>Quantity:</label>
              <input
                className="form-control"
                placeholder="Add Quantity"
                value={invoice.quantity || ''}
                onChange={this.onQuantityChange}
              />
            </div>

            <div className="form-group">
              <label>Product:</label>
              <input
                className="form-control"
                placeholder="Add Product"
                value={invoice.product || ''}
                onChange={this.onProductChange}
              />
            </div>

            <div className="form-group">
              <label>Sales Total:</label>
              <input
                className="form-control"
                placeholder="Sales Total"
                value={invoice.salestotal || ''}
                onChange={this.onaSalestotalChange}
              />
            </div>

            {serverError && (
              <Alert variant="danger">
                {serverError}
              </Alert>
            )}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.close}>
            Close
          </Button>
          <Button variant="primary" onClick={this.save} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(null, { createInvoice, updateInvoice })(InvoiceEditor);
