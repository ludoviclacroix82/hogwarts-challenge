const checkSession = () =>{
    const session = sessionStorage.getItem('User')

    if(session){

        const sessionParse = JSON.parse(session)
        const currentDate =  new Date().getTime()

        if(sessionParse.expiry > currentDate)
            sessionStorage.removeItem('User')
    }
}

export { checkSession }