import React from 'react';

export const ProjectContext = React.createContext({
    projectName: '' as string | null,
    projectType: '',
    setProjectName: (name: string) => { console.log(name); },
    setProjectType: (type: string) => { console.log(type); },
});