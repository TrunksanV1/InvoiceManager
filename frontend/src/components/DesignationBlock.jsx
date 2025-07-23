import React, { useState, useEffect } from 'react';

export const DesignationBlock = ({ index, designation, onChange, onRemove, allCollapse }) => {
  const [collapsed, setCollapsed] = useState(false);
  const formatSummary = () => {
    const date = designation.date
      ? new Date(designation.date).toLocaleDateString('fr-FR')
      : '';
    const amount = designation.amount ? `${designation.amount}€` : '';
    return `${new Date(designation.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })} : ${designation.name || '---'} ${designation.departure} → ${designation.arrival} ${designation.b_f ? "A/R" : ""} ${amount}`;
  };

  useEffect(() => {
    setCollapsed(allCollapse);
  }, [allCollapse]);

  return (
    <div className="designation-block">
      <div className="designation-header">
        <button type="button" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '▼' : '▲'}
        </button>
        {index > 0 && (
          <button type="button" onClick={() => onRemove(index)} className="remove-btn">
            ✕
          </button>
        )}
        {collapsed && <p className="designation-summary">{formatSummary()}</p>}
      </div>

      {!collapsed && (
        <>
          <div>
            <label>Nom</label>
            <input
              type="text"
              name="name"
              value={designation.name}
              onChange={(e) => onChange(index, e)}
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={designation.date}
              onChange={(e) => onChange(index, e)}
            />
          </div>
          <div>
            <label>Départ</label>
            <input
              type="text"
              name="departure"
              value={designation.departure}
              onChange={(e) => onChange(index, e)}
            />
          </div>
          <div>
            <label>Arrivée</label>
            <input
              type="text"
              name="arrival"
              value={designation.arrival}
              onChange={(e) => onChange(index, e)}
            />
          </div>
          <div>
            <label>Montant (€)</label>
            <input
              type="number"
              name="amount"
              value={designation.amount}
              onChange={(e) => onChange(index, e)}
            />
          </div>
          <div className="checkbox-row">
            <input
              type="checkbox"
              name="b_f"
              checked={designation.b_f}
              onChange={(e) => onChange(index, e)}
            />
            <label>A/R</label>
          </div>
        </>
      )}
    </div>
  );
};
