import React from 'react';
import { useState, useEffect } from 'react';
import '../css/TopMenu.css';
export const TopMenu = ({ setMenu }) => {
    return (
        <nav className="top-menu">
            <ul>
                <li onClick={() => setMenu('clients')}>Clients</li>
                <li onClick={() => setMenu('invoices')}>Factures</li>
            </ul>
        </nav>
    );
}