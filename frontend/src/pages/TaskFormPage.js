import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, getTaskById, updateTask } from "../api/taskApi";
import { Toast } from "primereact/toast";

const TaskFormPage = () => {
    const [formData, setFormData] = useState({ title: "", description: "", status: "pending" });
    const [loading, setLoading] = useState(false);
    const toast = React.useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const statuses = [
        { label: "Pendente", value: "pending" },
        { label: "Em Progresso", value: "in progress" },
        { label: "Concluído", value: "completed" },
    ];

    const fetchTask = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await getTaskById(id);
            setFormData(response.data);
        } catch (err) {
            toast.current?.show({ severity: "error", summary: "Erro", detail: "Não foi possível carregar a tarefa." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [id]);

    const handleSave = async () => {
        setLoading(true);
        try {
            if (id) {
                await updateTask(id, formData);
                toast.current?.show({ severity: "success", summary: "Sucesso", detail: "Tarefa atualizada com sucesso." });
            } else {
                await createTask(formData);
                toast.current?.show({ severity: "success", summary: "Sucesso", detail: "Tarefa criada com sucesso." });
            }
            navigate("/tasks");
        } catch (err) {
            toast.current?.show({ severity: "error", summary: "Erro", detail: "Não foi possível salvar a tarefa." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="task-form-page">
            <Toast ref={toast} />
            <h1>{id ? "Editar Tarefa" : "Nova Tarefa"}</h1>

            <div className="p-field">
                <label htmlFor="title">Título</label>
                <InputText
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Digite o título da tarefa"
                />
            </div>

            <div className="p-field">
                <label htmlFor="description">Descrição</label>
                <InputText
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Digite a descrição da tarefa"
                />
            </div>

            <div className="p-field">
                <label htmlFor="status">Status</label>
                <Dropdown
                    id="status"
                    value={formData.status}
                    options={statuses}
                    onChange={(e) => setFormData({ ...formData, status: e.value })}
                    placeholder="Selecione o status"
                />
            </div>

            <Button label="Salvar" icon="pi pi-save" onClick={handleSave} loading={loading} className="p-button-primary" />
        </div>
    );
};

export default TaskFormPage;
