import React, {useMemo, useState} from 'react';
import {ProjectContext} from "@/shared/contexts/project/ProjectContext";
import {PROJECT_TYPES} from "@/utils/constants/projectTypes";

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projectName, setProjectName] = useState<string | null>(null);
    const [projectType, setProjectType] = useState(PROJECT_TYPES.EDITOR);

    const value = useMemo(
        () => {
            return ({
                projectName: projectName,
                projectType: projectType,
                setProjectName,
                setProjectType
            })
        },
        [projectName, projectType]
    );

    return (<ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>);
};