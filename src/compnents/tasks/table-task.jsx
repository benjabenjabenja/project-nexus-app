/* eslint-disable react/prop-types */
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { generateUniqueId } from "../../helpers/unique_id";

function TableTask({ tasks }) {
    return (
        <Table size="small" aria-label="purchases">                 
            <TableHead>
                <TableRow>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Completed</TableCell>
                    <TableCell>Due date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    tasks.map((task) => (
                        <TableRow key={generateUniqueId()}>
                            <TableCell>{task.taskName}</TableCell>
                            <TableCell>
                                {task.completed ? "Completed" : "Pending"}
                            </TableCell>
                            <TableCell>{task.limitDate}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}

export default TableTask;
