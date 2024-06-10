const signup = (req, res) => {
    res.send("Signed up")
}

const login = (req, res) => {
    res.send("logged in")
}

const logout = (req, res) => {
    res.send("logout")
}

export {
    signup,
    login,
    logout
}