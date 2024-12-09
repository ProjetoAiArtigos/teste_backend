import React from "react";
import { Menubar } from "primereact/menubar";
import { PanelMenu } from "primereact/panelmenu";

const AppLayout = ({ children }) => {
    const sidebarMenuItems = [
        {
            label: "Tarefas",
            icon: "pi pi-list",
            items: [
                { label: "Listar Tarefas", icon: "pi pi-table", command: () => (window.location.href = "/tasks") },
                { label: "Nova Tarefa", icon: "pi pi-plus", command: () => (window.location.href = "/tasks/new") },
            ],
        }
    ];

    const topMenuItems = [
        {
            label: "Perfil",
            icon: "pi pi-user",
            command: () => (window.location.href = "/profile"),
        },
        {
            label: "Logout",
            icon: "pi pi-sign-out",
            command: () => {
                localStorage.removeItem("authToken");
                window.location.href = "/login";
            },
        },
    ];

    return (
        <div className="app-layout">
            {/* Sidebar */}
            <div className="sidebar p-d-none p-d-md-block">
                <PanelMenu model={sidebarMenuItems} style={{ width: "100%" }} />
            </div>

            {/* Content Area */}
            <div className="main-content">
                <Menubar model={topMenuItems} className="p-mb-3" />

                {/* Main Content */}
                <div className="content-container p-3">{children}</div>
            </div>
        </div>
    );
};

export default AppLayout;
