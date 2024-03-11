/* eslint-disable react-refresh/only-export-components */
import {
    BrowserRouter,
    Route,
    /* RouterProvider, */
    Routes,
} from "react-router-dom";
/* import Layout from "./compnents/layout";
import GestionProjectos, { loader as loaderProjectsData } from "./pages/projects/gestion-projectos";
import Home, { loader as loaderProjects } from "./pages/home";
import CreateProject from "./pages/projects/create-project";
import { action as createProjectAction } from './pages/projects/create-project';
import Project, { loader as projectLoader } from './compnents/projects/project';
import EditProject from "./pages/projects/edit-project";
import { action as editProjectAction } from "./compnents/projects/form-edit-project"
import GestionTasks, { loader as loaderTasks } from "./pages/tasks/gestion-tasks";
import AuthLayout, { loader as loaderRoutes} from "./layouts/auth.layout"; */
import LoginPage from "./pages/auth/login.page";
import RegisterPage from "./pages/auth/register.page";
import ForgotPasswordPage from "./pages/auth/forgot-password.page";
import NewPasswordPage from "./pages/auth/new-password.page";
import ConfirmAccountPage from "./pages/auth/confirm-account.page";
import AuthLayout from "./layouts/auth.layout";

/* const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        loader: loaderRoutes,
        children: [
            {
                path: "/home",
                element: <Home />,
                loader: loaderProjects,
            },
            {
                path: "/projects",
                element: <GestionProjectos />,
                loader: loaderProjectsData,
                children: [
                    {
                        path: '/projects/create-project',
                        element: <CreateProject />,
                        action: createProjectAction,
                    },
                    {
                        path: '/projects/:id',
                        element: <Project />,
                        loader: projectLoader
                    },
                    {
                        path: "/projects/:id/edit",
                        element: <EditProject />,
                        loader: projectLoader,
                        action: editProjectAction
                    }
                ]
            },
            {
                path: "/tasks",
                element: <GestionTasks />,
                loader: loaderTasks
            },
            {
                path: "/control-panel",
                element: <GestionProjectos />,
            },
        ],
    },
]); */

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route index element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage/>} />
                    <Route path="new-password" element={<NewPasswordPage />} />
                    <Route path="confirm/:id" element={<ConfirmAccountPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default Router;
