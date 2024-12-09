import React, {useState} from "react";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Card} from "primereact/card";
import {useNavigate} from "react-router-dom";
import api from "../api/api";

import "../styles/LoginPage.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", {email, password});
            localStorage.setItem("authToken", response.data.token);
            navigate("/tasks");
        } catch (err) {
            setError("Login falhou. Verifique suas credenciais.");
        }
    };

    return (
        <div className="login-container">
            <Card title="Bem-vindo de volta!" className="login-card">
                <p className="login-subtitle">Faça login para acessar sua conta.</p>
                <form onSubmit={handleLogin}>
                    <div className="p-field">
                        <label htmlFor="email" className="block text-900 font-medium mb-2">E-mail</label>
                        <InputText
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu e-mail"
                            className="p-inputtext-md w-full mb-3"
                            required
                        />
                    </div>
                    <div className="p-field p-mt-3">
                        <label htmlFor="password" className="block text-900 font-medium mb-2">Senha</label>
                        <InputText
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            toggleMask
                            placeholder="Digite sua senha"
                            feedback={false}
                            className="p-inputtext-md w-full mb-3"
                            required
                        />
                    </div>
                    {error && <p className="login-error">{error}</p>}
                    <Button label="Entrar" type="submit" className="p-button-primary p-button-lg p-mt-4"
                            style={{width: "100%"}}/>
                </form>
                <p className="login-footer">
                    Não tem uma conta?{" "}
                </p>
                <Button
                    label="Registrar-se"
                    className="w-full"
                    onClick={() => navigate("/register")}
                />

            </Card>
        </div>
    );
};

export default LoginPage;
