/**
 * @typedef {Object} Client
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} address
 * @property {string} shipping_fees
 * @property {string} facebook_link
 * @property {string} instagram_link
 * @property {string} cid
 */

/**
 * @returns {Promise<Client[]>} Array of clients
 */
const apiuri = process.env.REACT_APP_BACKEND_URI;
const get = async () => {
   const response = await fetch(`${apiuri}/clients/`);
   return response.json();
};

/**
 *
 * @param {Client} client
 */

const post = async (client) => {
   const response = await fetch(`${apiuri}/clients/`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
   });
   return response.json();
};

/**
 *
 * @param {Client} client
 */

const put = async (client) => {
   const response = await fetch(`${apiuri}/clients/`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
   });
   return response.json();
};

const clientServices = {
   get,
   post,
   put,
};
export default clientServices;
