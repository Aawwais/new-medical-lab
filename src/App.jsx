import Auth from "./layouts/Auth"
import Admin from "./layouts/Admin";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

function App() {
    let {uid} =useSelector((state)=>state.user)
    
    return (
        <> 
                <BrowserRouter>
                {uid ? (
          <Switch>
            <Route
              path="/admin"
              render={(props) => <Admin {...props} />}
            />
            <Redirect from="/" to="/admin/index" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/auth" render={(props) => <Auth {...props} />} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
        )}
                </BrowserRouter>
        </>
    );
}

export default App;
