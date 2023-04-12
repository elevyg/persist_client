// import "react-native-gesture-handler";
// import at the very top of everything.
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ApplicationNavigationWrapper from "./src/components/templates/ApplicationNavigationWrapper";
import { TRPCProvider } from "./src/utils/trpc";

/**
 * We prevent autohide
 */

const App = () => {
  return (
    <TRPCProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ApplicationNavigationWrapper />
        <StatusBar style="dark" />
      </GestureHandlerRootView>
    </TRPCProvider>
  );
};

export default App;
