import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import {dataProvider,liveProvider} from "./providers";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp} from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./providers/auth";
import { ForgotPassword, Home, Login, Register } from "./pages";
import { Layout } from "./components/layout";
import { resources } from "./config/resources";
import { CompanyListPage } from "./routes";
import { CompanyCreateModal } from "./routes/companies/list/create-modal";

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
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "hSlZEc-lSRiek-DHhQZ5",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path='register' element={<Register />} />
                  <Route path='login' element={<Login />} />
                  <Route path='/forgot-password' element={<ForgotPassword />} />
                  <Route 
                    element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login"/> }
                    ><Layout>
                    <Outlet/>
                  </Layout>
                  </Authenticated>
                    }>
                      <Route index element={<Home />} />
                      <Route path="/companies">
                      <Route index element={<CompanyListPage/>} />
                      <Route path="new" element={<CompanyCreateModal/>} />
                      </Route>
                    </Route>
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
