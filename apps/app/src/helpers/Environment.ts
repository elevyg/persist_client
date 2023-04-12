import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Updates from "expo-updates";
import { NativeModules } from "react-native";
const { manifest } = Constants;

export const parsedAppVersion = parseInt(
  Constants.manifest?.version?.split(".").join("")!,
  10
);

export const releaseChannel = Updates.releaseChannel;

// @ts-ignore
export const usingHermes = () => !!global.HermesInternal;

// export const isDevelopment = !Device.isDevice;

export const isDevelopment =
  Constants.appOwnership === "expo" || // expo app
  process.env.APP_ENV === "test" || // test-env
  Updates.releaseChannel === "default"; // simulator

export const isReactScriptsDevEnv =
  releaseChannel === undefined || releaseChannel === "default";

export const updatedVersion =
  releaseChannel === "production" ||
  releaseChannel === "staging" ||
  releaseChannel === undefined ||
  releaseChannel === "default";

export const getHostBackend = () => {
  // android development
  if (Device.isDevice === true && Device.productName?.includes("emulator")) {
    return `http://10.0.2.2:3000`;
  }

  // ios development
  if (isReactScriptsDevEnv) {
    const scriptURL = NativeModules.SourceCode.scriptURL;
    const address = scriptURL.split("://")[1].split("/")[0];
    const hostname = address.split(":")[0];
    const port = address.split(":")[1];
    return `http://${hostname}:3000`;
  }

};

const HOST_BACKEND = getHostBackend();
console.log(HOST_BACKEND);

const ENVIRONMENT = {
  HOST_PAGE: "https://X.com",
  HOST_BACKEND,
};

export default ENVIRONMENT;
