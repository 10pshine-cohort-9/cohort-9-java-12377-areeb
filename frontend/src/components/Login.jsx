import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLoginSuccess();
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh'
        }}>
            <div style={{
                background: '#ffffff',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                width: '100%',
                maxWidth: '380px'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h1 style={{ color: '#2563eb', fontSize: '28px', margin: '0 0 8px 0', fontWeight: '700' }}>ContactHub</h1>
                    <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>Sign in to manage your contacts</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '6px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="name@example.com"
                            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none', fontSize: '14px', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '6px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none', fontSize: '14px', boxSizing: 'border-box' }}
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;