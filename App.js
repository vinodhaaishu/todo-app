import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import styles from "./components/style"; 
const App = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "Pending",
        deadline: "",
        createdAt: "",
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [validationError, setValidationError] = useState(false);

    const handleAddTask = () => {
        if (task.title.trim() !== "" && task.deadline !== "") {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();

            if (editingTask) {
                const updatedTasks = tasks.map((t) =>
                    t.id === editingTask.id ? { ...t, ...task } : t
                );
                setTasks(updatedTasks);
                setEditingTask(null);
            } else {
                const newTask = {
                    id: Date.now(),
                    ...task,
                    createdAt: formattedDate,
                };
                setTasks([...tasks, newTask]);
            }

            setTask({
                title: "",
                description: "",
                status: "Pending",
                deadline: "",
                createdAt: "",
            });
            setModalVisible(false);
            setValidationError(false);
        } else {
            setValidationError(true);
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setTask(task);
        setModalVisible(true);
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter((t) => t.id !== taskId);
        setTasks(updatedTasks);
    };

    const handleToggleCompletion = (taskId) => {
        const updatedTasks = tasks.map((t) =>
            t.id === taskId
                ? {
                      ...t,
                      status: t.status === "Pending" ? "Completed" : "Pending",
                  }
                : t
        );
        setTasks(updatedTasks);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task Manager</Text>
            <TaskList
                tasks={tasks}
                handleEditTask={handleEditTask}
                handleToggleCompletion={handleToggleCompletion}
                handleDeleteTask={handleDeleteTask}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                    setEditingTask(null);
                    setTask({
                        title: "",
                        description: "",
                        status: "Pending",
                        deadline: "",
                        createdAt: "",
                    });
                    setModalVisible(true);
                    setValidationError(false);
                }}
            >
                <Text style={styles.addButtonText}>
                    {editingTask ? "Edit Task" : "Add Task"}
                </Text>
            </TouchableOpacity>
            <TaskModal
                modalVisible={modalVisible}
                task={task}
                setTask={setTask}
                handleAddTask={handleAddTask}
                handleCancel={() => {
                    setEditingTask(null);
                    setTask({
                        title: "",
                        description: "",
                        status: "Pending",
                        deadline: "",
                        createdAt: "",
                    });
                    setModalVisible(false);
                    setValidationError(false);
                }}
                validationError={validationError}
            />
        </View>
    );
};

export default App;
