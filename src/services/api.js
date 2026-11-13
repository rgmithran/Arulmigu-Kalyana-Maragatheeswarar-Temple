// Base API Configuration
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

async function fetchJSON(url, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(`${API_BASE}${url}`, config);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (error) {
    console.error(`API Error on [${options.method || 'GET'} ${url}]:`, error);
    throw error;
  }
}

// ── Pooja Bookings API ──
export const poojaApi = {
  createBooking: (bookingData) =>
    fetchJSON('/pooja-bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }),

  lookupBooking: (query) => fetchJSON(`/pooja-bookings/lookup/${encodeURIComponent(query)}`),

  getBookings: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJSON(`/pooja-bookings${query ? `?${query}` : ''}`);
  },

  updateStatus: (id, status, adminNotes) =>
    fetchJSON(`/pooja-bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, adminNotes }),
    }),

  deleteBooking: (id) =>
    fetchJSON(`/pooja-bookings/${id}`, {
      method: 'DELETE',
    }),
};

// ── Contact Inquiries API ──
export const contactApi = {
  createContact: (contactData) =>
    fetchJSON('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    }),

  getContacts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJSON(`/contacts${query ? `?${query}` : ''}`);
  },

  updateStatus: (id, status, adminResponse) =>
    fetchJSON(`/contacts/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, adminResponse }),
    }),

  deleteContact: (id) =>
    fetchJSON(`/contacts/${id}`, {
      method: 'DELETE',
    }),
};

// ── Announcements API ──
export const announcementApi = {
  getActive: () => fetchJSON('/announcements'),

  getAll: () => fetchJSON('/announcements/all'),

  create: (data) =>
    fetchJSON('/announcements', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    fetchJSON(`/announcements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    fetchJSON(`/announcements/${id}`, {
      method: 'DELETE',
    }),
};

// ── Temple Settings API ──
export const settingApi = {
  getSettings: () => fetchJSON('/settings'),

  updateSettings: (data) =>
    fetchJSON('/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// ── Donations API ──
export const donationApi = {
  createDonation: (data) =>
    fetchJSON('/donations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getDonations: () => fetchJSON('/donations'),

  updateStatus: (id, paymentStatus) =>
    fetchJSON(`/donations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ paymentStatus }),
    }),
};

// ── Health API ──
export const healthApi = {
  checkHealth: () => fetchJSON('/health'),
};
