import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const AuthMenu = () => {
    const navigate = useNavigate();

    const menuItems = [
        { label: "Tarefas", icon: "pi pi-list", command: () => navigate("/tasks") },
        { label: "Nova Tarefa", icon: "pi pi-plus", command: () => navigate("/tasks/new") },
    ];

    const start = <img alt="logo" src={logo} height="40" className="mr-2" />;
    const end = (
        <Button
            label="Logout"
            icon="pi pi-sign-out"
            className="p-button-danger p-button-outlined"
            onClick={() => {
                localStorage.removeItem("authToken"); // Remove o token de autenticação
                navigate("/login"); // Redireciona para a página de login
            }}
        />
    );

    return <Menubar model={menuItems} start={start} end={end} />;
};

export default AuthMenu;
