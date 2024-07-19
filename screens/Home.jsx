import { useState } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from "react-native";
import * as Colors from "../styles/colors";
import * as Spacing from "../styles/spacing";
import FunFactCard from "../components/fun-fact-card";
import { useDispatch, useSelector } from "react-redux";
import { addFact, resetFunFact } from "../redux/slices/factSlice";
import { useQuery } from 'react-query';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState(null);
  const [numberId, setNumberId] = useState(null);
  const facts = useSelector((state) => state.funFact.facts);
  const { isLoading, error, isError } = useQuery({
    queryKey: [`fact-${numberId}`],
    queryFn: async () => {
      const response = await fetch(`http://numbersapi.com/${numberId}?json`);
      return await response.json();
    },
    enabled: !!numberId,
    retry: false,
    onSuccess: (data) => {
      handleAddFactToRedux(data.text);
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
      setNumberId(null)
      setTextInput(null);
    },
  })

  const handleAddFactToRedux = (fact) => {
    dispatch(addFact({ fact, rating: 0 }));
    setNumberId(null)
    setTextInput(null);
  };

  return (
    <View style={Styles.background}>
      <ScrollView style={Styles.inputPromptContainer}>
        <Text style={Styles.enterANumberText}>Enter a number:</Text>

        <View>
          <TextInput
            style={Styles.inputContainer}
            defaultValue={textInput}
            onChangeText={setTextInput}
            keyboardType='numeric'
          />
          <View style={Styles.buttonContainer}>
            <Button title="Clear" onPress={() => dispatch(resetFunFact())} color="lightgray" />
            <Button title="Add Fun Fact" onPress={() => setNumberId(textInput)} />
          </View>
        </View>

        {facts.map((obj, index) => (
          <FunFactCard
            key={index}
            funFact={{ fact: obj.fact, rating: obj.rating }}
          />
        ))}

        {isLoading && <Text style={Styles.textColor}>Loading...</Text>}

        {isError && <Text style={Styles.textColor}>{error?.message}</Text>}

      </ScrollView>

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

const Styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.DARK,
    ...Spacing.largePadding,
  },
  inputPromptContainer: {
    flex: 1,
    maxHeight: '100%',
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
  buttonContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  textColor: {
    color: Colors.LIGHT,
    flex: 1,
    textAlign: "center",
  }
});

export default HomeScreen;
