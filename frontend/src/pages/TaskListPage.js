import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { getTasks, deleteTask } from "../api/taskApi";
import { useNavigate } from "react-router-dom";

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null); // Task que será excluída
    const toast = React.useRef(null);
    const navigate = useNavigate();

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await getTasks();
            setTasks(response.data.tasks);
        } catch (err) {
            toast.current?.show({ severity: "error", summary: "Erro", detail: "Não foi possível carregar as tarefas." });
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (task) => {
        setTaskToDelete(task);
    };

    const handleDelete = async () => {
        if (!taskToDelete) return;
        try {
            await deleteTask(taskToDelete.id);
            toast.current?.show({ severity: "success", summary: "Sucesso", detail: "Tarefa excluída com sucesso." });
            await fetchTasks();
            setTaskToDelete(null);
        } catch (err) {
            toast.current?.show({ severity: "error", summary: "Erro", detail: "Não foi possível excluir a tarefa." });
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="p-d-flex">
                <Button
                    label="Editar"
                    icon="pi pi-pencil"
                    className="p-button-text p-mr-2"
                    onClick={() => navigate(`/tasks/edit/${rowData.id}`)}
                />
                <Button
                    label="Excluir"
                    icon="pi pi-trash"
                    className="p-button-danger p-button-text"
                    onClick={() => confirmDelete(rowData)}
                />
            </div>
        );
    };

    return (
        <div className="task-list-page">
            <Toast ref={toast} />
            <h1>Lista de Tarefas</h1>
            <Button
                label="Nova Tarefa"
                icon="pi pi-plus"
                className="p-button-success p-mb-3"
                onClick={() => navigate("/tasks/new")}
            />
            <DataTable value={tasks} loading={loading} paginator rows={10} responsiveLayout="scroll">
                <Column field="title" header="Título" />
                <Column field="description" header="Descrição" />
                <Column field="status" header="Status" />
                <Column body={actionBodyTemplate} header="Ações" />
            </DataTable>

            <Dialog
                visible={!!taskToDelete}
                style={{ width: "450px" }}
                header="Confirmar Exclusão"
                modal
                footer={
                    <>
                        <Button
                            label="Não"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={() => setTaskToDelete(null)}
                        />
                        <Button
                            label="Sim"
                            icon="pi pi-check"
                            className="p-button-danger"
                            onClick={handleDelete}
                        />
                    </>
                }
                onHide={() => setTaskToDelete(null)}
            >
                <p>Tem certeza de que deseja excluir a tarefa <strong>{taskToDelete?.title}</strong>?</p>
            </Dialog>
        </div>
    );
};

export default TaskListPage;
