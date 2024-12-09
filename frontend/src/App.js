import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskListPage from "./pages/TaskListPage";
import TaskFormPage from "./pages/TaskFormPage";
import AuthenticatedLayout from "./components/AuthenticatedLayout";

function App() {
    const isAuthenticated = !!localStorage.getItem("authToken");

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {isAuthenticated && (
                    <>
                        <Route
                            path="/tasks"
                            element={
                                <AuthenticatedLayout>
                                    <TaskListPage />
                                </AuthenticatedLayout>
                            }
                        />
                        <Route
                            path="/tasks/new"
                            element={
                                <AuthenticatedLayout>
                                    <TaskFormPage />
                                </AuthenticatedLayout>
                            }
                        />
                        <Route
                            path="/tasks/edit/:id"
                            element={
                                <AuthenticatedLayout>
                                    <TaskFormPage />
                                </AuthenticatedLayout>
                            }
                        />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;
