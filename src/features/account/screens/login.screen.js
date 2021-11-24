import React, { useEffect, useState, useContext } from "react";
import { SafeArea } from "../../../components/utility/SafeArea.component";
import { Text, Pressable, StyleSheet, View } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import firestore from "@react-native-firebase/firestore";
import { onCreateUser } from "../../../../firebase/functions";

import { AuthContext } from "../../../services/auth/auth.context";

const LoginScreen = ({ navigation }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [requestInProgress, setRequestInProgress] = useState(false);
  let timerId;
  const { setAuth, setUserData } = useContext(AuthContext);

  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log(`GET CURRENT USER ------- ${JSON.stringify(currentUser)}`);
    setUser(currentUser);
    setInitializing(false);
  };

  const makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const navigateToChats = (user) => {
    console.log(`NAVIGATE WITH USER ${JSON.stringify(user)}`);
    setRequestInProgress(false);

    setUserData(user);
    setAuth(true);
  };

  useEffect(() => {
    // if (!firebase.apps.length) {
    //   firebase.initializeApp({
    //     apiKey: "AIzaSyCPJdVxlfc4G2FepPSRkMX6yZskZgrXkcY",
    //     appId: "1:1069795074116:android:10cf16782666e2aec4dc11",
    //     projectId: "stalkstock-dec0c",
    //     messagingSenderId: "1069795074116",
    //     databaseURL: "https://stalkstock-dec0c.firebaseio.com",
    //     storageBucket:
    //       "https://console.firebase.google.com/project/stalkstock-dec0c/storage/stalkstock-dec0c.appspot.com/files",
    //   });
    // } else {
    //   firebase.app(); // if already initialized, use that one
    // }

    GoogleSignin.configure({
      webClientId:
        "1069795074116-rrejncr9bvjhs02444sv08b2786kmtup.apps.googleusercontent.com",
    });
    getCurrentUser();
  }, []);

  const fetchUserData = async () => {
    console.log(`FETCH USER DATA ${JSON.stringify(user.user)}`);
    //clearTimeout(timerId);
    setRequestInProgress(true);
    const email = user.user.email; //'tbaranowicz@gmail.com';
    console.log(`FETCH FOR EMAIL ${email}`);
    const userRef = firestore().collection("Users").doc(email);
    const doc = await userRef.get();
    console.log("DOCUMENT-----", doc);
    if (!doc.exists) {
      //ADD
      const userName = user.user.name; //'Tomek';
      const userId = makeid(9);
      await userRef.set(
        {
          userName,
          email,

          userId,
        },
        { merge: true }
      );
      //onCreateUser(email, userId);

      timerId = setTimeout(() => {
        fetchUserData();
        setRequestInProgress(false);
      }, 2000);
    } else {
      if (doc != null) {
        navigateToChats(doc._data);
      } else {
        timerId = setTimeout(() => {
          fetchUserData();
          setRequestInProgress(false);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (user != null && !requestInProgress) {
      fetchUserData();
    }
  }, [user]);

  const loginHandler = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setRequestInProgress(false);
      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return initializing ? (
    <Text>Initializing...</Text>
  ) : (
    <View style={styles.centeredView}>
      <Pressable
        style={[styles.button, styles.buttonLogIn]}
        onPress={loginHandler}
      >
        <Text style={styles.textStyle}>Sign In with Google</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 4,
    padding: 10,
    elevation: 2,
  },
  buttonLogIn: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LoginScreen;
