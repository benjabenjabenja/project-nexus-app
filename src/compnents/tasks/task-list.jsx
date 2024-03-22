/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { generateUniqueId } from "../../helpers/unique_id";
import { isValidArray } from "../../helpers/validators";

function TaskList({ tasks }) {

    return (
        <Table size="small" className="mx-auto my-6" aria-label="purchases">
            <TableHead>
                <TableRow>
                    <TableCell>
                        <strong>Task Description </strong>
                    </TableCell>
                    <TableCell>
                        <strong>Status </strong>
                    </TableCell>
                    <TableCell>
                        <strong>Limit Date </strong>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {isValidArray(tasks) &&
                    tasks?.map((task) => (
                        <TableRow key={generateUniqueId() + task.id}>
                            <TableCell>{task?.taskDescription}</TableCell>
                            <TableCell>
                                {task?.complete ? "complete" : "pending"}
                            </TableCell>
                            <TableCell>{task?.limitDate}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}

export default TaskList;
