
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function useViewProject() {
    const { projectId } = useParams();
    const projects = useSelector(state => state?.getProjects?.data);
    const data = projects.find(v => v.id === projectId);

    return {
        data
    }
}

export default useViewProject;
