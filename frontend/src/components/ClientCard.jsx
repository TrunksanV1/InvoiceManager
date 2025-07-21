import React from 'react';
import '../css/ClientCard.css';

export const ClientCard = ({ client }) => {
    return (
        <div className="client-card">
            <h2 className="client-name">{client.name} {client.lastName}</h2>
            <p className="client-company">Entreprise: {client.incorporation}</p>
            <p className="client-address">Adresse: {client.adress}, {client.postalCode} {client.city}</p>
            <p className="client-email">Email: {client.email}</p>
            <p className="client-id">ID: {client.client_id}</p>
        </div>
    );
}