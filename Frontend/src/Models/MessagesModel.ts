// Models/MessagesModels.ts

import axios from 'axios'
import dotenv from 'dotenv'

class Message {
    public content?: string
    public author_id?: string
    public author?: string
    public house?: string
    public created_at?: Date
    public updated_at?: Date

    //public urlApi: any = process.env.VUE_APP_API_URL
    public urlApi: any = "http://localhost:5000/api"

    public constructor(content?: string, author_id?: string, author?: string, house?: string, created_at?: Date, updated_at?: Date) {

        this.content = content
        this.author_id = author_id
        this.author = author
        this.house = house
        this.created_at = created_at
        this.updated_at = updated_at
    }

    public async getMessage(houseParams: string) {
        try {
            const user = sessionStorage.getItem("User")
            if (user) {
                const sessionUser = JSON.parse(user)
                const token = sessionUser.value.token
                const response = await axios.post(`${this.urlApi}/lobby/view/${houseParams}`, {
                    email: sessionUser.value.email
                }, {
                    headers: {
                        'x-auth-token': token
                    }
                })

                return response
            } else {
                console.error("User not found in session storage.")
            }
        } catch (error) {
            console.error("An error occurred while fetching the message:", error)
        }
    }

    public async getMessageId(id: string) {
        try {
            const user = sessionStorage.getItem("User")
            if (user) {
                const sessionUser = JSON.parse(user)
                const token = sessionUser.value.token
                const response = await axios.post(`${this.urlApi}/lobby/${id}`, {
                    email: sessionUser.value.email
                }, {
                    headers: {
                        'x-auth-token': token
                    }
                })

                return response
            } else {
                console.error("User not found in session storage.")
            }
        } catch (error) {
            console.error("An error occurred while fetching the message:", error)
        }
    }

    public async created() {
        try {
            const user = sessionStorage.getItem("User")
            if (user) {
                const sessionUser = JSON.parse(user)
                const token = sessionUser.value.token
                const response = await axios.post(`${this.urlApi}/lobby`, {
                    email: sessionUser.value.email,
                    content: this.content,
                    house: this.house
                }, {
                    headers: {
                        'x-auth-token': token
                    }
                })

                return response
            } else {
                console.error("User not found in session storage.")
            }
        } catch (error) {
            console.error("An error occurred while fetching the message:", error)
        }
    }

    public async update(id : string , content : string) {
        try {
            const user = sessionStorage.getItem("User")
            if (user) {
                const sessionUser = JSON.parse(user)
                const token = sessionUser.value.token
                const response = await axios.put(`${this.urlApi}/lobby/${id}`, {
                    email: sessionUser.value.email,
                    content: content,
                }, {
                    headers: {
                        'x-auth-token': token
                    }
                })

                return response
            } else {
                console.error("User not found in session storage.")
            }
        } catch (error) {
            console.error("An error occurred while fetching the message:", error)
        }
    }

    public async del(id : string) {
        try {
            const user = sessionStorage.getItem("User")
            if (user) {
                const sessionUser = JSON.parse(user)
                const token = sessionUser.value.token
                const response = await axios.delete(`${this.urlApi}/lobby/${id}`, {
                    data: {
                        email: sessionUser.value.email,
                    },
                    headers: {
                        'x-auth-token': token
                    }
                })

                return response
            } else {
                console.error("User not found in session storage.")
            }
        } catch (error) {

        }
    }

}

export default Message