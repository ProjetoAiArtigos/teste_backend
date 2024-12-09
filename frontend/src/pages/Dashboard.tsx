import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/app";
import { create, list } from "../features/tasks/taskActions";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { TaskPriority } from "../app/constants";
import TaskCalendar from "../components/TaskCalendar";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const priorities = Object.keys(TaskPriority).filter((item) => {
    if (isNaN(parseInt(item))) {
      return item
    }
    else {
      return null
    }
  }).map((label) => ({ label, value: TaskPriority[label as keyof typeof TaskPriority] }));
  const [priority, setPriority] = useState(0);
  const [overdueAt, setOverdueAt] = useState(new Date());
  const user = useAppSelector((state) => state.user);

  const handleSubmit = () => {
    setLoading(true);
    dispatch(create({ name, description, priority, overdueAt }));
    dispatch(list());
    setLoading(false);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onChangeOverdueAt = (e: Moment | null) => {
    setOverdueAt(moment(e).toDate());
  };

  const onChangePriority = (e: SelectChangeEvent) => {
    setPriority(parseInt(e.target.value));
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {user.role === 1 ?
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            id="name"
            autoFocus
            value={name}
            onChange={onChangeName}
            required
            variant="standard"
          />
          <TextField
            label="Descrição"
            fullWidth
            margin="normal"
            id="description"
            autoFocus
            value={description}
            onChange={onChangeDescription}
            required
            variant="standard"
          />
          <DatePicker
            label="Vencimento"
            autoFocus
            value={moment(overdueAt)}
            onChange={onChangeOverdueAt}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <FormControl fullWidth>
            <InputLabel>Prioridade</InputLabel>
            <Select
              fullWidth
              id="priority"
              autoFocus
              value={priority.toString()}
              onChange={onChangePriority}
              required
              variant="standard"
            >
              { priorities.map((item) => 
              <MenuItem
                key={item.label}
                value={item.value}
              >
                {item.label}
              </MenuItem>)}
            </Select>
          </FormControl>
          <Button
            type="submit"
            color="secondary"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "white" }}
            disabled={loading || !name || !description || !overdueAt}
            onClick={handleSubmit}
          >
            Adicionar Tarefa
          </Button>
        </Stack>
        : <></>}
      <TaskCalendar />
    </Stack>
  );
}
