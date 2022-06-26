import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Modal,
  Image,
  ToastAndroid,
  AlertIOS,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import ListItem from "./Components/ListItem.js";
import GoalInput from "./Components/GoalInput.js";
export default function App() {
  const [goalEntered, setGoalEntered] = useState("");
  const [isModalVisible, setModalVisible] = useState(true);
  const [lis, setLis] = useState([]);
  const addGoalHandler = () => {
    if (goalEntered !== "") {
      let temp = lis;
      temp.push({ task: goalEntered, id: Date.now() });
      setLis(temp);
      setGoalEntered("");
      if (Platform.OS === "android") {
        ToastAndroid.show("Goal Added Succesfully! 🎉", ToastAndroid.LONG);
      } else {
        AlertIOS.alert("Goal Added Succesfully! 🎉");
      }
      setModalVisible(false);
    } else {
      if (Platform.OS === "android") {
        ToastAndroid.show("Enter a Goal to Add", ToastAndroid.LONG);
      } else {
        AlertIOS.alert("Enter a Goal to Add");
      }
    }
  };
  return (
    <>
      <StatusBar style="light" />
      <View style={styles?.divlayer1}>
        <Modal animationType="slide" visible={isModalVisible} style={{}}>
          <View style={styles?.inputContainer}>
            <Image
              style={{ width: 180, height: 180 }}
              source={require("./assets/images/goal.png")}
            />
            <GoalInput
              value={goalEntered}
              setGoalEntered={setGoalEntered}
              addGoalHandler={addGoalHandler}
              setModalVisible={setModalVisible}
            />
          </View>
        </Modal>
        <View>
          <Button
            title="Add Goal"
            onPress={() => setModalVisible(true)}
            color="#1256af"
          />
        </View>
        <View style={styles.goalsContainer}>
          <FlatList
            data={lis}
            renderItem={(item) => (
              <ListItem
                text={item?.item?.task}
                id={item?.item?.id}
                lis={lis}
                setLis={setLis}
              />
            )}
            keyExtractor={(item, index) => item?.id}
          ></FlatList>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  divlayer1: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#1e085a",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#1e085a",
  },

  heading: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "monospace",
    fontWeight: "900",
  },
  goalsContainer: {
    flex: 5,
    paddingVertical: 5,
  },
  modalStyle: {},
});
