// src/services/api.js

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

// --- Auth API ---
export const loginApi = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Invalid email or password.');
    }

    return await response.json();
};

// --- Contacts API ---
export const fetchContactsApi = async () => {
    const response = await fetch(`${BASE_URL}/contacts`, {
        method: 'GET',
        headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return await response.json();
};

export const createContactApi = async (contactData) => {
    const response = await fetch(`${BASE_URL}/contacts`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(contactData)
    });
    if (!response.ok) throw new Error('Failed to create contact');
    return await response.json();
};

export const updateContactApi = async (id, contactData) => {
    const response = await fetch(`${BASE_URL}/contacts/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(contactData)
    });
    if (!response.ok) throw new Error('Failed to update contact');
    return await response.json();
};

export const deleteContactApi = async (id) => {
    const response = await fetch(`${BASE_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete contact');
    return true;
};

export const changePasswordApi = async (passwordData) => {
    const response = await fetch(`${BASE_URL}/auth/change-password`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(passwordData)
    });
    if (!response.ok) throw new Error('Failed to update password');
    return await response.json();
};


// --- Register API ---
export const registerApi = async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Failed to register. Email may already be in use.');
    }

    return await response.json();
};

// --- User Profile API ---
export const getUserProfileApi = async () => {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user profile.');
    }

    return await response.json();
};