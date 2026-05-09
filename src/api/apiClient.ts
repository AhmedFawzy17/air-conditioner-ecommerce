const API_URL =
  import.meta.env.VITE_API_URL || "http://airadvisor.runasp.net/api";

export const apiClient = {
  async get(endpoint: string) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }
    return response.json();
  },

  async post(endpoint: string, data: any) {
    const token = localStorage.getItem('token');
    const isFormData = data instanceof FormData;
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      },
      body: isFormData ? data : JSON.stringify(data),
    });
    
    if (response.status === 204) return null;
    
    const result = await response.json();
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
      }
      throw new Error(result.errors?.[0] || 'An error occurred');
    }
    return result;
  },

  async put(endpoint: string, data: any) {
    const token = localStorage.getItem('token');
    const isFormData = data instanceof FormData;

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      },
      body: isFormData ? data : JSON.stringify(data),
    });
    
    if (response.status === 204) return null;
    
    const result = await response.json();
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
      }
      throw new Error(result.errors?.[0] || 'An error occurred');
    }
    return result;
  },

  async delete(endpoint: string) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    
    if (response.status === 204) return null;
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
      }
      try {
        const result = await response.json();
        throw new Error(result.errors?.[0] || 'An error occurred');
      } catch {
        throw new Error('Failed to delete item');
      }
    }
    return true;
  },
};
