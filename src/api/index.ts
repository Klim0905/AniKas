import axios from "axios"

export const $api = axios.create({
        baseURL: "https://anilibria.top/api/v1"
})
