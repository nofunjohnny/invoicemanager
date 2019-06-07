import React from 'react';

import Invoices from './invoices';

export default function App() {
  return (
    <div className="container">
      <div className="header">
        <h3>
          Invoice Manager
        </h3>
      </div>

      <Invoices/>
    </div>
  );
}