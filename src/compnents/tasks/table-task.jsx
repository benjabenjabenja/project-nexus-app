/* eslint-disable react/prop-types */
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { generateUniqueId } from "../../helpers/unique_id";

function TableTask(props) {
    const { tasks, withActions, setActionClicked, setIdClicked } = props;
    const handlerDelete = ev => {
        ev.preventDefault();
        setActionClicked('delete');
    }

    const handlerEdit = () => {
        setActionClicked('edit');
        setIdClicked(tasks[0].id);
    };
    return (
        <Table size="small" aria-label="purchases">                 
            <TableHead>
                <TableRow>
                    <TableCell>Task Name</TableCell>
                    <TableCell>Completed</TableCell>
                    <TableCell>Limit Date</TableCell>
                    {
                        withActions && <TableCell>Actions</TableCell>
                    }
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
                            {
                                withActions && (
                                    <TableCell className={`${withActions ? 'block' : 'hidden'}`}>
                    {withActions && (
                        <>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={handlerEdit}
                                color='primary'
                                title={'edit project'}
                            >
                                <EditOutlinedIcon />
                            </IconButton>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={handlerDelete}
                                color='error'
                                title={'delete project'}
                            >
                                <DeleteOutlineOutlinedIcon />   
                            </IconButton>
                        </>
                    )}
                </TableCell>
                                )
                            }
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}

export default TableTask;
