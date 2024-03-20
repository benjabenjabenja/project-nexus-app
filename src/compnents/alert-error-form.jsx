/* eslint-disable react/prop-types */
import { generateUniqueId } from '../helpers/unique_id';
import { isValidArray } from '../helpers/validators';

function AlertErrorForm({ errors }) {
    return (
        <div className="container mb-4 px-3 py-2 bg-red-700 rounded-md">
            {
                isValidArray(errors) && errors?.map(error => <p className="py-1 text-slate-50" key={generateUniqueId()+ "dsasdfasd"}>{error}</p>)
            }
        </div>
    );
}

export default AlertErrorForm;
