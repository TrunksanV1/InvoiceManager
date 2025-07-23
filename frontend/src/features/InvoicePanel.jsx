import React, { useState, useEffect, useRef } from 'react';
import { InvoiceCard } from '../components/InvoiceCard';
import InvoiceForm from '../components/InvoiceForm';
import '../css/InvoicePanel.css';
import { generateInvoicePDF } from '../utils/pdfGenerator';


export const InvoicePanel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clients, setClients] = useState([]);
  const [company, setCompany] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);
  const invoiceRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8080/invoices', { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        setInvoices(data);
        setCurrentIndex(data.length - 1);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/company', { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' })
      .then(response => response.json())
      .then(data => setCompany(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/clients', { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' })
      .then(response => response.json())
      .then(data => setClients(data));
  }, []);

  const prevInvoice = () => {
    setCurrentIndex((prev) => (prev === 0 ? invoices.length - 1 : prev - 1));
  };

  const nextInvoice = () => {
    setCurrentIndex((prev) => (prev === invoices.length - 1 ? 0 : prev + 1));
  };

  const handleEdit = () => {
    setEditInvoice(invoices[currentIndex]);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditInvoice(null);
    setShowForm(true);
  };

    const handleDeleteInvoice = () => {
      if (!window.confirm('Voulez-vous vraiment supprimer cette facture ?')) return;

      const idToDelete = invoices[currentIndex].id;

      fetch(`http://localhost:8080/invoices/${idToDelete}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
        .then(response => {
          if (!response.ok) throw new Error('Erreur lors de la suppression');   
          setInvoices(prevInvoices => prevInvoices.filter(inv => inv.id !== idToDelete));
          setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
        })
        .catch(err => {
          alert(err.message);
        });
    };

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
              // Update the invoice in your state array
              setInvoices(prevInvoices =>
                prevInvoices.map(inv => (inv.id === updatedInvoice.id ? updatedInvoice : inv))
              );
            } else {
              // Add new invoice to state
              setInvoices(prevInvoices => [...prevInvoices, updatedInvoice]);
              setCurrentIndex(invoices.length); // set to last (new) invoice
            }

            setShowForm(false);
          })
          .catch(error => {
            console.error('Error submitting form:', error);
          });
    };



  if (invoices.length === 0) return <div>Aucune facture disponible</div>;

  return (
    <div className="invoice-panel">
      <div className="navigation" style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
        <button onClick={prevInvoice}>&lt;</button>
        <div style={{ margin: '0 10px' }}>Facture {currentIndex + 1} / {invoices.length}</div>
        <button onClick={nextInvoice}>&gt;</button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 10 }}>
      <button onClick={() => generateInvoicePDF(invoices[currentIndex], company)}>
        Télécharger PDF 
      </button>
        <button onClick={handleAdd} style={{ marginLeft: 10 }}>Ajouter</button>
        <button onClick={handleEdit} style={{ marginLeft: 10 }}>Modifier</button>
      </div>

      <div className="invoice-display" >
        <InvoiceCard ref={invoiceRef} invoice={invoices[currentIndex]} company={company} onDelete={handleDeleteInvoice}/>
      </div>

      {showForm && (
        <InvoiceForm clients={clients} invoice={editInvoice} onClose={() => setShowForm(false)} onSubmit={handleFormSubmit} />
      )}
    </div>
  );
};
