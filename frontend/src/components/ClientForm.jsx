import React, { useState,useEffect } from 'react';
import '../css/ClientForm.css';
export const ClientForm = ({onSubmit}) =>{
    const [FormData, setFormData] = useState(()=>{
        const save = localStorage.getItem('clientForm');
        return save ? JSON.parse(save) : {
            name: '',
            lastName: '',
            incorporation: '',
            email: '',
            adress: '',
            postalCode: '',
            city: ''
        };
    });

    useEffect(()=>{
        localStorage.setItem('clientForm',JSON.stringify(FormData))
    },[FormData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    
    const handleSubmit= (e) => {
        e.preventDefault();
        onSubmit(FormData);
        setFormData({
            name: '',
            lastName: '',
            incorporation: '',
            email: '',
            adress: '',
            postalCode: '',
            city: ''
        });
    }

    return(
    <form className='form' onSubmit={(e) => {
        handleSubmit(e)
    }}>
        <h2>Ajouter un client</h2>
        <div>
            <label className='clientName'>Prénom du client : </label>
            <input
                type="text"
                name='name'
                value={FormData.name}
                onChange={handleChange}
                />
        </div>
        <div>
            <label className='clientLastName'>Nom du client : </label>
            <input
                type="text"
                name='lastName'
                value={FormData.lastName}
                onChange={handleChange}
                />
        </div>
                <div>
            <label className='clientName'>Nom de l'entreprise : </label>
            <input
                type="text"
                name='incorporation'
                value={FormData.incorporation}
                onChange={handleChange}
                />
        </div>

        <div>
        <label className='clientAdress'>Adresse du client : </label>
        <input
            type="text"
            name='adress'
            value={FormData.adress}
            required
            onChange={handleChange}
            />
        </div>

        <div>
            <label className='clientPC'>Code Postal du client : </label>
            <input
                type="text"
                name='postalCode'
                value={FormData.postalCode}
                required
                onChange={handleChange}
                />
        </div>

        <div>
            <label className='clientVille'>Ville du client : </label>
            <input
                type="text"
                name='city'
                value={FormData.city}
                required
                onChange={handleChange}
                />
        </div>

        <div>
            <label className='clientEmail'>Email du client : </label>
            <input
                type="text"
                name='email'
                value={FormData.email}
                required
                onChange={handleChange}
                />
        </div>
        
        <input type="submit" ></input>
        </form>

        
        

    )
} 