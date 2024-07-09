import { createContext, useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Intern from "./scenes/admin/team";
import Invoices from "./scenes/admin/submitedProjects";
import ProjectStatus from "./scenes/admin/projectStatus";
import UploadProject from "./scenes/admin/uploadprojects";
import Bar from "./scenes/bar";
import Profile from "./scenes/topbar/profile";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/topbar/faq";
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import TodoBoard from "./board/Board";
import Projects from "./scenes/intern/projects";
import AlteredProjects from "./scenes/intern/alteredProject";
import SubmitPorject from "./scenes/intern/submitporject";
import Auth from "./scenes/auth";
import user from "./functions/context/userState";
import SubmitedProjects from "./scenes/admin/submitedProjects";
import { GernalErrorHandler } from "./functions/auth";
import NotificationDrawer from "./scenes/topbar/notification";
import { auth } from "./functions/firebase/config";
import Verification from "./scenes/global/verification";

// const StateContext = createContext('')
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [CurrentUser , SetCurrentUser] = useState(false);
  const [isloading, setisloading] = useState(true)
  const [Error, setError] = useState();

  useEffect(() => {
    if (CurrentUser) {
      GernalErrorHandler(setError)
      return
    }
  }, [CurrentUser])
  return (
    <user.Provider value={[CurrentUser , SetCurrentUser, isloading, setisloading, Error, setError]}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {/* <TodoBoard /> */}
            {CurrentUser && !auth.currentUser.emailVerified ? <Sidebar isSidebar={isSidebar} /> : null}
            <main className="content">
              {CurrentUser && !auth.currentUser.emailVerified ? <Topbar setIsSidebar={setIsSidebar} /> : null}
              {
                !CurrentUser
                ? 
                  (<Auth />) 
                :
                (
                <>
                {!auth.currentUser.emailVerified ? (<Routes>
                    <Route path="/" element={<Dashboard /> } />
                    <Route path="/intern" element={<Intern />} />
                    <Route path="/projects-status" element={<ProjectStatus />} />
                    <Route path="/submited-project" element={<SubmitedProjects />} />
                    <Route path="/upload-project" element={<UploadProject />} />
                    <Route path="/project" element={<Projects />} />
                    <Route path="/submitproject" element={<SubmitPorject />} />
                    <Route path="/yourproject" element={<AlteredProjects />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/calendar" element={<Calendar />} />
                    {/* <Route path="/geography" element={<Geography />} /> */}
                    <Route path="/board" element={<TodoBoard />} />
                  </Routes>)
                  : <Verification />}
                </>
                )
              }
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </user.Provider>
  );
}

export default App;
