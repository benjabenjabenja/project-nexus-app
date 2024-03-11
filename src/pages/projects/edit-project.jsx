import { useLoaderData } from "react-router-dom";
// eslint-disable-next-line react-refresh/only-export-components
function EditProject() {
    const project = useLoaderData();
    console.log("prj", project);
    
    return (
        <>
            <h1 className="text-2xl text-center font-bold">Edit Project: { `` } </h1>
        </>
    );
}

export default EditProject;
