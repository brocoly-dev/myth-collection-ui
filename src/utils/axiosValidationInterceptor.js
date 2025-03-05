import axios from 'axios';

// Create an axios instance or use the default axios
const instance = axios.create({
    baseURL: 'http://localhost:8080/api',  // Replace with your API base URL
});

// Add a response interceptor
/*
This interceptor converts the server response to a new format, here's an example:

{
    "error": "Bad Request",
    "messages": [
        "distributionJPY.releaseDate: must not be null",
        "distributionJPY.preOrderDate: must not be null",
        "baseName": "size must be between 3 and 20"
    ],
    "path": "/api/figurines"
}

{
    "error": "Bad Request",
    "validations": {
        "distributionJPY_releaseDate": "must not be null",
        "distributionJPY_preOrderDate": "must not be null",
        "baseName": "size must be between 3 and 20"
    },
	"path": "/api/figurines"
}
The intention is to create a valid JSON structure to handle better the errors.
*/
instance.interceptors.response.use(
    (response) => {
        return response;  // Return the response without any change
    },
    (error) => {
        error.response.data.validations = {}; // a new JSON field is created.
        error.response.data.messages.forEach(function (errorMessage) {
            let index = errorMessage.indexOf(":");
            let field = errorMessage.substring(0, index);
            field = field.replace(".", "_"); // in case the field contains ".", then we replace it with "_"

            let value = errorMessage.substring(index + 2);
            error.response.data.validations[field] = value; // dynamic JSON key and value are created here.
        });
        delete error.response.data.messages; // Removes the original 'messages' field.
        // Handle errors globally, if any
        return Promise.reject(error);  // You can choose to reject or handle the error
    }
);

export default instance;
