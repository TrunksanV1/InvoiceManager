import React from 'react';
import '../css/ClientCard.css';

export const ClientCard = ({ client }) => {
    return (
        <div className="client-card">
            {
            client.name &&
                (
                    <h2 className="invoice-client">{client.name} {client.lastName}</h2>
                ) || (<h2 className="invoice-client"> {client.incorporation}</h2>)
             }

            <p className="client-address">Adresse: {client.adress}, {client.postalCode} {client.city}</p>
            <p className="client-email">Email: {client.email}</p>
        </div>
    );
}