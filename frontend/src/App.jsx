
import './App.css';
import {ClientPanel} from './features/ClientsPanel';
import {InvoicePanel}  from './features/InvoicePanel';
import React, { useEffect, useState } from 'react';
import { TopMenu } from './features/TopMenu';
import InvoiceForm  from './components/InvoiceForm'

const initialInvoiceFormState = {
  id: null,
  clientId: '',
  date: '',
  status: '',
  tva: false,
  tva_rate: 10,
  greeting: '',
  object: '',
  designations: [],
};

function App() {
  const [invoiceForm, setInvoiceForm] = useState(initialInvoiceFormState);
  const [showForm, setShowForm] = useState(false);
  const [menu, setMenu] = useState('clients');
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/company', { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' })
      .then(response => response.json())
      .then(data => setCompany(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/clients')
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/invoices')
      .then(res => res.json())
      .then(data => setInvoices(data))
      .catch(console.error);
  }, []);

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

 const handleFormSubmit = (formData) => {
        const isEdit = !!formData.id; // If there's an id, it's an edit

        const url = isEdit
          ? `http://localhost:8080/invoices/${formData.id}`
          : 'http://localhost:8080/invoices';

        const method = isEdit ? 'PUT' : 'POST';

        fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(updatedInvoice => {
            console.log(isEdit ? 'Invoice updated:' : 'Invoice created:', updatedInvoice);

            if (isEdit) {
              setInvoices(prevInvoices =>
                prevInvoices.map(inv => (inv.id === updatedInvoice.id ? updatedInvoice : inv))
              );
            } else {
              setInvoices(prevInvoices => [...prevInvoices, updatedInvoice]);
            }

            setShowForm(false);
            setMenu('invoices');
          })
          .catch(error => {
            console.error('Error submitting form:', error);
          });
    };

    

   const openInvoiceForm = (invoice = null) => {
      setInvoiceForm(invoice);
      setShowForm(true);
    };

  return (
    <div className="App">
      <TopMenu setMenu={setMenu} company={company}/>
      {menu === 'clients' && <ClientPanel setClients={setClients} clients={clients} openInvoiceForm={openInvoiceForm} setMenu={setMenu}/>}
      {menu === 'invoices' && <InvoicePanel setInvoices={setInvoices} invoices={invoices} openInvoiceForm={openInvoiceForm} company={company} clients={clients} />}
      {showForm && (
        <InvoiceForm clients={clients} invoice={invoiceForm} onClose={() => setShowForm(false)} onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default App;
