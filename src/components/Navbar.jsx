import { useEffect, useState } from "react";

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);


    const handleLogout = () => {
        setLoggedInUser(null);
        localStorage.removeItem("loggedUser");
        window.location.reload();
    }

    // console.log("loggedInUser>>", loggedInUser);
    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        // console.log("logged user >>", loggedUser);
        setLoggedInUser(loggedUser);
    }, []);

    return (
        <div className=" w-full border-b-1 flex items-center justify-between p-4">
            <h1 className=" text-2xl md:text-3xl font-bold text-indigo-700">TODO</h1>
            <div className=" gap-2 flex">
                <button className=" p-2 border rounded-full cursor-pointer font-bold border-white hover:bg-red-500 hover:scale-105" onClick={() => handleLogout()}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar