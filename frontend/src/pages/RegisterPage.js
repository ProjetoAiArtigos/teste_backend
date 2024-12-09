import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import {registerUser} from "../api/userApi";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const toast = React.useRef(null);

    const validateInputs = () => {
        if (!name.trim()) return "O nome é obrigatório.";
        if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) return "Digite um email válido.";
        if (!password.trim() || password.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
        return null;
    };

    const handleRegister = async () => {
        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const userData = { name, email, password };
            await registerUser(userData);
            toast.current.show({ severity: "success", summary: "Sucesso", detail: "Registro concluído!" });

            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } catch (err) {
            setError(err.message || "Erro ao registrar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <Toast ref={toast} />
            <h2>Registrar</h2>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            <div className="p-field">
                <label htmlFor="name">Nome</label>
                <InputText
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite seu nome"
                />
            </div>
            <div className="p-field">
                <label htmlFor="email">Email</label>
                <InputText
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                />
            </div>
            <div className="p-field">
                <label htmlFor="password">Senha</label>
                <Password
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    feedback={true}
                    placeholder="Digite sua senha"
                />
            </div>
            <Button
                label={loading ? "Registrando..." : "Registrar"}
                className="p-button-lg"
                onClick={handleRegister}
                disabled={loading}
            />
            <a href="/login">Já tem uma conta? Faça login</a>
        </div>
    );
};

export default RegisterPage;
