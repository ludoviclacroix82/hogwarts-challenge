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
            console.log(response.data)

            //sessionStorage login
            const userStorageData = {
                email: response.data.datasUser.email,
                token: response.data.token,
                expire_token : response.data.expire_token
            }
            sessionStorage.setItem("User", JSON.stringify(userStorageData))

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
            console.log(response.data)

            return response
        } catch (error: any) {
            return error.response
        }
    }

    public houseRandom() {

        const houses: string[] = ['Gryffondor', 'Hufflepuff', 'Ravenclaw', 'Slytherin']
        let numberRandom = Math.round(Math.random() * houses.length - 1)

        return houses[numberRandom]

    }
}

export default User