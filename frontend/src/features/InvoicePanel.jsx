import React, { useState ,useEffect} from 'react';
import {InvoiceCard} from '../components/InvoiceCard';
import '../css/ClientPanel.css';

export const InvoicePanel = () => {
    const [invoices,setInvoices]=useState([]);
      useEffect(() => {    
        fetch('http://localhost:8080/invoices',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
          .then(response=> response.json())
          .then(data=>setInvoices(data));
      }
      ,[]);
    const [company,setCompany]=useState([]);
      useEffect(() => {    
        fetch('http://localhost:8080/company',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
          .then(response=> response.json())
          .then(data=>setCompany(data));
      }
      ,[]);
    return (
        <div className="client-panel">
            <div className="clients-list">
                {invoices.map(invoice => (   
                    <InvoiceCard key={invoices.id} invoice={invoice} company={company}/>
                ))}
            </div>
        </div>
    )
}