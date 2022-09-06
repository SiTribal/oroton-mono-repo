export type UserType = {
    username?:string,
    loggedIn?: boolean,
    setLoggedInCB: (loggedIn: boolean) => void
}

