import React, { useState, useEffect, useRef ,useMemo} from 'react';
import { InvoiceCard } from '../components/InvoiceCard';
import '../css/InvoicePanel.css';
import { generateInvoicePDF } from '../utils/pdfGenerator';


export const InvoicePanel = ({ setInvoices, invoices, openInvoiceForm, company, clients }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedClientId, setSelectedClientId] = useState('all');
  const invoiceRef = useRef(null);

  // Filter invoices by selected client id
  const filteredInvoices = useMemo(() => {
    if (selectedClientId === 'all') return invoices;
    return invoices.filter(inv => String(inv.client?.clientId) === selectedClientId);
  }, [selectedClientId, invoices]);

  useEffect(() => {
    if (filteredInvoices && filteredInvoices.length > 0) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(0);
    }
  }, [filteredInvoices]);

  // Navigation handlers
  const prevInvoice = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredInvoices.length - 1 : prev - 1));
  };

  const nextInvoice = () => {
    setCurrentIndex((prev) => (prev === filteredInvoices.length - 1 ? 0 : prev + 1));
  };

  // Delete handler updated for filtered invoices
  const handleDeleteInvoice = () => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette facture ?')) return;

    const idToDelete = filteredInvoices[currentIndex].id;

    fetch(`http://localhost:8080/invoices/${idToDelete}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) throw new Error('Erreur lors de la suppression');
        setInvoices(prevInvoices => prevInvoices.filter(inv => inv.id !== idToDelete));
        setCurrentIndex(0);
      })
      .catch(err => {
        alert(err.message);
      });
  };

  if (!invoices) return null;

  return (
    <div className="invoice-panel">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
        <label htmlFor="client-filter" style={{ marginRight: 10 }}>Filtrer par client:</label>
        <select
          id="client-filter"
          value={selectedClientId}
          onChange={(e) => setSelectedClientId(e.target.value)}
        >
          <option value="all">Tous</option>
          {clients.map(client => (
          <option key={client.clientId} value={client.clientId}>
            {client.name && client.lastName
              ? `${client.name} ${client.lastName}`
              : client.incorporation
            }
          </option>
          ))}
        </select>
      </div>

      <div className="navigation" style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
        <button onClick={prevInvoice}><img src="./left.svg" alt="Clients" className="menu-icon" /></button>
        {(filteredInvoices.length !== 0) && (
          <div style={{ margin: '0 10px' }}>
            Facture {currentIndex + 1} / {filteredInvoices.length}
          </div>
        )}
        <button onClick={nextInvoice}><img src="./right.svg" alt="Clients" className="menu-icon" /></button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <button onClick={() => openInvoiceForm(null)} style={{ marginLeft: 10 }}>
          <img src="./add.svg" alt="Clients" className="menu-icon" />
          Ajouter
        </button>

        {(filteredInvoices.length !== 0) && (
          <>
            <button onClick={() => openInvoiceForm(filteredInvoices[currentIndex])} style={{ marginLeft: 10 }}>
              <img src="./edit.svg" alt="Clients" className="menu-icon" />
              Modifier
            </button>

            <button onClick={() => generateInvoicePDF(filteredInvoices[currentIndex], company)} style={{ marginLeft: 10 }}>
              <img src="./download.svg" alt="Clients" className="menu-icon" />
              Télécharger PDF
            </button>

            <button
              onClick={() => {
                window.open('https://mail01.orange.fr/appsuite/#!&app=fr.in8/mail/compose:compose', '_blank');
              }}
              style={{ marginLeft: 10 }}
            >
              <img src="./mail.svg" alt="Email" className="menu-icon" />
              Envoyer Email
            </button>
          </>
        )}
      </div>

      {(filteredInvoices.length !== 0) && (
        <div className="invoice-display">
          <InvoiceCard
            ref={invoiceRef}
            invoice={filteredInvoices[currentIndex]}
            company={company}
            onDelete={handleDeleteInvoice}
          />
        </div>
      )}
    </div>
  );
};
