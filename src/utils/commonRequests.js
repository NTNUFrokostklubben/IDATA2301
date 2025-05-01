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

/**
 * Gets a specific course from Server
 *
 * @param cid Course ID
 * @returns {Promise<*>}
 */
export function getCourse(cid) {
    return AsyncApiRequest("GET", "/course/" + cid, null)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error fetching course");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Gets all offerable courses from Server
 *
 * @returns {Promise<*>}
 */
export function getOfferableCourses() {
    return AsyncApiRequest("GET", "/offerableCourses", null)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error fetching offerable courses");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Gets a specific offerable course from Server
 *
 * @param id OfferableCourse ID
 * @returns {Promise<*>}
 */
export function getOfferableCourse(id) {
    return AsyncApiRequest("GET", "/offerableCourses/" + id, null)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error fetching offerable course");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}