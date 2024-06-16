import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useLogin = () => {
    const [ loading, setLoading ] = useState(false)
    const { setAuthUser } = useAuthContext()

    const login = async ({ username, password }) => {
        const success = handleInputErrors({ username, password })
        if(!success)  return

        setLoading(true)
        try {
            const res = await fetch('/api/v1/auth/login', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ username, password })
            })

            const data = await res.json()

            if(data.error){
                throw new Error(data.error)
            }

            if(data.success){
                toast.success(data.success)
            }

            localStorage.setItem("user-info", JSON.stringify(data.data))
            setAuthUser(data.data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, login }
}

export default useLogin

const handleInputErrors = ({ username, password }) => {
    if(!username || !password){
        toast.error("All fields are required")
        return false
    }

    return true
}