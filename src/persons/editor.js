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
      name   : (invoice.name || '').trim() || null,
      address: (invoice.address || '').trim() || null,
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

  onNameChange = e => this.setState({ invoice: { ...this.state.invoice, name: e.target.value } });
  onAddressChange = e => this.setState({ invoice: { ...this.state.invoice, address: e.target.value } });

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
              <label>Name:</label>
              <input
                className="form-control"
                placeholder="Input name"
                value={invoice.name || ''}
                onChange={this.onNameChange}
              />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <input
                className="form-control"
                placeholder="Input address"
                value={invoice.address || ''}
                onChange={this.onAddressChange}
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
