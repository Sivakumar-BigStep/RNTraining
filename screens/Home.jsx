import { useState } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Colors from "../styles/colors";
import * as Spacing from "../styles/spacing";
import FunFactCard from "../components/fun-fact-card";
import { useDispatch, useSelector } from "react-redux";
import { addFact } from "../redux/slices/factSlice";

const Styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.DARK,
    ...Spacing.largePadding,
  },
  inputPromptContainer: {
    flex: 1,
  },
  enterANumberText: {
    color: Colors.PRIMARY,
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    ...Spacing.marginVertical,
    ...Spacing.padding,
    backgroundColor: Colors.LIGHT,
    color: "black",
    fontSize: 18,
    borderRadius: 8,
  },
  feedbackContainer: {
    flexDirection: "row",
    width: "100%",
  },
  feedbackButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  feebackButtonText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [currentFact, setCurrentFact] = useState({});

  const facts = useSelector((state) => state.funFact.facts);

  const handleTextInput = (e) => {
    const input = e.nativeEvent.text;
    setCurrentFact({ fact: input, rating: 0 });
  };

  const handleAddFactToRedux = () => {
    // Dispatch addFact action
    dispatch(addFact(currentFact));
    setCurrentFact({});
  };

  return (
    <View style={Styles.background}>
      <View style={Styles.inputPromptContainer}>
        <Text style={Styles.enterANumberText}>Enter a number:</Text>
        <TextInput
          style={Styles.inputContainer}
          value={currentFact?.fact}
          onChange={handleTextInput}
        />
        <Text>PLACEHOLDER FOR THE ACTUAL FUN FACT</Text>

        <Button title="Add Fun Fact" onPress={handleAddFactToRedux} />

        {facts.map((obj, index) => (
          <FunFactCard
            key={index}
            funFact={{ fact: obj.fact, rating: obj.rating }}
          />
        ))}
      </View>
      <View style={Styles.feedbackContainer}>
        <TouchableOpacity style={Styles.feedbackButton}>
          <Text style={[Styles.feebackButtonText, { color: Colors.PRIMARY }]}>
            LIKE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.feedbackButton}>
          <Text style={[Styles.feebackButtonText, { color: Colors.SECONDARY }]}>
            DISLIKE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;
