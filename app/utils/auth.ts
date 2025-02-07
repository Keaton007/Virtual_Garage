export const setAuthToken = (token: string) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('authToken', token);
        return true;
    }
    return false;
};

export const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem('authToken');
    }
    return null;
};

export const removeAuthToken = () => {
    if (typeof window !== 'undefined') {
        window.localStorage.removeItem('authToken');
    }
}; 