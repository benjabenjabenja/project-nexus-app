/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { get_project_by_id, get_projects, update_project } from "../../../services/projects";
import { SET_GET_PROJECTS_SUCCESS } from "../../../store/actions/project.actions";
import { isValidArray } from "../../../helpers/validators";

const useProjects = () => {
    const store = useSelector(state => state.projects);

    const [projects, setProjects] = useState(store ?? []);
    const [project, setProject] = useState({});
    
    const dispatch = useDispatch();
    const { auth } = useAuth();

    // get project specific id
    const getProjectById = async ({ id }) => {
        try {
            const response = await get_project_by_id({ id });
            response && console.log({ projecById: response });
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

        dispatch(SET_GET_PROJECTS_SUCCESS(projectsResponse));

        setProjects(() => auth.role === "ADMIN" ? [...projectsResponse] : [...projectsResponse.filter(
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

    useEffect(
        () => {
            (async function () {
                try {
                    // const res = await updateProject({ id: project.id, ...project});
                } catch (e) {
                    throw new Error(e.message);
                }
            })()
        }, [project]
    )

    return {
        getProjects,
        setProjects,
        projects,
        project,
        updateProject,
        getProjectById,
        updateProjectTasks,
        updateProjectTaskById
    }
}

export default useProjects;