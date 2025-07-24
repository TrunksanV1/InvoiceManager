import React, { useState } from 'react';
import { ClientCard } from '../components/ClientCard';
import { ClientForm } from '../components/ClientForm';
import '../css/ClientPanel.css';

export const ClientPanel = ({ clients ,setClients, openInvoiceForm }) => {
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (formData) => {
    fetch('http://localhost:8080/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log('Client created successfully:', data);
        setClients(prev => [...prev, data]); // Add to list
        setShowForm(false); // Hide form
      })
      .catch(error => console.error('Error submitting form:', error));
  };

  const handleDeleteClient = (client) => {
  if (!window.confirm('Voulez-vous vraiment supprimer ce client ?')) return;

  const idToDelete = client.clientId;
console.log(client)
  fetch(`http://localhost:8080/clients/${idToDelete}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
    .then(response => {
      if (!response.ok) throw new Error('Erreur lors de la suppression');
      setClients(prevClients => prevClients.filter(cli => cli.clientId !== idToDelete));
    })
    .catch(err => {
      alert(err.message);
    });
};

  return (
    <div className="client-panel">
      <button className="add-client-btn" onClick={() => setShowForm(true)}>
        <img src="./add_client.svg" alt="Clients" className="menu-icon" />
        Ajouter un client
      </button>

      <div className="clients-list">
        {clients.map(client => (
          <ClientCard key={client.clientId} client={client} onDelete={handleDeleteClient} openInvoiceForm={openInvoiceForm}  />
        ))}
      </div>

      {showForm && (
        <ClientForm
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};
