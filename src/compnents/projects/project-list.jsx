/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { generateUniqueId } from "../../helpers/unique_id";
import { isValidArray } from "../../helpers/validators";
import TaskList from "../tasks/task-list";

function Row({ project, isAdmin, setActionClicked, setIdClicked, deleteProject }) {
    const [open, setOpen] = useState(false);

    const handlerDelete = (id,ev) => {
        ev.preventDefault();
        setActionClicked("delete");
        const deleting = confirm("Are you sure to delete this element?");
        deleting && (async function () {
            await deleteProject(id);
            
        })();
    };

    const handlerEdit = () => {
        setActionClicked("edit");
        setIdClicked(project.id);
    };

    const handlerVerProyecto = () => {
        setActionClicked("ver");
        setIdClicked(project.id);
    };
    const isComplete = useMemo(
        () => project.tasks.some((t) => !t.complete),
        [project]
    );

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                {/* Arrow Icon row */}
                <TableCell>
                    {isValidArray(project.tasks) ? (
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? (
                                <KeyboardArrowUpIcon />
                            ) : (
                                <KeyboardArrowDownIcon />
                            )}
                        </IconButton>
                    ) : (
                        ""
                    )}
                </TableCell>
                <TableCell component="th" scope="row">
                    {project?.projectName}
                </TableCell>
                <TableCell>{project?.limitDate}</TableCell>
                <TableCell>{project?.description}</TableCell>
                <TableCell> <span className={`${isComplete ? 'text-red-700' : 'text-green-700'}`}>{!isComplete ? "completed" : "pending"}</span></TableCell>
                {/* actions edit/delete */}

                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={handlerEdit}
                        color="primary"
                        title={"edit project"}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                    {isAdmin && (
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={(e) => handlerDelete(project.id,e)}
                                color="error"
                                title={"delete project"}
                            >
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                    )}
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={handlerVerProyecto}
                        title={"project detail"}
                    >
                        <VisibilityOutlinedIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Tasks
                            </Typography>
                            <TaskList tasks={project.tasks} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default function ProjectList({
    projects,
    isAdmin,
    setActionClicked,
    setIdClicked,
    deleteProject
}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Project Name</TableCell>
                        <TableCell>Limit Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((row) => (
                        <Row
                            key={generateUniqueId()}
                            isAdmin={isAdmin}
                            setActionClicked={setActionClicked}
                            project={row}
                            setIdClicked={setIdClicked}
                            deleteProject={deleteProject}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
