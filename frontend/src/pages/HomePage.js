import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Menubar } from "primereact/menubar";

const HomePage = () => {
    const menuItems = [
        { label: "Home", icon: "pi pi-home", url: "/" },
        { label: "Login", icon: "pi pi-sign-in", url: "/login" },
        { label: "Registrar", icon: "pi pi-user-plus", url: "/register" },
    ];

    const header = <img alt="logo" src="https://via.placeholder.com/150" height="40" className="mr-2" />;

    return (
        <div style={{ padding: "2rem" }}>
            <Menubar model={menuItems} start={header} />

            <div style={{ textAlign: "center", marginTop: "3rem", marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>Bem-vindo ao Sistema</h1>
                <p style={{ fontSize: "1.5rem", marginBottom: "2rem", color: "#666" }}>
                    Gerencie suas tarefas com eficiência e praticidade.
                </p>
                <Button
                    label="Comece Agora"
                    className="p-button-lg p-button-primary"
                    onClick={() => (window.location.href = "/register")}
                />
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 300px", maxWidth: "300px" }}>
                    <Card
                        title="Organize-se"
                        style={{ textAlign: "center" }}
                        header={<i className="pi pi-calendar" style={{ fontSize: "2rem", color: "#007ad9" }}></i>}
                    >
                        Planeje suas tarefas diárias com facilidade.
                    </Card>
                </div>
                <div style={{ flex: "1 1 300px", maxWidth: "300px" }}>
                    <Card
                        title="Colabore"
                        style={{ textAlign: "center" }}
                        header={<i className="pi pi-users" style={{ fontSize: "2rem", color: "#007ad9" }}></i>}
                    >
                        Compartilhe tarefas e trabalhe com sua equipe.
                    </Card>
                </div>
                <div style={{ flex: "1 1 300px", maxWidth: "300px" }}>
                    <Card
                        title="Produtividade"
                        style={{ textAlign: "center" }}
                        header={<i className="pi pi-chart-line" style={{ fontSize: "2rem", color: "#007ad9" }}></i>}
                    >
                        Aumente sua produtividade e alcance seus objetivos.
                    </Card>
                </div>
            </div>

            <footer style={{ textAlign: "center", marginTop: "4rem", padding: "1rem 0", backgroundColor: "#f5f5f5" }}>
                <p style={{ margin: 0, color: "#888" }}>
                    © 2024 Sistema de Gerenciamento de Tarefas. Todos os direitos reservados.
                </p>
            </footer>
        </div>
    );
};

export default HomePage;
