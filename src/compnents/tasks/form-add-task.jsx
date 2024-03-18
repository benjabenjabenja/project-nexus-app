/* eslint-disable no-unused-vars */
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Form } from 'react-router-dom'

function FormAddTask() {
    const [description, setDescription] = useState('');
    const [members, setMembers] = useState([]);
    const [limitDate, setLimitDate] = useState('');

    useEffect(
        () => {
            
                const date = limitDate.split('/').reverse().join('-');
                setLimitDate(date);
        }, [limitDate]
    );

    return (
        <Form method='post'>
            {/* input description */}
            <div className="flex items-center mb-2">
                <label className="text-left w-1/6 font-black" htmlFor="outlined-basic-description">Descripcion</label>
                <TextField
                    fullWidth
                    id="outlined-basic-description"
                    name="description"
                    variant="outlined"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                />
            </div>
            {/* input limit date */}
            <div className="flex items-center mb-2">
                <TextField
                    fullWidth
                    type="date"
                    name="limitDate"
                    id="limit-date"
                    value={limitDate}
                    onChange={ev => {
                        const date = limitDate.split('/').reverse().join('-');
                        setLimitDate(date);
                    }}
                />
            </div>
        </Form>
    );
}

export default FormAddTask
