/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { generateUniqueId } from "../../helpers/unique_id";
import { isValidArray } from "../../helpers/validators";

function TableTask({
    tasks,
    isAdmin,
    setTasks,
    setTask
}) {
    const handleCheck = (e, task) => {
        
        const { checked } = e.target;
        let t = [...tasks];

        let find = t.find(v => v.id === task.id);
        find.complete = checked;
        
        const i = t.findIndex((v) => v.id === find.id);
        t[i] = find;
        
        setTasks(t);
    }

    const handleEdit = (task) => {
        setTask(task);
    };
    
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
                    <TableCell>
                        <strong>Actions </strong>
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
                            
                            <TableCell>
                                {/* edit button */}
                                {isAdmin && (
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => {
                                            handleEdit(task);
                                        }}
                                        color="primary"
                                        title={"edit project"}
                                    >
                                        <EditOutlinedIcon />
                                    </IconButton>
                                )}
                                    {/* ckeck input */}
                                    <Checkbox
                                        checked={task.complete}
                                        onChange={ e => handleCheck(e,task) }
                                    />
                                </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}

export default TableTask;
