import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AsyncStorage } from "react-native";

const movies = {
  "start-wars": {
    title: "start-wars"
  },
  alien: {
    title: "alien"
  }
};

const movie = {
  tron: {
    title: "tron"
  }
};

// These 3 methos can be moved to an API file
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Error saving data
    console.log("Error 1: ", error);
  }
};

const mergeData = async (key, value) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (error) {
    // Error saving data
    console.log("Error 1: ", error);
  }
};

const retrieveData = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    // Error retrieving data
    console.log("Error 2: ", error);
  }
};

const clearData = () => AsyncStorage.clear();

export default class App extends React.Component {
  componentDidMount() {
    // STEP 1: Save some data in the devices local storage
    storeData("movies", movies);

    //  STEP 2: Retrieved saved data in local storage
    retrieveData("movies").then(moviesInAsyncStorage => {
      moviesInAsyncStorage = JSON.parse(moviesInAsyncStorage);
      console.log("moviesInAsyncStorage: ", moviesInAsyncStorage);
    });

    // STEP 3: Comment out the code on STEP 1 to see that the content is
    //  still there and retrieved from STEP 2.

    // STEP 4. Add a new movie into the local storage

    mergeData("movies", movie);

    // STEP 5. See if we have now 3 movies or 1:
    retrieveData("movies").then(moviesInAsyncStorage => {
      moviesInAsyncStorage = JSON.parse(moviesInAsyncStorage);
      console.log("moviesInAsyncStorage: ", moviesInAsyncStorage);
    });

    // STEP 6. Whenever you want to clear all the data in the local storage do this:
    // clearData();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
