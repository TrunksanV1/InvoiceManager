import React, { useState,useEffect } from 'react';
import '../css/InvoiceForm.css';
import { DesignationBlock } from './DesignationBlock';

const roundToTenth = (value) => Math.round(value * 10) / 10;

export default function InvoiceForm({ clients, onSubmit, onClose, invoice = null }) {
  const [formData, setFormData] = useState(null);
  const [allCollapsed, setAllCollapsed] = useState(false);
  useEffect(() => {
    if (invoice) {
      // CASE 1: Full invoice (edit/view)
      if (invoice.id !== null && invoice.designations) {
        const safeInvoiceDate = invoice.date
          ? new Date(invoice.date).toISOString().split('T')[0]
          : '';

        setFormData({
          ...invoice,
          id: invoice.id,
          clientId: invoice.client?.clientId?.toString() || '',
          date: safeInvoiceDate,
          object: invoice.object || '',
          designations: invoice.designations.map((d) => ({
            ...d,
            date: d.date ? new Date(d.date).toISOString().split('T')[0] : '',
            amount: d.amount?.toString() || '',
            collapsed: false,
          })),
        });

      // CASE 2: New invoice initialized from client (no id, no designations)
      } else if (invoice.client) {
        setFormData({
          clientId: invoice.client.clientId?.toString() || '',
          date: new Date(Date.now()).toISOString().split('T')[0],
          object: '',
          status: 'Aucun',
          tva: false,
          tva_rate: 10,
          greeting: 'Merci pour votre confiance\nCordialement.',
          designations: [
            {
              date: '',
              name: '',
              departure: '',
              arrival: '',
              b_f: false,
              amount: '',
              collapsed: false,
            },
          ],
        });
      }

    } else {
      // CASE 3: Completely blank new invoice
      setFormData({
        clientId: '',
        date: new Date(Date.now()).toISOString().split('T')[0],
        object: '',
        status: 'Aucun',
        tva: false,
        tva_rate: 10,
        greeting: 'Merci pour votre confiance\nCordialement.',
        designations: [
          {
            date: '',
            name: '',
            departure: '',
            arrival: '',
            b_f: false,
            amount: '',
            collapsed: false,
          },
        ],
      });
    }
  }, [invoice]);



    
    const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,  
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDesignationChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedDesignations = [...formData.designations];
    updatedDesignations[index][name] = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, designations: updatedDesignations });
  };

  const addDesignation = () => {
    setFormData({
      ...formData,
      designations: [
        ...formData.designations,
        { date: '', departure: '', arrival: '', b_f: false, amount: '' },
      ],
    });
  };

  const removeDesignation = (index) => {
    const updatedDesignations = [...formData.designations];
    updatedDesignations.splice(index, 1);
    setFormData({ ...formData, designations: updatedDesignations });
  };

  const toggleAllCollapsed = () => {
    setAllCollapsed(prev => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      clientId: parseInt(formData.clientId, 10),
      designations: formData.designations.map((d) => ({
        ...d,
        amount: parseFloat(d.amount),
      })),
    };
    onSubmit(payload);
  };
    if (!formData) return null;
  const totalTTC = formData.designations.reduce((sum, d) => {
    const amount = parseFloat(d.amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const totalHT = formData.tva
    ? roundToTenth(totalTTC / (1 + formData.tva_rate / 100))
    : totalTTC;

  const TVA = formData.tva ? roundToTenth(totalTTC - totalHT) : 0.0;

  return (
    <form onSubmit={handleSubmit} className="invoice-form">
      <button type="button" className="close-btn" onClick={onClose}>
        ✕
      </button>
      <h2>
        {invoice && invoice.id !== null && invoice.designations
          ? 'Modifier la facture'
          : 'Créer une facture'}
      </h2>


      <div>
        <label>Client</label>
        <select
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez un client</option>
          {clients.map((client) => (
            <option key={client.clientId} value={client.clientId}>
              {client.name ? client.name+" "+ client.lastName : client.incorporation}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Intitulé</label>
        <input
          type="text"
          name="object"
          value={formData.object}
          onChange={handleChange}
          placeholder="Ex: Prestations de services"
          required
        />
      </div>

      <div className="checkbox-row">
        <input
          type="checkbox"
          name="tva"
          checked={formData.tva}
          onChange={handleChange}
        />
        <label>TVA applicable ({formData.tva_rate}%)</label>
      </div>

      <div>
        <label>Message de remerciement</label>
        <textarea
            name="greeting"
            value={formData.greeting}
            onChange={handleChange}
            rows={4}
        />
        </div>

      <div>
        <h3>Désignations</h3>
        <button
          type="button"
          onClick={addDesignation}
          className="add-btn"
        >
          Ajouter une désignation
        </button>
        <button type="button" onClick={toggleAllCollapsed} className="collapse-all-btn">
          {allCollapsed ? (
            <>
              <img src="./expand.svg" alt="Tout déplier" className="menu-icon" /> Tout déplier 
            </>
          ) : (
            <>
              <img src="./collapse.svg" alt="Tout replier" className="menu-icon" /> Tout replier
            </>
          )}
        </button>


        <div className='designation-list'>
        {formData.designations.map((designation, index) => (
          <DesignationBlock
            key={index}
            index={index}
            designation={designation}
            allCollapse={allCollapsed}          // pass collapsed state
            onChange={handleDesignationChange}
            onRemove={removeDesignation}
          />
        ))}
        </div>
      </div>
      {invoice && <input type="hidden" name="id" value={invoice.id} />}

      <div className="totals-summary">
        <p><strong>Total HT :</strong> {totalHT.toFixed(2)} €</p>
        <p><strong>TVA {formData.tva ? "("+formData.tva_rate+"%)" : "non applicable"}, :</strong> {TVA.toFixed(2)} €</p>
        <p><strong>Total TTC :</strong> {totalTTC.toFixed(2)} €</p>
      </div>
      <button type="submit">Enregistrer la facture</button>
    </form>
  );
}
