import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, getTaskById, updateTask } from "../api/taskApi";
import { Toast } from "primereact/toast";

const TaskFormPage = () => {
    const [formData, setFormData] = useState({ title: "", description: "", status: "pending" });
    const [errors, setErrors] = useState({});
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

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = "O título é obrigatório.";
        if (!formData.description) newErrors.description = "A descrição é obrigatória.";
        if (!formData.status) newErrors.status = "O status é obrigatório.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

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
        <div className="task-form-page" style={{display: "flex", justifyContent: "center", padding: "2rem"}}>
            <Toast ref={toast}/>
            <Card
                title={id ? "Editar Tarefa" : "Nova Tarefa"}
                style={{ width: "50rem", maxWidth: "100%" }}
                className="p-p-4"
            >
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="title">Título</label>
                        <InputText
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Digite o título da tarefa"
                            className={errors.title ? "p-invalid mb-3" : "mb-3"}
                        />
                        {errors.title && <small className="p-error">{errors.title}</small>}
                    </div>

                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="description">Descrição</label>
                        <InputText
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Digite a descrição da tarefa"
                            className={errors.description ? "p-invalid mb-3" : "mb-3"}
                        />
                        {errors.description && <small className="p-error">{errors.description}</small>}
                    </div>

                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="status">Status</label>
                        <Dropdown
                            id="status"
                            value={formData.status}
                            options={statuses}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            placeholder="Selecione o status"
                            className={errors.status ? "p-invalid mb-3" : "mb-3"}
                        />
                        {errors.status && <small className="p-error">{errors.status}</small>}
                    </div>
                </div>

                <div className="p-mt-4">
                    <Button
                        label="Salvar"
                        icon="pi pi-save"
                        onClick={handleSave}
                        loading={loading}
                        className="p-button-primary"
                    />
                    <Button
                        label="Cancelar"
                        icon="pi pi-times"
                        className="p-button-text p-ml-2"
                        onClick={() => navigate("/tasks")}
                    />
                </div>
            </Card>
        </div>
    );
};

export default TaskFormPage;
