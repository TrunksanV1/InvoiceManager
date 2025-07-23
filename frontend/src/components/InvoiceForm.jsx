import React, { useState,useEffect } from 'react';
import '../css/InvoiceForm.css';
import { DesignationBlock } from './DesignationBlock';

const roundToTenth = (value) => Math.round(value * 10) / 10;

export default function InvoiceForm({ clients, onSubmit, onClose, invoice = null }) {
  const [formData, setFormData] = useState(null);
  const [allCollapsed, setAllCollapsed] = useState(false);

  useEffect(() => {
    if (invoice) {
      setFormData({
        ...invoice,
        id:invoice.id,
        clientId: invoice.client.client_id?.toString() || '',
        date: new Date(invoice.date).toISOString().split('T')[0],
        object: invoice.object || '',           // <-- Add this line
        designations: invoice.designations.map((d) => ({
          ...d,
          date : new Date(d.date).toISOString().split('T')[0],
          amount: d.amount?.toString() || '',
          collapsed: false,
        })),
      });
    } else {
      setFormData({
        clientId: '',
        date: '',
        object: '',                          // <-- Add this line for new invoices
        status: 'Aucun',
        tva: false,
        tva_rate: 10,
        greeting: 'Merci pour votre confiance\nCordialement.',
        designations: [
          { date: '', name: '', departure: '', arrival: '', b_f: false, amount: '', collapsed: false },
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
      <h2>{invoice ? 'Modifier la facture' : 'Créer une facture'}</h2>

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
            <option key={client.client_id} value={client.client_id}>
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
          {allCollapsed ? 'Tout déplier' : 'Tout replier'}
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
