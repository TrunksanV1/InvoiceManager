import React, { useState, useEffect } from 'react';
import '../css/ClientForm.css';

export const ClientForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('clientForm');
    return saved ? JSON.parse(saved) : {
      name: '',
      lastName: '',
      incorporation: '',
      email: '',
      adress: '',
      postalCode: '',
      city: ''
    };
  });

  useEffect(() => {
    localStorage.setItem('clientForm', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      lastName: '',
      incorporation: '',
      email: '',
      adress: '',
      postalCode: '',
      city: ''
    });
    localStorage.removeItem('clientForm');
  };

  return (
    <form className="client-form" onSubmit={handleSubmit}>
      <button type="button" className="close-btn" onClick={onClose}>✕</button>
      <h2>Ajouter un client</h2>

      <div>
        <label>Prénom</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Nom</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Nom de l'entreprise</label>
        <input
          type="text"
          name="incorporation"
          value={formData.incorporation}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Adresse</label>
        <input
          type="text"
          name="adress"
          value={formData.adress}
          required
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Code Postal</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          required
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Ville</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          required
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          required
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-btn">Enregistrer</button>
    </form>
  );
};
