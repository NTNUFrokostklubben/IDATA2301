import {AsyncApiRequest} from "./requests";
import {clearUserObject, setUserObject} from "../dataSlice";
import {persistor} from "../store";

export function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);

    return AsyncApiRequest("POST", "/images/upload", formData)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Error uploading image");
            }
        })
       .catch(error => {
            console.error('Error:', error);
            throw error;
       });
}


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
 * Gets a specific provider from Server
 *
 * @param pid Provider ID
 * @returns {Promise<*>}
 */
export function getProvider(pid) {
    return AsyncApiRequest("GET", "/provider/" + pid, null)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error fetching provider");
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
 * Posts a new course to Server
 *
 * @param course
 * @returns {Promise<*>}
 */
export function postCourse(course) {
    return AsyncApiRequest("POST", "/course", course)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error posting course");
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

/**
 * Gets all users from Server
 *
 * @returns {Promise<*>}
 */
export function getUsers() {
    return AsyncApiRequest("GET", "/users", null)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error fetching users");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Gets a specific user from Server
 *
 * @param uid
 * @returns {Promise<*>}
 */
export function getUser(uid) {
    return AsyncApiRequest("GET", "/user/get", null)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error fetching user");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Updates a user to Server with the given uid. Limited parameters
 *
 * @param uid User ID
 * @param user User object (profile picture, roles, active)
 * @returns {Promise<*>}
 */
export function putUser(uid, user) {
    return AsyncApiRequest("PUT", "/user/put", user)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error posting user");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Gets all roles from Server
 *
 * @returns {Promise<*>}
 */
export function getRoles() {
    return AsyncApiRequest("GET", "/roles", null)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error fetching roles");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Gets a keywords associated with a course
 *
 * @param cid Course ID
 * @returns {Promise<*>}
 */
export function getKeywords(cid) {
    return AsyncApiRequest("GET", "/keyword/" + cid, null)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error fetching keywords");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Posts keywords to a course
 *
 * @param cid
 * @param keywords
 * @returns {Promise<*>}
 */
export function setKeywords(cid, keywords) {
    return AsyncApiRequest("POST", "/keyword/" + cid, keywords)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error posting keywords");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Gets all transactions from Server
 *
 * @returns {Promise<*>}
 */
export function getTransactions() {
    return AsyncApiRequest("GET", "/transactions", null)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error fetching transactions");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

export async function deleteUserRedux(){
    await persistor.purge()
}
export async function addUserToRedux(email, dispatch){
    const userDto = await AsyncApiRequest("GET", `/userDto/${email}`, null)
        .then(response => response.json())
    console.log(userDto)
    dispatch(setUserObject(userDto));
}