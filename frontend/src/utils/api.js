import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

/**
 * JoblyApi class to interact with the Jobly API.
 */
export default class JoblyApi {
    // the token for interactive with the API will be stored here.
    static token;

    /**
     * Make an API request.
     * @param {string} endpoint - The API endpoint.
     * @param {Object} [data={}] - The data to send with the request.
     * @param {string} [method="get"] - The HTTP method to use.
     * @returns {Promise<Object>} - The response data.
     * @throws {Array<string>} - An array of error messages.
     */
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = method === "get" ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /**
     * Request all companies from the API.
     * @returns {Promise<Array>} - An array of company objects.
     */
    static async allCompanies() {
        let res = await this.request(`companies`);
        return res.companies;
    }

    /**
     * Search for companies by name.
     * @param {string} name - A string to search for in the company names.
     * @returns {Promise<Array>} - An array of company objects.
     */
    static async searchCompanies(name) {
        if (!name) return await this.allCompanies();
        let res = await this.request(`companies`, { name });
        return res.companies;
    }

    /**
     * Get a specific company by handle.
     * @param {string} handle - The handle of the company.
     * @returns {Promise<Object>} - A company object.
     */
    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    /**
     * Request all jobs from the API.
     * @returns {Promise<Array>} - An array of job objects.
     */
    static async allJobs() {
        let res = await this.request(`jobs`);
        return res.jobs;
    }

    /**
     * Search for jobs by title.
     * @param {string} title - A string to search for in the job titles.
     * @returns {Promise<Array>} - An array of job objects.
     */
    static async searchJobs(title) {
        if (!title) return await this.allJobs();
        let res = await this.request(`jobs`, { title });
        return res.jobs;
    }

    /**
     * Get a specific job by ID.
     * @param {string} id - The ID of the job.
     * @returns {Promise<Object>} - A job object.
     */
    static async getJob(id) {
        let res = await this.request(`jobs/${id}`);
        return res.job;
    }

    /**
     * Log in a user.
     * @param {Object} data - The login data.
     * @returns {Promise<string>} - The authentication token.
     */
    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    /**
     * Register a new user.
     * @param {Object} data - The registration data.
     * @returns {Promise<string>} - The authentication token.
     */
    static async register(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /**
     * Get a user by username.
     * @param {string} username - The username of the user.
     * @returns {Promise<Object>} - A user object.
     */
    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /**
     * Update a user's data.
     * @param {string} username - The username of the user.
     * @param {Object} data - The data to update.
     * @returns {Promise<Object>} - The updated user object.
     */
    static async updateUser(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }

    /**
     * Apply to a job.
     * @param {string} username - The username of the user.
     * @param {string} jobId - The ID of the job.
     * @returns {Promise<void>}
     */
    static async applyToJob(username, jobId) {
        await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    }

    /**
     * Decode a token.
     * @param {string} token - The token to decode.
     * @returns {Object} - The decoded token.
     */
    static decode(token) {
        try {
            return jwtDecode(token);
        } catch (e) {
            return null;
        }
    }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
