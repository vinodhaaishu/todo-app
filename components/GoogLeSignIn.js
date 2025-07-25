// components/GoogleSignIn.js

import React, { useEffect, useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase"; // ✅ Make sure this is the correct path

WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = ({ onLogin }) => {
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "718709501481-id2l2j6kh5142h9mehbkp9sfl8mj9tue.apps.googleusercontent.com",
    androidClientId: "718709501481-f77n8kfj7omdjpc66rtln5a1va1p5eae.apps.googleusercontent.com",
    iosClientId: "718709501481-pd3iq5b6pbjl14chkd5t3ldor1g6ihui.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;

      const credential = GoogleAuthProvider.credential(null, authentication.accessToken);

      signInWithCredential(auth, credential)
        .then((result) => {
          const user = result.user;
          setUserInfo(user);
          onLogin(user);
        })
        .catch((error) => {
          console.error("Firebase sign-in error:", error);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      {userInfo ? (
        <Text style={styles.greeting}>Welcome, {userInfo.displayName}!</Text>
      ) : (
        <Button
          title="Sign in with Google"
          onPress={() => promptAsync()}
          disabled={!request}
          color="#4285F4"
        />
      )}
    </View>
  );
};

export default GoogleSignIn;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  greeting: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
});
