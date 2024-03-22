/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { delete_project, get_project_by_id, get_projects, update_project } from "../../../services/projects";
import { SET_GET_PROJECTS_SUCCESS } from "../../../store/actions/project.actions";
import { isValidArray } from "../../../helpers/validators";
import { get_users } from "../../../services/users";

const useProjects = () => {
    const store = useSelector(state => state.projects);

    const [projects, setProjects] = useState(store ?? []);
    const [project, setProject] = useState({});

    const [usersList, setUsersList] = useState([]);

    const dispatch = useDispatch();
    const { auth } = useAuth();

    // get project specific id
    const getProjectById = async ({ id }) => {
        try {
            const response = await get_project_by_id({ id });
            if (response) {
                setProject(response);
            }
        } catch (e) {
            throw new Error(e.message);
        }
    }
    // get array projects
    const getProjects = async () => {

        const projectsResponse = await get_projects();

        if (!isValidArray(projectsResponse)) {
            return;
        }
        // verificar que sea admin (no filter ) else filter id by auth user id

        // luego el dispatch
        dispatch(SET_GET_PROJECTS_SUCCESS(projectsResponse));

        
        setProjects(() => auth?.user?.role === "ADMIN" ? [...projectsResponse] : [...projectsResponse.filter(
            v => v?.user?.id === auth?.id
        )]);

    }
    // update projec individual
    const updateProject = async ({ id, ...values }) => {
        const res = await update_project({ id, data: values });
        res && setProject(res);
    }
    // update array tasks
    const updateProjectTasks = async ({ id, tasks: argTasks }) => {
        let tasks = project.tasks || [];
        const body = { ...project, tasks: [...tasks, argTasks] }    
        await updateProject(body);
    }
    // update task individual
    const updateProjectTaskById = async ({ id }) => {
        let tasks = project.tasks || [];
        tasks = tasks.map((v) => {
            if (v.id === id) {
                return { ...v, complete: !v.complete };
            }
            return v;
        });
        await updateProject({ id: project.id, tasks });
    }
    // get usuarios para el form
    const getUsersList = async () => {
        const usersResp = await get_users();
        setUsersList(usersResp.filter( u => u.role !== "ADMIN"));
    }
    const deleteProject = async (id) => {
        const res = await delete_project({ id });
        console.log({ res, id });
        await getProjects();
    }
    return {
        getProjects,
        setProjects,
        projects,
        project,
        setProject,
        updateProject,
        getProjectById,
        updateProjectTasks,
        updateProjectTaskById,
        auth,
        usersList,
        getUsersList,
        deleteProject
    }
}

export default useProjects;