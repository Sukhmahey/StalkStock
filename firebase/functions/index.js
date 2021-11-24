/* eslint-disable indent */
/* eslint-disable quotes */
import firestore from "@react-native-firebase/firestore";
import { StreamChat } from "stream-chat";

export const onCreateUser = (email, user) => {
  // Define values.
  const api_key = "bvdmsd4p8nfu";
  const api_secret =
    "bkbz5g4g7da34undjegwgjv86nw2bgxa3ww3tc6wvs79zps3n7r97phszv3xcn97";

  const serverClient = StreamChat.getInstance(
    "bvdmsd4p8nfu",
    "bkbz5g4g7da34undjegwgjv86nw2bgxa3ww3tc6wvs79zps3n7r97phszv3xcn97"
  );

  const token = serverClient.createToken(user);

  console.log("TOKEN-----", token);
};
