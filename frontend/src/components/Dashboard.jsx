import React, { useState, useEffect } from 'react';

function Dashboard({ onLogout }) {
    const [activeTab, setActiveTab] = useState('contacts');
    const [viewMode, setViewMode] = useState('card');

    const [contacts, setContacts] = useState([
        { id: 1, firstName: 'Sarah', lastName: 'Jenkins', title: 'Senior Developer', emails: [{ type: 'Work', address: 'sarah@work.com' }], phones: [{ type: 'Mobile', number: '555-0192' }] },
        { id: 2, firstName: 'Michael', lastName: 'Chang', title: 'Product Manager', emails: [{ type: 'Personal', address: 'mike@gmail.com' }], phones: [{ type: 'Work', number: '555-8371' }] },
        { id: 3, firstName: 'Elena', lastName: 'Rostova', title: 'UX Architect', emails: [{ type: 'Home', address: 'elena@rostova.io' }], phones: [{ type: 'Home', number: '555-9021' }] }
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 4;

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [toastMessage, setToastMessage] = useState(null);

    const triggerToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const filteredContacts = contacts.filter(c =>
        c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredContacts.length / contactsPerPage) || 1;

    // Fix for CodeRabbit: Clamp currentPage when totalPages shrinks or search changes
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

    const handleCreateContact = (e) => {
        e.preventDefault();
        const newEntry = {
            id: Date.now(),
            firstName,
            lastName,
            title,
            emails: [{ type: 'Work', address: email }],
            phones: [{ type: 'Mobile', number: phone }]
        };
        setContacts([...contacts, newEntry]);
        setShowCreateModal(false);
        setFirstName(''); setLastName(''); setTitle(''); setEmail(''); setPhone('');
        triggerToast('Contact added successfully.');
    };

    const openUpdateModal = (contact) => {
        setSelectedContact(contact);
        setFirstName(contact.firstName);
        setLastName(contact.lastName);
        setTitle(contact.title);
        setEmail(contact.emails[0]?.address || '');
        setPhone(contact.phones[0]?.number || '');
        setShowUpdateModal(true);
    };

    const handleUpdateContact = (e) => {
        e.preventDefault();
        setContacts(contacts.map(c => c.id === selectedContact.id ? {
            ...c, firstName, lastName, title,
            emails: [{ type: 'Work', address: email }],
            phones: [{ type: 'Mobile', number: phone }]
        } : c));
        setShowUpdateModal(false);
        triggerToast('Contact updated successfully.');
    };

    const handleDeleteConfirm = () => {
        setContacts(contacts.filter(c => c.id !== selectedContact.id));
        setShowDeleteModal(false);
        setSelectedContact(null);
        triggerToast('Contact removed.');
    };

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', color: '#1E293B', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', boxSizing: 'border-box' }}>

            {/* Toast Notification */}
            {toastMessage && (
                <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 100, background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '12px 20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>
                    ✓ {toastMessage}
                </div>
            )}

            {/* Sidebar matching light theme */}
            <div style={{ width: '260px', background: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: '28px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', paddingLeft: '8px' }}>
                        <h2 style={{ margin: '0', fontSize: '20px', fontWeight: '700', color: '#2563EB', letterSpacing: '-0.5px' }}>ContactHub</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <button
                            onClick={() => setActiveTab('contacts')}
                            style={{ textAlign: 'left', padding: '10px 14px', borderRadius: '8px', border: 'none', background: activeTab === 'contacts' ? '#EFF6FF' : 'transparent', color: activeTab === 'contacts' ? '#2563EB' : '#64748B', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
                        >
                            Contacts Directory
                        </button>
                        <button
                            onClick={() => setActiveTab('profile')}
                            style={{ textAlign: 'left', padding: '10px 14px', borderRadius: '8px', border: 'none', background: activeTab === 'profile' ? '#EFF6FF' : 'transparent', color: activeTab === 'profile' ? '#2563EB' : '#64748B', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
                        >
                            User Profile
                        </button>
                    </div>
                </div>

                {/* User Profile Quick-Badge at Bottom */}
                <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', background: '#2563EB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', color: '#FFFFFF' }}>
                            AK
                        </div>
                        <div>
                            <p style={{ margin: '0', fontSize: '13px', fontWeight: '600', color: '#0F172A' }}>Areeb Khan</p>
                            <p style={{ margin: '0', fontSize: '11px', color: '#64748B' }}>Online</p>
                        </div>
                    </div>
                    <button onClick={onLogout} title="Sign Out" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: '13px', fontWeight: '600' }}>Logout</button>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

                {/* Top Header Command Bar */}
                <div style={{ height: '72px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>

                    <div style={{ position: 'relative', width: '340px' }}>
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '100%', padding: '9px 14px', borderRadius: '8px', background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', outline: 'none', fontSize: '13px', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            style={{ padding: '9px 18px', background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                        >
                            + Add Contact
                        </button>
                    </div>
                </div>

                {/* Dynamic Workspace Area */}
                <div style={{ flex: '1', padding: '32px', overflowY: 'auto', boxSizing: 'border-box' }}>

                    {activeTab === 'contacts' ? (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <div>
                                    <h1 style={{ margin: '0 0 4px 0', fontSize: '22px', fontWeight: '700', color: '#0F172A' }}>Contacts Directory</h1>
                                    <p style={{ margin: '0', color: '#64748B', fontSize: '13px' }}>Manage your professional and personal network.</p>
                                </div>

                                {/* View Mode Toggle Switch */}
                                <div style={{ display: 'flex', background: '#E2E8F0', padding: '3px', borderRadius: '8px' }}>
                                    <button
                                        onClick={() => setViewMode('card')}
                                        style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', background: viewMode === 'card' ? '#FFFFFF' : 'transparent', color: viewMode === 'card' ? '#0F172A' : '#64748B', fontSize: '12px', fontWeight: '600', cursor: 'pointer', boxShadow: viewMode === 'card' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}
                                    >
                                        Cards
                                    </button>
                                    <button
                                        onClick={() => setViewMode('table')}
                                        style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', background: viewMode === 'table' ? '#FFFFFF' : 'transparent', color: viewMode === 'table' ? '#0F172A' : '#64748B', fontSize: '12px', fontWeight: '600', cursor: 'pointer', boxShadow: viewMode === 'table' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}
                                    >
                                        Table
                                    </button>
                                </div>
                            </div>

                            {viewMode === 'card' ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '28px' }}>
                                    {currentContacts.map(contact => (
                                        <div key={contact.id} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
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
                                                <button onClick={() => openUpdateModal(contact)} style={{ flex: '1', padding: '7px', background: '#F8FAFC', color: '#0F172A', border: '1px solid #CBD5E1', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                                                <button onClick={() => { setSelectedContact(contact); setShowDeleteModal(true); }} style={{ flex: '1', padding: '7px', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', marginBottom: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                                        <thead>
                                        <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B' }}>
                                            <th style={{ padding: '14px 20px' }}>Full Name</th>
                                            <th style={{ padding: '14px 20px' }}>Title</th>
                                            <th style={{ padding: '14px 20px' }}>Email Address</th>
                                            <th style={{ padding: '14px 20px' }}>Phone</th>
                                            <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {currentContacts.map(c => (
                                            <tr key={c.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                                <td style={{ padding: '14px 20px', fontWeight: '600', color: '#0F172A' }}>{c.firstName} {c.lastName}</td>
                                                <td style={{ padding: '14px 20px', color: '#64748B' }}>{c.title}</td>
                                                <td style={{ padding: '14px 20px', color: '#64748B' }}>{c.emails[0]?.address}</td>
                                                <td style={{ padding: '14px 20px', color: '#64748B' }}>{c.phones[0]?.number}</td>
                                                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                                                    <button onClick={() => openUpdateModal(c)} style={{ background: 'transparent', border: 'none', color: '#2563EB', cursor: 'pointer', marginRight: '12px', fontWeight: '600' }}>Edit</button>
                                                    <button onClick={() => { setSelectedContact(c); setShowDeleteModal(true); }} style={{ background: 'transparent', border: 'none', color: '#DC2626', cursor: 'pointer', fontWeight: '600' }}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Pagination Bar */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '12px 20px', borderRadius: '10px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                <span style={{ fontSize: '13px', color: '#64748B' }}>
                  Page {currentPage} of {totalPages}
                </span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        style={{ padding: '6px 14px', background: '#F8FAFC', color: currentPage === 1 ? '#94A3B8' : '#0F172A', border: '1px solid #CBD5E1', borderRadius: '6px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontSize: '12px', fontWeight: '500' }}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        style={{ padding: '6px 14px', background: '#F8FAFC', color: currentPage === totalPages ? '#94A3B8' : '#0F172A', border: '1px solid #CBD5E1', borderRadius: '6px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontSize: '12px', fontWeight: '500' }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>

                        </div>
                    ) : (
                        /* User Profile Screen */
                        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', maxWidth: '900px' }}>

                            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '28px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                                <div style={{ width: '72px', height: '72px', background: '#DBEAFE', color: '#2563EB', borderRadius: '50%', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700' }}>
                                    AK
                                </div>
                                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#0F172A' }}>Areeb Khan</h3>
                                <p style={{ margin: '0 0 20px 0', color: '#64748B', fontSize: '13px' }}>areeb.khan@example.com</p>

                                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-around' }}>
                                    <div>
                                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>{contacts.length}</div>
                                        <div style={{ fontSize: '11px', color: '#64748B' }}>Contacts</div>
                                    </div>
                                    <div style={{ width: '1px', background: '#E2E8F0' }}></div>
                                    <div>
                                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#2563EB' }}>2026</div>
                                        <div style={{ fontSize: '11px', color: '#64748B' }}>Joined</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                                <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#0F172A' }}>Account Information</h2>

                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#64748B', marginBottom: '6px' }}>Display Username</label>
                                    <input type="text" defaultValue="areeb.khan" style={{ width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }} />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#64748B', marginBottom: '6px' }}>Primary Email Address</label>
                                    <input type="email" defaultValue="areeb.khan@example.com" style={{ width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }} />
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>

            {/* Create / Update Modal */}
            {(showCreateModal || showUpdateModal) && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', boxSizing: 'border-box' }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#0F172A', fontWeight: '700' }}>{showCreateModal ? 'Create Contact' : 'Edit Contact'}</h3>
                        <form onSubmit={showCreateModal ? handleCreateContact : handleUpdateContact}>
                            <div style={{ marginBottom: '12px' }}><label style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>First Name</label><input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', boxSizing: 'border-box', marginTop: '4px' }} /></div>
                            <div style={{ marginBottom: '12px' }}><label style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>Last Name</label><input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', boxSizing: 'border-box', marginTop: '4px' }} /></div>
                            <div style={{ marginBottom: '12px' }}><label style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>Title / Role</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', boxSizing: 'border-box', marginTop: '4px' }} /></div>
                            <div style={{ marginBottom: '12px' }}><label style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', boxSizing: 'border-box', marginTop: '4px' }} /></div>
                            <div style={{ marginBottom: '24px' }}><label style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>Phone Number</label><input type="text" value={phone} onChange={e => setPhone(e.target.value)} required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', boxSizing: 'border-box', marginTop: '4px' }} /></div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="submit" style={{ flex: '1', padding: '10px', background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Save Contact</button>
                                <button type="button" onClick={() => { setShowCreateModal(false); setShowUpdateModal(false); }} style={{ flex: '1', padding: '10px', background: '#F1F5F9', color: '#0F172A', border: '1px solid #CBD5E1', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '360px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', boxSizing: 'border-box' }}>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#0F172A', fontWeight: '700' }}>Confirm Deletion</h3>
                        <p style={{ color: '#64748B', fontSize: '13px', marginBottom: '24px' }}>Are you sure you want to delete {selectedContact?.firstName}? This action cannot be undone.</p>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={handleDeleteConfirm} style={{ flex: '1', padding: '10px', background: '#DC2626', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Delete</button>
                            <button onClick={() => setShowDeleteModal(false)} style={{ flex: '1', padding: '10px', background: '#F1F5F9', color: '#0F172A', border: '1px solid #CBD5E1', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Dashboard;