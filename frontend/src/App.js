import "./App.css";
import { BrowserRouter,Routes, Route ,Navigate} from "react-router-dom";
import React from "react";
import Home from './pages/Home/Home'
import Navigation from "./components/shared/Navigation/Navigation";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import Room from "./pages/Room/Room";
import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader/Loader";

function App() {
  

  //call refresh endpoint
   
  const{loading} = useLoadingWithRefresh()
  return loading? (
    <Loader message="Loading, please wait..."/>
    ):(
    
      
   
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/"  element={ <GuestRoute>
            <Home/>
        </GuestRoute>  }/>
      </Routes>

      <Routes>
        <Route path="/authenticate"  element={ <GuestRoute>
            <Authenticate/>
        </GuestRoute>  }/>
      </Routes>

      <Routes>
        <Route path="/activate"  element={ <SemiProtectedRoute>
            < Activate/>
        </SemiProtectedRoute>  }/>
      </Routes>

      <Routes>
        <Route path="/rooms"  element={ <ProtectedRoute>
            < Rooms/>
        </ProtectedRoute>  }/>
      </Routes>

      <Routes>
        <Route path="/room/:id"  element={ <ProtectedRoute>
            < Room/>
        </ProtectedRoute>  }/>
      </Routes>
     
    </BrowserRouter>
  );
  
}

const GuestRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);

  if (isAuth) {
    return <Navigate to={"/rooms"} />;
  }
  else{
    return children;
  }

};

const SemiProtectedRoute = ({ children }) => {
  const { isAuth, user } = useSelector((state) => state.auth);

  if (isAuth && !user.activated) {
    return children;
  }
  if (!isAuth) {
    return <Navigate to={"/"} />;
  } else {
    return <Navigate to={"/rooms"} />;
  }
};

const ProtectedRoute = ({ children }) => {
  const { isAuth, user } = useSelector((state) => state.auth);

  if (!isAuth) {
    return <Navigate to={"/"} />;
  } else if (isAuth && !user.activated) {
    return <Navigate to={"/activate"} />;
  }
  return children;
};

export default App;
