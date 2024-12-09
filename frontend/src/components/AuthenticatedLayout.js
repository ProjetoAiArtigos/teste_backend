import React from "react";
import AuthMenu from "./AuthMenu";

const AuthenticatedLayout = ({ children }) => {
    return (
        <div>
            <AuthMenu />
            <div className="p-4">{children}</div>
        </div>
    );
};

export default AuthenticatedLayout;
