import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

import "../styles/LoginPage.css";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }
        try {
            await api.post("/auth/register", { name, email, password });
            navigate("/login");
        } catch (err) {
            setError("Falha ao registrar. Tente novamente.");
        }
    };

    return (
        <div className="register-container">
            <Card title="Crie sua conta" className="register-card">
                <p className="register-subtitle">Preencha os dados abaixo para começar.</p>
                <form onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="name" className="block text-900 font-medium mb-2">Nome</label>
                        <InputText
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Digite seu nome"
                            className="p-inputtext-md w-full mb-3"
                            required
                        />
                    </div>
                    <div className="p-field p-mt-3">
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
                    <div className="p-field p-mt-3">
                        <label htmlFor="confirmPassword" className="block text-900 font-medium mb-2">Confirme a Senha</label>
                        <InputText
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            toggleMask
                            placeholder="Confirme sua senha"
                            feedback={false}
                            className="p-inputtext-md w-full mb-3"
                            required
                        />
                    </div>
                    {error && <p className="register-error">{error}</p>}
                    <Button label="Registrar" type="submit" className="p-button-primary p-button-lg p-mt-4" style={{ width: "100%" }} />
                </form>
                <p className="register-footer">
                    Já tem uma conta?{" "}
                    <Button
                        label="Login"
                        className="p-button-link"
                        onClick={() => navigate("/login")}
                    />
                </p>
            </Card>
        </div>
    );
};

export default RegisterPage;
