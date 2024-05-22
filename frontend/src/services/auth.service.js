import axios from 'axios'

const API_URL = 'http://localhost:3001/api/auth/';

//  постим юзернейм, емейл, пароль, и серверная часть делает свою часть
const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password
    });
};

// постим юзернейм и пароль, сохраняем инфу и JWT в local storage
const login = (username, password) => {
    return axios
    .post(API_URL + "signin", {
        username,
        password
    })
    .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
};

// убираем инфу и JWT из local storage
const logout = () => {
    localStorage.removeItem("user");
};

// находим инфу по юзеру в local storage
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,  
    logout,
    getCurrentUser
};

export default AuthService;