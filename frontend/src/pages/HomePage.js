import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import logo from "../images/logo.png";

const HomePage = () => {
    const menuItems = [
        { label: "Home", icon: "pi pi-home", url: "/" },
        { label: "Login", icon: "pi pi-sign-in", url: "/login" },
        { label: "Registrar", icon: "pi pi-user-plus", url: "/register" },
    ];

    const start = <img alt="logo" src={logo} height="40" className="mr-2" />;

    return (
        <div>
            {/* Navbar */}
            <Menubar model={menuItems} start={start} />

            {/* Hero Section */}
            <div className="hero-section p-4 text-center">
                <h1>Bem-vindo ao Sistema</h1>
                <p>Gerencie suas tarefas com eficiência e praticidade.</p>
                <Button label="Comece Agora" className="p-button-lg" onClick={() => (window.location.href = "/register")} />
            </div>

            {/* Feature Cards */}
            <div className="p-grid p-justify-around p-mt-4">
                <div className="p-col-12 p-md-4">
                    <Card
                        title="Organize-se"
                        style={{ width: "100%" }}
                        footer={<Button label="Saiba mais" className="p-button-text" />}
                        header={<img alt="Organize" src="https://via.placeholder.com/150" />}
                    >
                        Planeje suas tarefas diárias com facilidade.
                    </Card>
                </div>
                <div className="p-col-12 p-md-4">
                    <Card
                        title="Colabore"
                        style={{ width: "100%" }}
                        footer={<Button label="Saiba mais" className="p-button-text" />}
                        header={<img alt="Colabore" src="https://via.placeholder.com/150" />}
                    >
                        Compartilhe tarefas e trabalhe com sua equipe.
                    </Card>
                </div>
                <div className="p-col-12 p-md-4">
                    <Card
                        title="Produtividade"
                        style={{ width: "100%" }}
                        footer={<Button label="Saiba mais" className="p-button-text" />}
                        header={<img alt="Produtividade" src="https://via.placeholder.com/150" />}
                    >
                        Aumente sua produtividade e alcance seus objetivos.
                    </Card>
                </div>
            </div>

            {/* Footer */}
            <footer className="p-mt-4 text-center">
                <p>© 2024 Sistema de Gerenciamento de Tarefas. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default HomePage;
