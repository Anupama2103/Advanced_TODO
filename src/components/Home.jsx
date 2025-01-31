import React from "react"
import Navbar from "./Navbar"
import Todo from "./Todo"

const Home = () => {


    return (
        <div>
            <Navbar></Navbar>
            <div className=" flex p-2 items-center justify-center">
                <Todo></Todo>
            </div>
        </div>
    )
}

export default Home