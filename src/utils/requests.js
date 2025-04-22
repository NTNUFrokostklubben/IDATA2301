

const API_BASE_URL = "http://localhost:8080/api";

/**
 * Create Async API request to the server
 *
 * @param method method to use for API call (GET, POST, PUT, DELETE)
 * @param url api url to call (/...)
 * @param requestBody request body to send (optional)
 * @returns {Promise<any>} response from the server
 * @constructor
 */
export function AsyncApiRequest(method, url, requestBody) {
    const fullUrl = API_BASE_URL + url;
    console.log(fullUrl)
    let body = null;
    let headers = {};
    if (requestBody) {
        body = JSON.stringify(requestBody);
        headers = {
            'Content-Type': 'application/json',
        };
    }
    return fetch(fullUrl, {
        method: method,
        mode: "cors",
        headers: headers,
        body: body,
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}