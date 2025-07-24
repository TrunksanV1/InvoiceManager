import React from 'react';
import '../css/ClientCard.css';

export const ClientCard = ({ client ,onDelete,openInvoiceForm}) => {

    
        const initialInvoiceFormState = {
        id: null,
        client: client,
        date: '',
        status: '',
        tva: false,
        tva_rate: 10,
        greeting: '',
        object: '',
        designations: [],
        };

    return (
        <div className="client-card">
            <button type="button" onClick={() => onDelete(client)} className="remove-btn">
                ✕
            </button>
            <button onClick={()=>{openInvoiceForm(initialInvoiceFormState)}} style={{ marginLeft: 10 }}>
                <img src="./add.svg" alt="Ajouter" className="menu-icon" />
                <img src="./bill.png" alt="Facture" className="menu-icon" />
            </button>
            {
            (client.name &&
                (
                    <h2 className="invoice-client">{client.name} {client.lastName}</h2>)
                ) || (<h2 className="invoice-client"> {client.incorporation}</h2>)
             }

            <p className="client-address">Adresse: {client.adress}, {client.postalCode} {client.city}</p>
            <p className="client-email">Email: {client.email}</p>
        </div>
    );
}