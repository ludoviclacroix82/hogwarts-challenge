// Models/UserModels.ts

import axios from 'axios'
import dotenv from 'dotenv'
//dotenv.config()

class User {
    public email?: string
    public password?: string
    public user_name?: string
    public role?: string
    public house?: string

    //public urlApi: any = process.env.VUE_APP_API_URL
    public urlApi: any = "http://localhost:5000/api"

    public constructor(email?: string, password?: string, user_name?: string, role?: string, house?: string) {
        this.email = email
        this.password = password
        this.user_name = user_name
        this.role = role
        this.house = house
    }


    public async loginUser() {
        try {
            const response = await axios.post(`${this.urlApi}/login`, {
                email: this.email,
                password: this.password,
            })

            //sessionStorage login
            const now = new Date()
            const expire = response.data.expire_token
            const time = expire.replace('h', "") * 60 * 60 * 1000 ///milleseconde

            const userStorageData = {
                email: response.data.datasUser.email,
                token: response.data.token,
                id: response.data.datasUser.id_user,
                // house: response.data.datasUser.house,
                // user_name: response.data.datasUser.user_name,
                // role: response.data.datasUser.role
            }

            const dataStorage = {
                value: userStorageData,
                expiry: now.getTime() + time
            }

            sessionStorage.setItem("User", JSON.stringify(dataStorage))

            return response
        } catch (error: any) {
            return error.response
        }
    }

    public async registerUser() {
        try {
            const response = await axios.post(`${this.urlApi}/register`, {
                email: this.email,
                user_name: this.user_name,
                password: this.password,
                house: this.houseRandom()
            })

            return response
        } catch (error: any) {
            return error.response
        }
    }

    public houseRandom(): string {
        const houses: string[] = ['Gryffondor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
        let numberRandom = Math.floor(Math.random() * houses.length)

        return houses[numberRandom];
    }

    public logout() {
        sessionStorage.removeItem('User')
    }

    public async getUser(id: Number) {

        try {
            const user = sessionStorage.getItem("User")
            if (user) {
                const sessionUser = JSON.parse(user)
                const token = sessionUser.value.token
                const response = await axios.post(`${this.urlApi}/users/${id}`, {
                    email: sessionUser.value.email
                }, {
                    headers: {
                        'x-auth-token': token
                    }
                })
                return response
            }
           
        } catch (error: any) {
            return error.response
        }

    }
}

export default User