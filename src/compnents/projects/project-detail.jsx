/* eslint-disable react/prop-types */

import { Box, Fab, Grid, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { isValidArray } from "../../helpers/validators";
import TableUsers from "../users/table-users.jsx";
import TableTask from "../tasks/table-task";

const classes = {
    customFab: {
        backgroundColor: 'bg-slate-900',
        color: 'white'
    }
}

const AddTasks = () => {
    const handdlerAddTasks = ev => {
        ev.preventDefault();

    }
    return (
        <Fab
            title="add tasks"
            onClick={handdlerAddTasks}
            classes={classes.customFab}
            aria-label="add"
            variant="extended"
            size="small"
        >
            <AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} /> Add Tasks
        </Fab>
    );
}
const AddUsers = () => {
    const handdlerAddTasks = ev => {
        ev.preventDefault();

    }
    return (
        <Fab
            title="add members"
            onClick={handdlerAddTasks}
            classes={classes.customFab}
            aria-label="add"
            variant="extended"
            size="small"
        >
            <AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} /> Add Users
        </Fab>
    );
}

const ProjectDetail = ({ project }) => {
    return (
        <main className="p-4 mx-4 w-full">
            <Grid container>
                <Grid className="py-3" item xs={12} sm={12} md={4} lg={4}>
                    Project Name: <strong>{` ${project?.projectName}`} </strong>
                </Grid>
                <Grid className="py-3" item xs={12} sm={12} md={4} lg={4}>
                    Limit Date: <strong>{` ${project.limitDate ?? '-'}`}</strong>
                </Grid>
                <Grid className="py-3" item xs={12} sm={12} md={6} lg={6}>
                    Project Description: <strong>{` ${project.description ?? 'Empty Description'}`} </strong>
                </Grid>
            </Grid>
            <section>
                {
                    isValidArray(project.tasks) ? (
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Tasks
                            </Typography>
                            <TableTask tasks={project.tasks} />
                        </Box>
                    ) :
                    (<Box sx={{ margin: 1 }}>
                        <section className="flex items-center px-10 py-6 my-auto">
                            <p className="font-semibold mr-2">No task in this project.</p>
                            <AddTasks />
                        </section>
                    </Box>)
                }
            </section>
            <section>
                {
                    isValidArray(project.users) ? (
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Members
                            </Typography>
                            <TableUsers tasks={project.users} />
                        </Box>
                    ) : 
                    (<Box sx={{ margin: 1 }}>
                        <section className="flex items-center px-10 py-6 my-auto">
                            <p className="font-semibold mr-2">No members in this project.</p>
                            <AddUsers />
                        </section>
                    </Box>)
                }
            </section>
        </main>
    );
}
export default ProjectDetail;