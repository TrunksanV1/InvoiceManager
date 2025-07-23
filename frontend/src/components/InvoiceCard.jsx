import React , { forwardRef } from 'react';

import '../css/InvoicePDF.css';

const roundToTenth = (value) => {
  return (Math.round(value * 10) / 10).toFixed(2);
};


export const InvoiceCard = forwardRef(({ invoice, company, onDelete }, ref) => {
    let client = invoice.client;
    const totalTTC = invoice.designations.reduce((sum, d) => sum + d.amount, 0);
    const totalHT = invoice.tva ? roundToTenth(totalTTC / (1 + invoice.tva_rate / 100)) : totalTTC;
    const TVA =  invoice.tva ? roundToTenth(totalTTC - totalHT) : 0.0;
    console.log(invoice)
    return (
        <div className="invoice-card" ref={ref}>
            <button type="button" onClick={onDelete} className="remove-btn">
                ✕
            </button>
            <h1 className='invoice-id'>Facture n°{invoice.id}</h1>

            <div className="Bossman">
                <h2 className="nomBossman">{company.name} </h2>
                <p className="adressBossman">{company.adress}</p>
                <p className="codepostalBossman">{company.postalCode} {company.city}</p>
                <h2 className="siretBossman">SIRET :{company.siret}</h2>
                <p className="emailBossman">{company.email}</p>
                <p className="phoneBossman">{company.phone}</p>
            </div>

            <div className='client'>
            {
            client.name &&
                (
                    <h2 className="invoice-client">{client.name} {client.lastName}</h2>
                ) || (<h2 className="invoice-client"> {client.incorporation}</h2>)
             }

            <p className="invoice-address"> {client.adress}, {client.postalCode} {client.city}</p>
            <p className="invoice-email"> {client.email}</p>
            </div>

            <div className='invoiceDetails'>
                <p className='invoiceDate'>Date : {new Date(invoice.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit',year : 'numeric'})}</p>
                <p className='invoiceObjet'>Objet : {invoice.object}</p>
            </div>

           <div className='invoiceDesignation'>
            <table>
                <thead>
                <tr>
                    <th>Désignation</th>
                    <th>Quantité</th>
                    <th>Prix unitaire HT</th>
                    <th>Total HT</th>
                </tr>
                </thead>
                <tbody>
                <tr >
                    <td>
                        {invoice.designations.map((designation, index) => (
                            <p  key={index}>
                                {new Date(designation.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })} : {designation.name} {designation.departure} → {designation.arrival} {designation.b_f === "true" ? "A/R " : ""} {designation.amount}€
                            </p>
                        ))}
                    </td>
                    <td rowSpan={invoice.designations.size}>1</td>
                    <td rowSpan={invoice.designations.size}>{totalHT}€</td>
                    <td rowSpan={invoice.designations.size}>{totalHT}€</td>
                </tr>

                <tr>
                    <td style={{ border:"none", borderTop: "1px solid black" }}></td>
                    <td colSpan={2}>Montant total HT</td>
                    <td>{totalHT}€</td>
                </tr>
                {(invoice.tva && (
                    <tr>
                        <td style = {{border:"none"}}></td>
                        <td colSpan={2}>T.V.A {invoice.tva_rate}%</td>
                        <td>{TVA}€</td>
                    </tr>)
                    ||
                    (<tr>
                        <td style = {{border:"none"}}></td>
                        <td colSpan={2}>T.V.A non applicable, art. 293 B du CGI </td>
                        <td>/</td>
                    </tr>)
                )
                }
                <tr>
                    <td style = {{border:"none"}}></td>
                    <td colSpan={2}>Total à payer</td>
                    <td>{totalTTC}€</td>
                </tr>
                </tbody>
            </table>

            </div>

            <h2 style={{ whiteSpace:"pre-line" }}>{invoice.greeting}</h2>
            
        </div>
    );
})