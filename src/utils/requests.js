import {getCookie} from "./authentication/cookies";
import {HttpResponseError} from "./authentication/HttpResponseError";
import {deleteAuthorizationCookies} from "./authentication/authentication";
import {deleteUserRedux} from "./commonRequests";


const API_BASE_URL = process.env.REACT_APP_API_URL;

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
    let body = null;
    let headers = {};
    if (requestBody instanceof FormData) {
        body = requestBody;
    } else if (requestBody) {
        body = JSON.stringify(requestBody);
        headers = {
            'Content-Type': 'application/json',
        };
    }
    const jwtToken = getCookie("jwt");
    if (jwtToken) {
        headers["Authorization"] = "Bearer " + jwtToken;
    }
    return fetch(fullUrl, {
        method: method,
        mode: "cors",
        headers: headers,
        body: body,
    })
        .then(handleErrors)
        .then(data => {
            return data;
        })
        .catch(error => {
            if(error.statusCode === 403 && getCookieForLogout("jwt")){
                deleteAuthorizationCookies();
                deleteUserRedux().then(() =>{
                    window.location.href = "/";
                })

            }
            console.error('Error:', error);
            throw error;
        });
}

export function getCookieForLogout(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}
/**
 * Check whether the HTTP response has a 200 OK status. If it does, return the
 * response. If it does not, throw an Error
 *
 * @param response
 * @return {response} The response (if all was OK)
 * @throws Error containing the response code and text from the response body
 */
async function handleErrors(response) {
    if (!response.ok) {
        const responseText = await response.text();
        throw new HttpResponseError(response.status, responseText);
    }
    return response;
}
