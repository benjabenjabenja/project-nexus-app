/* eslint-disable react/prop-types */

function TableUsers({ users }) {
    console.log({users})
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>User Name</th>
                    <th>User Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>asdfa</td>
                    <td>asdf</td>
                    <td>asdf</td>
                </tr>
            </tbody>
        </table>
    );
}

export default TableUsers;
