import {setCookie, getCookie, deleteCookie} from "./cookies";
import {AsyncApiRequest} from "../requests";

/**
* Get the current authenticated user.
*
* @return the user object or null
*/
export function getAuthenticatedUser(){
   let user = null;
   const email = getCookie("current_email");
   const rolesComma = getCookie("current_user_roles");
   if(email && rolesComma){
       const roles = rolesComma.split(",");
       user = {
           email: email,
           roles: roles,
       };
   }
   return user;
}

/**
 * Check if the given user has admin rights
 *
 * @param user User object
 * @returns {boolean} True if the user has admin rights, false otherwise
 */
export function isAdmin(user){
    return user && user.roles && user.roles.includes("ROLE_ADMIN");
}

/**
 * Send authentication request to the API
 * @param email
 * @param password Password, plain text
 * @param successCallback Function to call on success
 * @param errorCallback Function to call on error, with response text as the parameter
 */
export async function sendAuthenticationRequest(
    email,
    password,
    successCallback,
    errorCallback
) {
    const postData = {
        email: email,
        password: password,
    };
    try {
        const jwtResponse = await AsyncApiRequest("POST", "/authenticate", postData).then(response => response.json());
        if (jwtResponse && jwtResponse.jwt) {
            setCookie("jwt", jwtResponse.jwt);
            const userData = parseJwtUser(jwtResponse.jwt);
            if (userData) {
                setCookie("current_email", userData.email);
                setCookie("current_user_roles", userData.roles.join(","));
                successCallback(userData);
            }
        }
    } catch (httpError) {
        errorCallback(httpError.message);
    }
}

export async function sendSignupRequest(
    name,
    email,
    passwordHash,
    successCallback,
    errorCallback
) {
    const postData = {
        name: name,
        passwordHash: passwordHash,
        email: email,
    };
    try {
        const jwtResponse = await AsyncApiRequest("POST", "/signup", postData).then(response => response.json());
        // console.log("JWT response: ", jwtResponse);
        if (jwtResponse && jwtResponse.jwt) {
            setCookie("jwt", jwtResponse.jwt);
            const userData = parseJwtUser(jwtResponse.jwt);
            if (userData) {
                setCookie("current_email", userData.email);
                setCookie("current_user_roles", userData.roles.join(","));
                successCallback(userData);
            }
        }
    } catch (httpError) {
        errorCallback(httpError.message);
    }
}



/**
 * Parse JWT string, extract information from it
 * Code copied from https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
 * @param token JWT token string
 * @returns {any} Decoded JWT object
 */
function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}

/**
 * Parse JWT string, extract a User object
 * @param jwtString
 * @return User object
 */
function parseJwtUser(jwtString) {
    let user = null;
    const jwtObject = parseJwt(jwtString);
    if (jwtObject) {
        user = {
            email: jwtObject.sub,
            roles: jwtObject.roles.map((r) => r.authority),
        };
    }
    return user;
}

/**
 * Delete all cookies related to authorization (user session)
 */
export function deleteAuthorizationCookies() {
    deleteCookie("jwt");
    deleteCookie("current_email");
    deleteCookie("current_user_roles");
}

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
export function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': process.env.REACT_APP_GOOGLE_CLIENT_ID,
        'redirect_uri': window.location.origin + '/auth/google/callback',
        'response_type': 'token',
        'scope': 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        'include_granted_scopes': 'true',
        'state': 'pass-through value'};

    // Add form parameters as hidden input values.
    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}

// Add this function to handle Google user data
export async function handleGoogleAuth(googleUser) {
    try {
        const response = await AsyncApiRequest('POST', '/authenticate/google', {
            email: googleUser.email,
            name: googleUser.name
        }).then((res) => res.json());

        if (response.jwt) {
            setCookie('jwt', response.jwt);
            const parsedUser = parseJwtUser(response.jwt);
            if (parsedUser) {
                setCookie('current_email', parsedUser.email);
                setCookie('current_user_roles', parsedUser.roles.join(','));
                return parsedUser;
            }
        }
        throw new Error('Invalid JWT response');
    } catch (error) {
        console.error('Google auth failed:', error);
        throw error;
    }
}