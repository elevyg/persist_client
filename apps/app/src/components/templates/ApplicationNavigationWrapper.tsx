import React from "react";
import { Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { trpc } from "../../utils/trpc";

const wakeUpProcedure = trpc.createClient()

const ApplicationNavigationWrapper: React.FunctionComponent = () => {
  // const wakeUp = trpc.wakeUp.useMutation({
  //   onSuccess: (data) => {
  //     console.log("woke up", data);
  //   },
  // });

  const wakeUp = useQuery

  const handleWokeUp = () => {
    wakeUp.mutate();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableHighlight onPress={handleWokeUp}>
        <View
          style={{
            // flex: 1,
            padding: 10,
            backgroundColor: "red",
          }}
        >
          <Text>Press me</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default ApplicationNavigationWrapper;
