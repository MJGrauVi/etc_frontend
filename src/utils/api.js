const getHeaders = (includeBody = false) => {
    const headers = {
        'Accept': 'application/json'
    };

    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (includeBody) headers['Content-Type'] = 'application/json';

    return headers;
};
export default getHeaders;