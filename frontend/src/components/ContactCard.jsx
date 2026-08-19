import React from 'react';

function ContactCard({ contact, onEdit, onDelete }) {
    return (
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <div style={{ width: '40px', height: '40px', background: '#DBEAFE', color: '#2563EB', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '15px' }}>
                        {contact.firstName[0]}{contact.lastName[0]}
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 2px 0', fontSize: '15px', fontWeight: '600', color: '#0F172A' }}>{contact.firstName} {contact.lastName}</h3>
                        <span style={{ fontSize: '11px', background: '#F1F5F9', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontWeight: '500' }}>{contact.title}</span>
                    </div>
                </div>

                <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                        <span>{contact.emails[0]?.address}</span>
                    </div>
                    <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                        <span>{contact.phones[0]?.number}</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => onEdit(contact)} style={{ flex: '1', padding: '7px', background: '#F8FAFC', color: '#0F172A', border: '1px solid #CBD5E1', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                <button onClick={() => onDelete(contact)} style={{ flex: '1', padding: '7px', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
            </div>
        </div>
    );
}

export default ContactCard;