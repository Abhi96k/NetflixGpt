 import { configureStore } from "@reduxjs/toolkit";
 import userReducer from "./UserSlice/userSlice";
 import movieReducer from "./MovieSlice/movieSlice";
 import gptReducer from "./GptSlice/GptSlice";
 import configReducer from "./ConfigSlice/ConfigSlice";

 const appStore = configureStore({
    reducer: {
        user:userReducer,
        movie:movieReducer,
        gpt:gptReducer,
        config:configReducer,
    },
 });

 export type RootState = ReturnType<typeof appStore.getState>;
 export default appStore;