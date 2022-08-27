import Header from "./Layout/Header/Header";
import { Switch, Route } from "react-router-dom"
import DataProvider from "./DataProvider";
import Home from "./Home/Home";
import About from "./About/About";
import BlogDetails from "./Blog/BlogDetails/BlogDetails";
import Profile from "./User/Profile";
import UserBlog from "./User/UserBlog";
import AddBlog from "./Blog/AddBlog/AddBlog";
import UpdateBlog from "./Blog/UpdateBlog/UpdateBlog";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import './app.css'



function App() {
  return (
    <div>
      <DataProvider>
        <Header />
        <Switch>
          <div className="container">
            <Route exact path="/"> <Home /> </Route>
            <Route exact path="/about"> <About /> </Route>
            <Route exact path="/profile"><Profile /></Route>
            <Route exact path="/add-blog"><AddBlog /></Route>
            <Route exact path="/update-blog"><UpdateBlog /></Route>
            <Route exact path="/user-blogs"><UserBlog /></Route>
            <Route exact path="/update-blog"><UpdateBlog /></Route>
            <Route exact path="/blog-details/:id"> <BlogDetails /> </Route>
            <Route exact path="/login"> <Login /> </Route>
            <Route exact path="/register"> <Register /> </Route>
          </div>
        </Switch>
      </DataProvider>
    </div>
  );
}

export default App;
