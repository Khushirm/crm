import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import {authProvider, dataProvider,liveProvider} from "./providers";
import {Home, ForgotPassword, Login, Register} from "./pages";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
// import { createClient } from "graphql-ws";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import { ColorModeContextProvider } from "./contexts/color-mode";

// const API_URL = "https://api.nestjs-query.refine.dev/graphql";
// const WS_URL = "wss://api.nestjs-query.refine.dev/graphql";

// const gqlClient = new GraphQLClient(API_URL);
// const wsClient = createClient({ url: WS_URL });

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "hSlZEc-lSRiek-DHhQZ5",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route index element={<WelcomePage />} />
                  <Route index element={<Home />} />
                  <Route path='/forgot-password' element={<ForgotPassword />} />
                  <Route path='register' element={<Register />} />
                  <Route path='login' element={<Login />} />
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
