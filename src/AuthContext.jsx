import { use } from 'react';
import {createContext, useState, useContext, Children } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({ Children}) => {

};
export const [isloggedin, setIsloggedin ] = useState(!! localStorage.getItem("token"));
const login = (token) => {
    localStorage.setItem("token", token);
    setIsloggedin(true);
};
const logout = () => {
    localStorage.removeItem("token");
    setIsloggedin("falase");

};
return (
    <AuthContext.Provider value={{ isloggedin, login, logout}}>
        {children}
    </AuthContext.Provider>
);
export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider")
    }
    return context;
}