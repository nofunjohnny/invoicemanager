import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Backendless from 'backendless';

import { loadInvoices, getInvoices, onInvoiceCreate, onInvoiceUpdate, onInvoiceRemove } from '../store';

import Editor from './editor';
import DeleteConfirmation from './delete-confirmation';

const mapStateToProps = state => {
  const { loading, loaded, error, list: invoices } = getInvoices(state);

  return {
    loading,
    loaded,
    error,
    invoices
  }
};

class Invoices extends Component {

  state = {
    showEditor : false,
    editorProps: null,

    showDeleteConfirmation : false,
    deleteConfirmationProps: null,
  };

  showEditor = invoice => this.setState({ showEditor: true, editorProps: { invoice } });
  hideEditor = () => this.setState({ showEditor: false, editorProps: null });

  showDeleteConfirmation = invoice => this.setState({ showDeleteConfirmation : true, deleteConfirmationProps: { invoice } });
  hideDeleteConfirmation = () => this.setState({ showDeleteConfirmation: false, deleteConfirmationProps: null });

  componentWillMount(){
    this.props.loadInvoices();

    this.invoiceRT = Backendless.Data.of('Invoice').rt();

    this.invoiceRT.addCreateListener(this.props.onInvoiceCreate);
    this.invoiceRT.addUpdateListener(this.props.onInvoiceUpdate);
    this.invoiceRT.addDeleteListener(this.props.onInvoiceRemove);
  }

  componentWillUnmount(){
    this.invoiceRT.removeCreateListener(this.props.onInvoiceCreate);
    this.invoiceRT.removeUpdateListener(this.props.onInvoiceUpdate);
    this.invoiceRT.removeDeleteListener(this.props.onInvoiceRemove);
  }

  onAddClick = () => this.showEditor(null);
  onEditClick = invoice => this.showEditor(invoice);
  onDeleteClick = invoice => this.showDeleteConfirmation(invoice);

  renderInvoice = invoice => {
    return (
      <li key={invoice.objectId} className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <div>{invoice.name}</div>
          <div className="text-muted small">{invoice.address}</div>
        </div>

        <ButtonGroup>
          <Button size="sm" variant="outline-primary" onClick={() => this.onEditClick(invoice)}>Edit</Button>
          <Button size="sm" variant="outline-danger" onClick={() => this.onDeleteClick(invoice)}>Delete</Button>
        </ButtonGroup>
      </li>
    );
  };

  render() {
    const { loading, error, invoices } = this.props;
    const { showEditor, editorProps, showDeleteConfirmation, deleteConfirmationProps } = this.state;

    if (loading) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    if (error) {
      return (
        <div className="alert alert-danger">
          Error: {error}
        </div>
      )
    }

    return (
      <div>
        <div className="mb-2">
          <Button onClick={this.onAddClick}>New Invoice</Button>
          <Editor {...editorProps} show={showEditor} onHide={this.hideEditor}/>
        </div>

        <ul className="list-group">
          {invoices.map(this.renderInvoice)}
        </ul>

        <DeleteConfirmation
          {...deleteConfirmationProps}
          show={showDeleteConfirmation}
          onHide={this.hideDeleteConfirmation}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, { loadInvoices, onInvoiceCreate, onInvoiceUpdate, onInvoiceRemove })(Invoices);
