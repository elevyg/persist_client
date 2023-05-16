import { AppRouter } from "@bliks/server/src/routers/_app"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister"
import { QueryClient } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import { httpBatchLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import * as Device from "expo-device"
import React from "react"
import { NativeModules } from "react-native"
import superjson from "superjson"
import { isReactScriptsDevEnv, releaseChannel } from "../helpers/Environment"

/**
 * A set of typesafe hooks for consuming your API.
 */
export const trpc = createTRPCReact<AppRouter>()

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
const getBaseUrl = () => {
  // return "http://192.168.178.194:3000";
  // in our testing env, we use the stage
  if (process.env.APP_ENV === "test") {
    return "https://stage.getbliks.com"
  }

  // android development
  if (Device.isDevice === true && Device.productName?.includes("emulator")) {
    return `http://10.0.2.2:3000`
  }

  // ios development
  if (isReactScriptsDevEnv) {
    const scriptURL = NativeModules.SourceCode.scriptURL
    const address = scriptURL.split("://")[1].split("/")[0]
    const hostname = address.split(":")[0]
    const port = address.split(":")[1]
    return `http://${hostname}:3000`
  }

  if (releaseChannel.startsWith("prod")) {
    // matches prod-v1, prod-v2, prod-v3
    return "https://app.getbliks.com"
  }
  if (releaseChannel.startsWith("staging")) {
    // matches staging-v1, staging-v2
    return "https://stage.getbliks.com"
  }
}

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
})

/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 */
export const TRPCProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: Infinity,
            retry: true,
          },
          mutations: {
            cacheTime: Infinity,
            retry: true,
          },
        },
      }),
  )
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
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
    }),
  )

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      }}
      onSuccess={() => {
        queryClient.resumePausedMutations().then(() => {
          console.log("resumed paused mutations")
          queryClient.invalidateQueries()
        })
      }}
    >
      {children}
    </PersistQueryClientProvider>
  )
}
