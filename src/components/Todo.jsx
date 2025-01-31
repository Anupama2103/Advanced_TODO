import { useEffect, useState } from "react"



const Todo = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    let [taskInput, setTaskInput] = useState("");
    const [allTasks, setAllTasks] = useState([]);

    //add new task
    const addNewTask = () => {

        // if no task added
        taskInput = taskInput.trim();
        if (!taskInput) {
            alert("Enter task to add..");
            return;
        }

        //finding the logged in user tasks
        const userTasks = allTasks.find((task) => task.email == loggedInUser.email);
        console.log("user tasks>>", userTasks);

        if (!userTasks) {
            // if no tasks of current logged in user
            allTasks.push({ email: loggedInUser?.email, tasks: [taskInput] });
        } else {
            userTasks.tasks.push(taskInput);
        }

        localStorage.setItem("allTasks", JSON.stringify(allTasks));
        setTaskInput("");

    }

    // delete a task
    const deleteTask = (index) => {

        const currUserTasks = allTasks.find((task) => task.email === loggedInUser.email);

        currUserTasks.tasks.splice(index, 1);

        localStorage.setItem("allTasks", JSON.stringify(allTasks));
        fetchAllStoredTasks();  
    }


    // fetching all the tasks of all the users
    const fetchAllStoredTasks = () => {
        const storedTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
        console.log("stored Tasks >>", storedTasks);
        setAllTasks(storedTasks);
    }
    useEffect(() => {
        fetchAllStoredTasks();
    }, []);


    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        // console.log("logged user >>", loggedUser);
        setLoggedInUser(loggedUser);
    }, []);

    return (
        <div className=" w-full md:w-[80%] mt-5">
            <h1 className=" font-bold text-center text-3xl mb-6"> Add your Tasks </h1>

            <div className=" flex flex-col gap-2">

                <input
                    type="text"
                    placeholder="Enter task"
                    className=" w-full border-0 p-3 bg-gray-700 rounded-md"
                    onChange={(e) => setTaskInput(e.target.value)}
                    value={taskInput}>
                </input>
                <button className="w-40 items-center font-bold rounded-lg p-2 cursor-pointer bg-green-900" onClick={() => addNewTask()}>Add Task</button>
            </div>

            {/* rendering tasks */}
            <section className=" p-1 mt-5 flex flex-col gap-5">
                <h1 className=" font-bold text-center text-3xl"> Tasks </h1>
                {allTasks?.find((task) => task.email === loggedInUser.email)?.tasks?.map((task, index) => (
                    <div key={index} className=" flex flex-col items-center justify-between gap-5">
                        <p className=" border-0 p-3 bg-gray-700 w-full text-center">{task}</p>
                        <button className=" font-bold rounded-lg p-2 cursor-pointer bg-red-900" onClick={() => deleteTask(index)}>Completed</button>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default Todo