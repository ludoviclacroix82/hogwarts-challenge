

const checkSession = () =>{
    const session = sessionStorage.getItem('User')

    if(session){

        const sessionParse = JSON.parse(session)
        const currentDate =  new Date().getTime()
        const expireDate = new  Date(sessionParse.expiry* 1000).getTime()

        if(expireDate <= currentDate)
            sessionStorage.removeItem('User')
    }
}

export { checkSession }