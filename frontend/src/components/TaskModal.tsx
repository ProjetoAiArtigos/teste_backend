import { Modal, Box, Typography, Divider, Stack, Button, IconButton } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/app";
import { clearState } from "../features/tasks/taskSlice";
import CloseIcon from "@mui/icons-material/Close";
import { TaskPriority } from "../app/constants";
import { del, update } from "../features/tasks/taskActions";

interface Task {
    id: string,
    name: string,
    description: string,
    priority: number,
    overdueAt: Date,
    createdBy: string,
    finishedBy?: string,
    finishedDate?: Date
    isFinished: boolean
}

interface Props{
    open: boolean
    task: Task
    reset?: () => void | undefined
    setOpen?: (value: boolean) => void | undefined
}

export default function TaskModal(props: Props) {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(TaskPriority[0]);
    const [overdueAt, setOverdueAt] = useState(new Date());
    const [createdBy, setCreatedBy] = useState("");
    const [finishedBy, setFinishedBy] = useState("");
    const [finishedDate, setFinishedDate] = useState(new Date());

    const handleClose = useCallback(() => {
        if (props.setOpen){
            props.setOpen(false);
        }
    }, [props])

    const handleDelete = useCallback(() => {
        setLoading(true)
        dispatch(del({ id: props.task.id}))
        setLoading(false)
        if (props.setOpen){
            props.setOpen(false);
        }
    }, [props])

    const handleSubmit = useCallback(() => {
        setLoading(true)
        dispatch(update({ 
            id: props.task.id,
            name: props.task.name,
            description: props.task.description,
            priority: props.task.priority,
            overdueAt: props.task.overdueAt,
            isFinished: true
        }))
        setLoading(false)
        if (props.setOpen) {
            props.setOpen(false);
        }
    }, [props])

    useEffect(() => {
        setName(props.task.name)
        setDescription(props.task.description)
        setOverdueAt(new Date(props.task.overdueAt))
        setPriority(TaskPriority[props.task.priority])
        setCreatedBy(props.task.createdBy)
        if (props.task.isFinished) {
            setFinishedBy(props.task.finishedBy ?? "")
            setFinishedDate(props.task.finishedDate ?? new Date())
        }
    }, [])

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, [dispatch]);
    
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 2,
        borderRadius: "8px",
    };

    return (
        <Modal open={props.open} onClose={handleClose}>
            <Box sx={style}>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Typography variant="h4" className="mx-1 mb-2">
                        Informações da Tarefa
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <Divider />
                <Stack direction="column" sx={{ m: 1 }}>
                    <Typography className="mx-1 mb-2 p-2">
                        <b>Nome: </b> {name}
                    </Typography>
                    <Typography className="mx-1 mb-2 p-2">
                        <b>Descrição: </b> {description}
                    </Typography>
                    <Typography className="mx-1 mb-2 p-2">
                        <b>Prioridade: </b> {priority}
                    </Typography>
                    <Typography className="mx-1 mb-2 p-2">
                        <b>Data de vencimento: </b> {overdueAt.toDateString()}
                    </Typography>
                    <Typography className="mx-1 mb-2 p-2">
                        <b>Criado por: </b> {createdBy}
                    </Typography>
                    { props.task.isFinished ?
                        <>
                            <Typography className="mx-1 mb-2 p-2">
                                <b>Concluído por: </b> {finishedBy}
                            </Typography>
                            <Typography className="mx-1 mb-2 p-2">
                                <b>Data de conclusão: </b> {finishedDate.toDateString()}
                            </Typography>
                        </>
                        : null
                    }
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                        disabled={loading}
                        onClick={handleClose}
                        variant="contained"
                        color="secondary"
                    >
                        Cancelar
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={handleDelete}
                        variant="contained"
                        color="error"
                    >
                        Deletar
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={handleSubmit}
                        variant="contained"
                        color="success"
                    >
                        Concluir
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}