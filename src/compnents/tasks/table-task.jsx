/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { generateUniqueId } from "../../helpers/unique_id";
import { useEffect, useState } from "react";

function TableTask(props) {
    const { tasks, withActions } = props;
    const [actionClicked, setActionClicked] = useState('');
    const [idClicked, setIdClicked] = useState('');
    const [taskEdited, setTaskEdited] = useState({});

    useEffect(
        () => { 
            const edit_tasks = ({ id }) => {
                // TODO: llamar al update_task.
            }
            edit_tasks({ id: idClicked  });
        }, [actionClicked, idClicked]
    );

    const handlerDelete = ev => {
        ev.preventDefault();
        setIdClicked(tasks[0].id);
        setActionClicked('delete');
    }

    const handlerEdit = () => {
        setActionClicked('edit');
        setIdClicked(tasks[0].id);
    };
    return (
        <Table size="small" className="mx-auto my-6" aria-label="purchases">                 
            <TableHead>
                <TableRow>
                    <TableCell> <strong>Task Description </strong></TableCell>
                    <TableCell> <strong>Status </strong></TableCell>
                    <TableCell> <strong>Limit Date </strong></TableCell>
                    {
                        withActions && <TableCell><strong>Actions </strong></TableCell>
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    tasks && tasks?.map((task) => (
                        <TableRow key={generateUniqueId()}>
                            <TableCell>{task?.taskDescription}</TableCell>
                            <TableCell>
                                {task?.complete ? "Complete" : "Pending"}
                            </TableCell>
                            <TableCell>{task?.limitDate}</TableCell>
                            {
                                withActions && 
                                    <TableCell>
                                        {
                                            withActions && (
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
                                            )
                                        }
                                    </TableCell>
                                
                            }
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}

export default TableTask;
