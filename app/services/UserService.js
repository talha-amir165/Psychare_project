import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserService extends GenericService {
    constructor() {
        super();
    }
    getData = async(key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // Data found
                console.log(value);
            } else {
                // Data not found
                console.log('Data not found');
            }
        } catch (error) {
            console.log(error);
        }
    };
    storeData = async(key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log(error);
        }
    };

    login = (email, password) =>
        new Promise((resolve, reject) => {
            this.post("users/login", { email, password })

            .then(({ token, user }) => {

                    AsyncStorage.setItem("token", token);



                    resolve(user);
                })
                .catch((err) => {

                    reject(err);
                });
        });
    register = (name, email, password, role) =>
        this.post("users/register", { password, email, name, role });

    logout = () => {
        AsyncStorage.removeItem("token");
    };
    isLoggedIn = () => {
        return AsyncStorage.getItem("token") ? true : false;
    };
    getLoggedInUser = () => {
        try {
            const jwt = AsyncStorage.getItem("token");
            return jwtDecode(jwt);
        } catch (ex) {
            return null;
        }
    };
    isAdmin = () => {
        if (this.isLoggedIn()) {
            if (this.getLoggedInUser().role == "admin") return true;
            else return false;
        } else return false;
    };
    getUser = (id) => this.get("users/" + id);
}


let userService = new UserService();
export default userService;
// import GenericService from "./GenericService";
// import jwtDecode from "jwt-decode";
// import React, { createContext } from "react";

// export const UserContext = createContext();

// class UserService extends GenericService {
//   constructor() {
//     super();
//     const token = localStorage.getItem("token");
//     const user = token ? jwtDecode(token) : null;

//     // Set the initial state of the user info
//     this.state = {
//       user: user,
//       setUser: this.setUser.bind(this),
//     };
//   }

//   setUser = (user) => {
//     // Update the user info in the context and local storage
//     this.setState({ user });
//     // if (user) {
//     //   localStorage.setItem("token", user.token);
//     // } else {
//     //   localStorage.removeItem("token");
//     // }
//   };

//   login = (email, password) =>
//     new Promise((resolve, reject) => {
//       this.post("users/login", { email, password })
//         .then((token) => {
//           const user = jwtDecode(token);
//           this.setUser(user);
//           localStorage.setItem("token", token);
//           resolve(token);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   register = (name, email, password) =>
//     this.post("users/register", { password, email, name });
//   logout = () => {
//     localStorage.removeItem("token");
//   };
//   isLoggedIn = () => {
//     return localStorage.getItem("token") ? true : false;
//   };
//   getLoggedInUser = () => {
//     try {
//       const jwt = localStorage.getItem("token");
//       return jwtDecode(jwt);
//     } catch (ex) {
//       return null;
//     }
//   };
//   isAdmin = () => {
//     if (this.isLoggedIn()) {
//       if (this.getLoggedInUser().role == "admin") return true;
//       else return false;
//     } else return false;
//   };
//   render() {
//     const { user } = this.state;
//     if (!user) {
//       return null; // don't render anything if user is not set
//     }

//     return (
//       <UserContext.Provider value={this.state}>
//         {this.props.children}
//       </UserContext.Provider>
//     );
//   }
// }

// let userService = new UserService();
// export default userService;