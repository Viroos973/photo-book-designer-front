export const ROUTES = {
    ROOT: '/',
    PROFILE: {
        ROOT: '/profile'
    },
    EDITORS: {
        $ID: (editorId: string) => `/editors/${editorId}`
    }
}