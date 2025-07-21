import logo from './logo.svg';
import './App.css';
import {ClientPanel} from './features/ClientsPanel';
import {InvoicePanel}  from './features/InvoicePanel';
import React, { use, useEffect, useState } from 'react';
import { TopMenu } from './features/TopMenu';
function App() {
  const [menu, setMenu] = useState('clients');
  useEffect(() => {
    setMenu('invoices');
  }, []);
  useEffect(() => {
    if (menu === 'clients') {
      document.title = 'Factures DriveMe - Clients';
    } else if (menu === 'invoices') {
      document.title = 'Factures DriveMe - Factures';
    }
  }, [menu]);
  return (
    <div className="App">
      <TopMenu setMenu={setMenu} />
      {menu === 'clients' && <ClientPanel/>}
      {menu === 'invoices' && <InvoicePanel/>}
    </div>
  );
}

export default App;
