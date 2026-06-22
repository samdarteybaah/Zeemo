export const setToken = (token) => localStorage.setItem("zeemo_token", token)
export const getToken = () => localStorage.getItem("zeemo_token")
export const removeToken = () => localStorage.removeItem("zeemo_token")

export const setUser = (user) => localStorage.setItem("zeemo_user", JSON.stringify(user))
export const getUser = () => JSON.parse(localStorage.getItem("zeemo_user") || "{}")
export const removeUser = () => localStorage.removeItem("zeemo_user")