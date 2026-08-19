import React from 'react';

function UserProfile({ contactsCount, onOpenChangePassword }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', maxWidth: '900px' }}>

            {/* Left Profile Card */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '28px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '72px', height: '72px', background: '#DBEAFE', color: '#2563EB', borderRadius: '50%', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700' }}>
                    AK
                </div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#0F172A' }}>Areeb Khan</h3>
                <p style={{ margin: '0 0 20px 0', color: '#64748B', fontSize: '13px' }}>areeb.khan@example.com</p>

                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-around' }}>
                    <div>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>{contactsCount}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>Contacts</div>
                    </div>
                    <div style={{ width: '1px', background: '#E2E8F0' }}></div>
                    <div>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#2563EB' }}>2026</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>Joined</div>
                    </div>
                </div>
            </div>

            {/* Right Account Information Form */}
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

                <button
                    onClick={onOpenChangePassword}
                    style={{ padding: '10px 16px', background: '#F8FAFC', color: '#0F172A', border: '1px solid #CBD5E1', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                    Change Password
                </button>
            </div>

        </div>
    );
}

export default UserProfile;