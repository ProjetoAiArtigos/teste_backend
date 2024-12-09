import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            setError("Preencha todos os campos.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const response = await loginUser(formData);
            const { token } = response.data;

            localStorage.setItem("authToken", token);

            navigate("/");
        } catch (err) {
            const errorMessage = err.response?.data?.error || "Erro ao fazer login.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <Card title="Login" style={{ maxWidth: "400px", margin: "2rem auto", padding: "1rem" }}>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="p-field">
                    <label htmlFor="email">Email</label>
                    <InputText
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Digite seu email"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="password">Senha</label>
                    <Password
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Digite sua senha"
                        feedback={false}
                    />
                </div>

                <Button
                    label={loading ? "Carregando..." : "Entrar"}
                    icon="pi pi-sign-in"
                    onClick={handleLogin}
                    disabled={loading}
                    className="p-button-primary p-mt-3"
                />
            </Card>
        </div>
    );
};

export default LoginPage;
