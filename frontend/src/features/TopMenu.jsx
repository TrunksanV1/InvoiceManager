import React from 'react';
import '../css/TopMenu.css';

export const TopMenu = ({ setMenu, company }) => {
  return (
    <nav className="top-menu">
      <div className="menu-left">
        <img src="./logo.png" alt="Clients" className="menu-logo" />

      </div>
        <ul>
          <li onClick={() => setMenu('clients')}>
            <img src="./handshake.png" alt="Clients" className="menu-icon" />
            Clients
          </li>
          <li onClick={() => setMenu('invoices')}>
            <img src="./bill.png" alt="Factures" className="menu-icon" />
            Factures
          </li>
        </ul>
      <div className="company-info">
        <div><strong>{company.name}</strong></div>
        <div>SIRET: {company.siret}</div>
        <div>{company.adress}, {company.postalCode} {company.city}</div>
        <div>Tél: {company.phone}</div>
        <div>Email: {company.email}</div>
      </div>
    </nav>
  );
};
