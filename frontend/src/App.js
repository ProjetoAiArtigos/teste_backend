import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskListPage from "./pages/TaskListPage";
import TaskFormPage from "./pages/TaskFormPage";
import AuthenticatedLayout from "./components/AuthenticatedLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    const isAuthenticated = !!localStorage.getItem("authToken");

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
                            <AuthenticatedLayout>
                                <TaskListPage />
                            </AuthenticatedLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tasks/new"
                    element={
                        <ProtectedRoute>
                            <AuthenticatedLayout>
                                <TaskFormPage />
                            </AuthenticatedLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tasks/edit/:id"
                    element={
                        <ProtectedRoute>
                            <AuthenticatedLayout>
                                <TaskFormPage />
                            </AuthenticatedLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
