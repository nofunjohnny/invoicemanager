import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Backendless from "backendless";

import {
  loadInvoices,
  getInvoices,
  onInvoiceCreate,
  onInvoiceUpdate,
  onInvoiceRemove
} from "../store";

import Editor from "./editor";
import DeleteConfirmation from "./delete-confirmation";

const mapStateToProps = state => {
  const { loading, loaded, error, list: invoices } = getInvoices(state);

  return {
    loading,
    loaded,
    error,
    invoices
  };
};

class Invoices extends Component {
  state = {
    showEditor: false,
    editorProps: null,

    showDeleteConfirmation: false,
    deleteConfirmationProps: null
  };

  showEditor = invoice =>
    this.setState({ showEditor: true, editorProps: { invoice } });
  hideEditor = () => this.setState({ showEditor: false, editorProps: null });

  showDeleteConfirmation = invoice =>
    this.setState({
      showDeleteConfirmation: true,
      deleteConfirmationProps: { invoice }
    });
  hideDeleteConfirmation = () =>
    this.setState({
      showDeleteConfirmation: false,
      deleteConfirmationProps: null
    });

  componentWillMount() {
    this.props.loadInvoices();

    this.invoiceRT = Backendless.Data.of("Invoice").rt();

    this.invoiceRT.addCreateListener(this.props.onInvoiceCreate);
    this.invoiceRT.addUpdateListener(this.props.onInvoiceUpdate);
    this.invoiceRT.addDeleteListener(this.props.onInvoiceRemove);
  }

  componentWillUnmount() {
    this.invoiceRT.removeCreateListener(this.props.onInvoiceCreate);
    this.invoiceRT.removeUpdateListener(this.props.onInvoiceUpdate);
    this.invoiceRT.removeDeleteListener(this.props.onInvoiceRemove);
  }

  onAddClick = () => this.showEditor(null);
  onEditClick = invoice => this.showEditor(invoice);
  onDeleteClick = invoice => this.showDeleteConfirmation(invoice);

  renderInvoice = invoice => {
    return (
      <div>
        <div className="container">
          <table class="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Account</th>
                <th scope="col">Customer</th>
                <th scope="col">Quantity</th>
                <th scope="col">Product</th>
                <th scope="col">Total</th>
                <th scope="col">Edit-Delete</th>

              </tr>
            </thead>
            <tbody>
            <br/>
              <tr>
                <td scope="col">{invoice.account}</td>
                <td scope="col">{invoice.customer}</td>
                <td scope="col">{invoice.quantity}</td>
                <td scope="col">{invoice.product}</td>
                <td scope="col">{invoice.salestotal}</td>
                <td><ButtonGroup>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => this.onEditClick(invoice)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => this.onDeleteClick(invoice)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  render() {
    const { loading, error, invoices } = this.props;
    const {
      showEditor,
      editorProps,
      showDeleteConfirmation,
      deleteConfirmationProps
    } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div className="alert alert-danger">Error: {error}</div>;
    }

    return (
      <div>
        <div className="mb-2">
          <Button onClick={this.onAddClick}>New Invoice</Button>
          <Editor {...editorProps} show={showEditor} onHide={this.hideEditor} />
        </div>

        <ul className="list-group">{invoices.map(this.renderInvoice)}</ul>

        <DeleteConfirmation
          {...deleteConfirmationProps}
          show={showDeleteConfirmation}
          onHide={this.hideDeleteConfirmation}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { loadInvoices, onInvoiceCreate, onInvoiceUpdate, onInvoiceRemove }
)(Invoices);
