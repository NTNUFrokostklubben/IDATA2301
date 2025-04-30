import {setCookie, getCookie, deleteCookie} from "./cookies";
import {AsyncApiRequest} from "../requests";

/**
* Get the current authenticated user.
*
* @return the user object or null
*/
export function getAuthenticatedUser(){
   let user = null;
   const username = getCookie("current_username");
   const rolesComma = getCookie("current_user_roles");
   if(username && rolesComma){
       const roles = rolesComma.split(",");
       user = {
           username: username,
           roles: roles,
       };
   }
   return user;
}

/**
 * Check if the given user has admin rights
 *
 * @param user
 * @returns {boolean}
 */
export function isAdmin(user){
    return user && user.roles && user.oles.includes("ROLE_ADMIN");
}

/**
 * Send authentication request to the API
 * @param username Username
 * @param password Password, plain text
 * @param successCallback Function to call on success
 * @param errorCallback Function to call on error, with response text as the parameter
 */
export async function sendAuthenticationRequest(
    username,
    password,
    successCallback,
    errorCallback
) {
    const postData = {
        username: username,
        password: password,
    };
    try {
        const jwtResponse = await AsyncApiRequest("POST", "/authenticate", postData).then(response => response.json());
        if (jwtResponse && jwtResponse.jwt) {
            setCookie("jwt", jwtResponse.jwt);
            const userData = parseJwtUser(jwtResponse.jwt);
            if (userData) {
                setCookie("current_username", userData.username);
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
            username: jwtObject.sub,
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
    deleteCookie("current_username");
    deleteCookie("current_user_roles");
}