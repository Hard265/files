import { registerRootComponent } from "expo";
import { polyfill as polyfillEncoding } from "react-native-polyfill-globals/src/encoding";
import { polyfill as polyfillReadableStream } from "react-native-polyfill-globals/src/readable-stream";
import { polyfill as polyfillFetch } from "react-native-polyfill-globals/src/fetch";
import App from "./App";
polyfillReadableStream();
polyfillEncoding();
polyfillFetch();

registerRootComponent(App);
