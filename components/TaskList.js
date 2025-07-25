import { ScrollView } from "react-native";
import TaskItem from "./TaskItem";
import styles from "./style"; 

const TaskList = ({
    tasks,
    handleEditTask,
    handleToggleCompletion,
    handleDeleteTask,
}) => {
    return (
        <ScrollView style={styles.taskList}>
            {tasks.map((t) => (
                <TaskItem
                    key={t.id}
                    task={t}
                    handleEditTask={handleEditTask}
                    handleToggleCompletion={handleToggleCompletion}
                    handleDeleteTask={handleDeleteTask}
                />
            ))}
        </ScrollView>
    );
};

export default TaskList;
