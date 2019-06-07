import React from 'react';

import Persons from './persons';

export default function App() {
  return (
    <div className="container">
      <div className="header">
        <h3>
          Invoice Manager
        </h3>
      </div>

      <Persons/>
    </div>
  );
}