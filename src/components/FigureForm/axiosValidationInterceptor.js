import axios from 'axios';

// Create an axios instance or use the default axios
const instance = axios.create({
    baseURL: 'http://localhost:8080/api',  // Replace with your API base URL
});

// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        return response;  // Return the response without any change
    },
    (error) => {
        error.response.data.validations = {}; // a new JSON field is created.

        error.response.data.messages.forEach(function (errorMessage) {
            let index = errorMessage.indexOf(":");
            let field = errorMessage.substring(0, index);
            let value = errorMessage.substring(index + 2);

            error.response.data.validations[field] = value; // dynamic JSON key and value are created here.
        });
        delete error.response.data.messages; // Removes the original 'messages' field.

        // Handle errors globally, if any
        return Promise.reject(error);  // You can choose to reject or handle the error
    }
);

export default instance;
