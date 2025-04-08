import react, { createContext } from "react";

/**
 * Store the products in a globally available context
 * @type {React.Context<*[]>}
 */
export const UserContext = createContext();