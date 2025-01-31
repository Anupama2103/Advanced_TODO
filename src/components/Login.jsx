import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Password doesn't match");
            return;
        }else{


        console.log("email>>", email);
        console.log("password>>", password);

        // fetching all users data from local storage
        const users = JSON.parse(localStorage.getItem("allUsers")) || [];

        // if not all users data then return
        if (users == null) {
            alert("No user with such email exist");
            return;
        }

        // fetching data
        const hasUser = users.find((user) => user.email === email);

        if (hasUser === undefined) {
            alert("No user with such email exist");
            return;
        }

        const loggedUser = {
            email: hasUser.email,
            username: hasUser.username
        };

        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
        alert("user logged in successfully ...");

        // navigating to home page
        window.location.reload();
        navigate("/");
    }
}

    return (
        <div className=" w-[100vw] h-[100vh] flex items-center justify-center">

            <div className=" p-5 min-w-[280px] md:min-w-sm">
                <h1 className=" font-bold text-4xl mt-5 text-center text-white-800">Login</h1>
                

                <form className=" flex flex-col gap-4 my-8" onSubmit={handleSubmit}>
                    <div className=" flex flex-col gap-2">
                        <label className=" font-bold text-xl">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className=" outline-none"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    <div className=" flex flex-col gap-2">
                        <label className=" font-bold text-xl">Password:</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className=" outline-none"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <label className=" font-bold text-xl">Confirm Password:</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className=" outline-none"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                    </div>

                    <button type="submit" className=" font-bold bg-indigo-700 p-2 rounded-lg text-medium cursor-pointer">Login</button>
                    <p className=" text-medium text-center">Click for <Link to={"/signup"} className=" text-white-800 font-bold underline">SignUp</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login