/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { generateUniqueId } from "../../helpers/unique_id";
import { isValidArray } from "../../helpers/validators";

function TableUsers({ users }) {
    return (
        <Table size="small" className="mx-auto my-6" aria-label="purchases">
            <TableHead>
                <TableRow>
                    <TableCell>
                        <strong>Name </strong>
                    </TableCell>
                    <TableCell>
                        <strong>Email </strong>
                    </TableCell>
                    <TableCell>
                        <strong>Role </strong>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {isValidArray(users) &&
                    users?.map((user) => (
                        <TableRow key={generateUniqueId() + user.id}>
                            <TableCell>{user?.name}</TableCell>
                            <TableCell>{user?.email}</TableCell>
                            <TableCell>{user?.role}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}

export default TableUsers;
