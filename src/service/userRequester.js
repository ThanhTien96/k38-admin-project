import axiosRequester from "../http/instance";

class UserRequester {
    static async singup (payload) {
        return await axiosRequester({
            url: "/user",
            method: "POST",
            data: payload
        })
    };

    static async listUser() {
        return await axiosRequester({
            url: "/user",
            method: "GET"
        })
    }
}

export default UserRequester;