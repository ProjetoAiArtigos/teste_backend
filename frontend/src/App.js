import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskListPage from "./pages/TaskListPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layout/AppLayout";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
                            <AppLayout>
                                <TaskListPage />
                            </AppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tasks/new"
                    element={
                        <ProtectedRoute>
                            <AppLayout>
                                <TaskFormPage />
                            </AppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tasks/edit/:id"
                    element={
                        <ProtectedRoute>
                            <AppLayout>
                                <TaskFormPage />
                            </AppLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
