import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    let [email, setEmail] = useState("");
    let [username, setUserName] = useState("");
    let [password, setPassword] = useState("");
    let [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validateForm = () => {
        let newErrors={};

        const emailPtrn = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email){
            newErrors.email = "Email is required";
        }else if(!emailPtrn.test(email)){
            newErrors.email = "Invalid email format";
        }

        if(!username){
            newErrors.username = "Username is required";
        }else if(username.length < 3){
            newErrors.username = "Username must be at least 3 characters";
        }

        let passwordPtrn = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/

        if(!password){
            newErrors.password = "Password is required";
        }else if(!passwordPtrn.test(password)){
            newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0
            
        } 


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateForm()){
            return;
        }

        console.log("email>>", email);
        console.log("username>>", username);
        console.log("password>>", password);


        // fetching all users data from local storage
        const users = JSON.parse(localStorage.getItem("allUsers")) || [];
        console.log("users >>", users);

        const hasUser = users.find((user) => user.email === email);

        if (hasUser !== undefined) {
            alert("User already exist with this email");
            return;
        }

        users.push({ email, username, password });
        localStorage.setItem("allUsers", JSON.stringify(users));


        alert("Account created successfully");
        navigate("/login")
    }

    return (
        <div className=" w-[100vw] h-[100vh] flex items-center justify-center">

            <div className=" p-5 min-w-[280px] md:min-w-sm">
                <h1 className=" font-bold text-4xl mt-5 text-center text-indigo-700">ToDO</h1>
                <p className=" text-small text-gray-300 text-center"> Register </p>

                <form className=" flex flex-col gap-4 my-8" onSubmit={handleSubmit}>
                    <div className=" flex flex-col gap-2">
                        <label className=" font-bold text-xl">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className=" outline-none bg-transparent"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                        </input>
                        {errors.email && <p className=" text-red-500">{errors.email}</p>}
                    </div>
                    <div className=" flex flex-col gap-2">
                        <label className=" font-bold text-xl">Username:</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            className=" outline-none"
                            required
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}>
                        </input>
                        {errors.username && <p className=" text-red-500">{errors.username}</p>}
                    </div>
                    <div className=" flex flex-col gap-2">
                        <label className=" font-bold text-xl">Password:</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className=" outline-none"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </input>
                        {errors.password && <p className=" text-red-500">{errors.password}</p>}
                    </div>
                    <button type="submit" className=" font-bold bg-indigo-700 p-2 rounded-lg text-medium cursor-pointer">SignUp</button>
                    <p className=" text-medium text-center">Already have an account <Link to={"/login"} className=" text-white-800 font-bold underline">Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup