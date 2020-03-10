import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";
//when we get a response with an error this function will be called first then the control is passed to the catch block
axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedError) {
        logger.log(error);
        toast.error("Unexpected error occurred");
    }
    return Promise.reject(error); // return the rejected promise
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
