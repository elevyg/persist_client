import { AppRouter } from "@bliks/server/src/routers/_app"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import React from "react"
import { Text, View } from "react-native"
import { TouchableHighlight } from "react-native-gesture-handler"
import superjson from "superjson"
import { getBaseUrl } from "../../utils/trpc"

const wakeUpProcedure = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      // async headers() {
      //   const token = await getData("token");
      //   return { Authorization: `Bearer ${token}` };
      // },
    }),
  ],
}).wakeUp

const ApplicationNavigationWrapper: React.FunctionComponent = () => {
  // const wakeUp = trpc.wakeUp.useMutation({
  //   onSuccess: (data) => {
  //     console.log("woke up", data);
  //   },
  // });

  const wakeUp = useMutation(["wokeUp"], () => wakeUpProcedure.mutate())

  const handleWokeUp = () => {
    wakeUp.mutate()
  }

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
  )
}

export default ApplicationNavigationWrapper
