import { View, Text, TextInput, Button, Modal } from "react-native";
import styles from "./style";
import { Calendar } from "react-native-calendars";

const TaskModal = ({
    modalVisible,
    task,
    setTask,
    handleAddTask,
    handleCancel,
    validationError,
}) => {
    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={false}>
            <View style={styles.modalContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={task.title}
                    onChangeText={(text) =>
                        setTask({ ...task, title: text })
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={task.description}
                    onChangeText={(text) =>
                        setTask({ ...task, description: text })
                    }
                />
                <Text style={styles.inputLabel}>Deadline:</Text>
                <Calendar
                    style={styles.datePicker}
                    markedDates={
                        task.deadline
                            ? { [task.deadline]: { selected: true, selectedColor: '#007BFF' } }
                            : {}
                    }
                    onDayPress={(day) =>
                        setTask({ ...task, deadline: day.dateString })
                    }
                    current={task.deadline}
                />
                {validationError && (
                    <Text style={styles.errorText}>
                        Please fill in all fields correctly.
                    </Text>
                )}
                <Button
                    title={task.id ? "Update" : "Add"}
                    onPress={handleAddTask}
                    color="#007BFF"
                />
                <Button
                    title="Cancel"
                    onPress={handleCancel}
                    color="#FF3B30"
                />
            </View>
        </Modal>
    );
};

export default TaskModal;
