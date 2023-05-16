import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
axios.defaults.baseURL = "http://13.53.188.158:4000/api/";

axios.defaults.headers.common["x-auth-token"] = AsyncStorage.getItem("token");
class GenericService {
    constructor() {

        async function setAuthTokenHeader() {
            const token = await AsyncStorage.getItem("token");
            axios.defaults.headers.common["x-auth-token"] = token;
        }
        setAuthTokenHeader();

    }


    // Call setAuthTokenHeader once at the start of your app to set the header value

    get = (url) =>
        new Promise((resolve, reject) => {
            axios
                .get(url)
                .then((res) => {
                    resolve(res.data);
                    return res.data;
                })
                .catch((err) => {
                    reject(err);
                });
        });
    post = (url, data) =>
        new Promise((resolve, reject) => {
            axios
                .post(url, data)
                .then((res) => {
                    console.log("user is" + data);
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    delete = (url, data) =>
        new Promise((resolve, reject) => {
            axios
                .delete(url, data)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    put = (url, data) =>
        new Promise((resolve, reject) => {
            axios
                .put(url, data)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
}
export default GenericService;