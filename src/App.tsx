// import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
// import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
// import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
// import { useNotificationProvider } from "@refinedev/antd";
// import "@refinedev/antd/dist/reset.css";
// import {dataProvider,liveProvider} from "./providers";
// import routerBindings, {
//   CatchAllNavigate,
//   DocumentTitleHandler,
//   UnsavedChangesNotifier,
// } from "@refinedev/react-router-v6";
// import { App as AntdApp} from "antd";
// import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
// import { authProvider } from "./providers/auth";
// import { ForgotPassword, Home, Login, Register } from "./pages";
// import { Layout } from "./components/layout";
// import { resources } from "./config/resources";
// import { CompanyListPage } from "./routes";
// import { CompanyCreateModal } from "./routes/companies/list/create-modal";

// // import { ColorModeContextProvider } from "./contexts/color-mode";

// // const API_URL = "https://api.nestjs-query.refine.dev/graphql";
// // const WS_URL = "wss://api.nestjs-query.refine.dev/graphql";

// // const gqlClient = new GraphQLClient(API_URL);
// // const wsClient = createClient({ url: WS_URL });

// function App() {
//   return (
//     <BrowserRouter>
//       <GitHubBanner />
//       <RefineKbarProvider>
        
//           <AntdApp>
//             <DevtoolsProvider>
//               <Refine
//                 dataProvider={dataProvider}
//                 liveProvider={liveProvider}
//                 notificationProvider={useNotificationProvider}
//                 routerProvider={routerBindings}
//                 authProvider={authProvider}
//                 resources={resources}
//                 options={{
//                   syncWithLocation: true,
//                   warnWhenUnsavedChanges: true,
//                   useNewQueryKeys: true,
//                   projectId: "hSlZEc-lSRiek-DHhQZ5",
//                   liveMode: "auto",
//                 }}
//               >
//                 <Routes>
//                   <Route path='register' element={<Register />} />
//                   <Route path='login' element={<Login />} />
//                   <Route path='/forgot-password' element={<ForgotPassword />} />
//                   <Route 
//                     element={
//                     <Authenticated
//                       key="authenticated-layout"
//                       fallback={<CatchAllNavigate to="/login"/> }
//                     ><Layout>
//                     <Outlet/>
//                   </Layout>
//                   </Authenticated>
//                     }>
//                       <Route index element={<Home />} />
//                       <Route path="/companies">
//                       <Route index element={<CompanyListPage/>} />
//                       <Route path="new" element={<CompanyCreateModal/>} />
//                       </Route>
//                     </Route>
//                 </Routes>
//                 <RefineKbar />
//                 <UnsavedChangesNotifier />
//                 <DocumentTitleHandler />
//               </Refine>
//               <DevtoolsPanel />
//             </DevtoolsProvider>
//           </AntdApp>
        
//       </RefineKbarProvider>
//     </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { RefineThemes, useNotificationProvider } from "@refinedev/antd";
import { Authenticated, ErrorComponent, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";

import { App as AntdApp, ConfigProvider } from "antd";

import { Layout } from "@/components";
import { resources } from "@/config/resources";
import { authProvider, dataProvider, liveProvider } from "@/providers";
import {
  CompanyCreatePage,
  CompanyEditPage,
  CompanyListPage,
  DashboardPage,
  LoginPage,
  TasksCreatePage,
  TasksEditPage,
  TasksListPage,
} from "@/routes";

import "@refinedev/antd/dist/reset.css";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              authProvider={authProvider}
              resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                liveMode: "auto",
                useNewQueryKeys: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<DashboardPage />} />

                  <Route
                    path="/tasks"
                    element={
                      <TasksListPage>
                        <Outlet />
                      </TasksListPage>
                    }
                  >
                    <Route path="new" element={<TasksCreatePage />} />
                    <Route path="edit/:id" element={<TasksEditPage />} />
                  </Route>

                  <Route path="/companies">
                    <Route index element={<CompanyListPage />} />
                    <Route path="new" element={<CompanyCreatePage />} />
                    <Route path="edit/:id" element={<CompanyEditPage />} />
                  </Route>

                  <Route path="*" element={<ErrorComponent />} />
                </Route>

                <Route
                  element={
                    <Authenticated
                      key="authenticated-auth"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource resource="dashboard" />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<LoginPage />} />
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
