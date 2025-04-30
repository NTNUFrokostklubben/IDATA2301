import {AsyncApiRequest} from "./requests";

/**
 * Gets all providers from Server
 *
 * @returns {Promise<*>}
 */
export function getProviders() {
    return AsyncApiRequest("GET", "/providers", null)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error fetching providers");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Gets all courses from Server
 *
 * @returns {Promise<*>}
 */
export function getCourses() {
    return AsyncApiRequest("GET", "/courses", null)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error fetching courses");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}