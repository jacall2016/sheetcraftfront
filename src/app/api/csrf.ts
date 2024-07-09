import axios from 'axios';

export const getCsrfToken = async (): Promise<string | null> => {
  try {
    const response = await axios.get('http://localhost:8000/filehandler/csrf-token/', { withCredentials: true });
    const csrfToken = response.data.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return null;
  }
};
