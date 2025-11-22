import {useContext} from "react";
import {ProjectContext} from "@/shared/contexts/project/ProjectContext";

export const useProject = () => {
    return useContext(ProjectContext);
};