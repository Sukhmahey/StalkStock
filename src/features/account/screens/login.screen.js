import React, { useEffect, useState, useContext } from "react";
import { SafeArea } from "../../../components/utility/SafeArea.component";
import {
  Text,
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
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
    //console.log(`GET CURRENT USER ------- ${JSON.stringify(currentUser)}`);
    setUser(currentUser);
    if (currentUser === null) {
      setInitializing(false);
    }
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
    //console.log(`NAVIGATE WITH USER ${JSON.stringify(user)}`);
    setRequestInProgress(false);
    setInitializing(false);
    setUserData(user);
    setAuth(true);
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "1069795074116-rrejncr9bvjhs02444sv08b2786kmtup.apps.googleusercontent.com",
    });
    getCurrentUser();
  }, []);

  const fetchUserData = async () => {
    //console.log(`FETCH USER DATA ${JSON.stringify(user.user)}`);
    //clearTimeout(timerId);
    setRequestInProgress(true);
    const email = user.user.email; //'tbaranowicz@gmail.com';
    //console.log(`FETCH FOR EMAIL ${email}`);
    const userRef = firestore().collection("Users").doc(email);
    const doc = await userRef.get();

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
    <View style={[styles.centeredView]}>
      <View style={{ flex: 0.2 }}></View>
      <View
        style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={styles.title}>STALK STOCK</Text>
        <Image
          style={{
            height: 150,
            width: 150,
          }}
          source={require("../../../../assets/icon_bull.png")}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#blue" />
        <Text style={styles.caption}>by xHuman</Text>
      </View>
    </View>
  ) : (
    <View style={styles.centeredView}>
      <View style={{ flex: 0.2 }}></View>
      <View
        style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={styles.title}>STALK STOCK</Text>
        <Image
          style={{
            height: 150,
            width: 150,
          }}
          source={require("../../../../assets/icon_bull.png")}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Pressable
          style={[styles.button, styles.buttonLogIn]}
          onPress={loginHandler}
        >
          <Text style={styles.textStyle}>Sign In with Google</Text>
        </Pressable>
        <Text style={styles.caption}>by xHuman</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 30,
  },
  caption: {
    marginTop: 40,
    color: "white",
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
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
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default LoginScreen;
