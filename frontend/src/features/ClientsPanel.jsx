import React, { useState ,useEffect} from 'react';
import {ClientCard} from '../components/ClientCard';
import { ClientForm } from '../components/ClientForm';
import '../css/ClientPanel.css';

export const ClientPanel = () => {
    const [clients,setClients]=useState([]);
      useEffect(() => {    
        fetch('http://localhost:8080/clients',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
          .then(response=> response.json())
          .then(data=>setClients(data));
      },[]);

    const handleFormSubmit = (formData) => {
        console.log('Form submitted:', formData);
        fetch('http://localhost:8080/clients', {
            method: 'POST',
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
        .then(data => {
            console.log('Client created successfully:', data);
            // Optionally update state or UI
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
    };



    return (
        <div className="client-panel">
            <div className="clients-list">
                {clients.map(client => (   
                    <ClientCard key={client.id} client={client} />
                ))}
            </div>
            <ClientForm onSubmit={handleFormSubmit} />
        </div>
    )
}