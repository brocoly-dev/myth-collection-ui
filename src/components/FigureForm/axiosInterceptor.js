import axios from 'axios';

// Create an axios instance or use the default axios
const instance = axios.create({
    baseURL: 'http://localhost:8080/api',  // Replace with your API base URL
});

// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        alert("d");
        console.log('ssss');
        // Modify the response here before it's passed to your application
        // Example: Add a custom field or modify data
        if (response.data) {
            // For example, let's assume you want to transform the data
            response.data.transformed = true;
        }
        return response;  // Return the modified response
    },
    (error) => {
        error.response.data.validations = new Object(); // a new JSON field is created.

        error.response.data.messages.forEach(function (errorMessage) {
            let index = errorMessage.indexOf(":");
            let field = errorMessage.substring(0, index);
            let value = errorMessage.substring(index + 2);

            error.response.data.validations[field] = value;
        });

        delete error.response.data.messages; // Removes the original messages field.

        console.log(error.response);
        // Handle errors globally, if any
        return Promise.reject(error);  // You can choose to reject or handle the error
    }
);

export default instance;
