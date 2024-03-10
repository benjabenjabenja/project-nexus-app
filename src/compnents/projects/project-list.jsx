/* eslint-disable react/prop-types */
/* import { generateUniqueId } from "../../helpers/unique_id";

const ProjectList = ({ projects }) => {
    return (
        projects.map(p => (<div key={generateUniqueId()}>{ p.name }</div>))
    );
}

export default ProjectList; */

import * as React from "react";
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
import { generateUniqueId } from "../../helpers/unique_id";
import { isValidArray } from "../../helpers/validators";

function Row(props) {
    const { project } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
                        <p></p>
                    )}
                </TableCell>
                <TableCell component="th" scope="row">
                    {project.projectName}
                </TableCell>
                <TableCell>{project.limitDate}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.status}</TableCell>
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
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Project Name</TableCell>
                                        <TableCell>Completed</TableCell>
                                        <TableCell>Due date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {project.tasks.map((historyRow) => (
                                        <TableRow
                                            key={generateUniqueId()}
                                        >
                                            <TableCell>
                                                {historyRow.taskName}
                                            </TableCell>
                                            <TableCell>
                                                {historyRow.completed
                                                    ? "Completed"
                                                    : "Pending"}
                                            </TableCell>
                                            <TableCell>
                                                {historyRow.limitDate}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

/* const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
]; */

export default function CollapsibleTable({ projects }) {
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((row) => (
                        <Row key={generateUniqueId()} project={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
