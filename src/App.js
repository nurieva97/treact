import React, {Component} from 'react';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import ElementAdd from './components/element_add'
import ElementEdit from './components/element_edit'
import Element from "./components/element";
import ElementsList from "./components/elements_list"
import Login from "./components/login";
import Registration from "./components/registration";
import Logout from "./components/logout";


import {
    Collapse,
    Navbar,
    Nav
} from 'reactstrap';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: 0,
        }
    }

    get_header_buttons() {
        if (localStorage.getItem("token")) {
            return (
                <Nav className="ml-auto" navbar>
                    <Link className={"nav-link"} to="/logout">Выход</Link>
                </Nav>
                )
        }
        return (
            <Nav className="ml-auto" navbar>
                <Link className={"nav-link"} to="/login">Вход</Link>
                <Link className={"nav-link"} to="/registration">Регистрация</Link>
            </Nav>
        )
    }

    render() {
        return (
            <Router>
                <div>
                    <Navbar color="light" light expand="md">
                        <Link className={"navbar-brand"} to={'/'}>
                            React Test
                        </Link>
                        <Collapse navbar>
                            {this.get_header_buttons()}
                        </Collapse>
                    </Navbar>


                    <div className={"container"}>
                        <Route exact path={"/element/:elementId"} component={Element}/>
                        <Route exact path={"/add"} component={ElementAdd}/>
                        <Route exact path={"/edit/:elementId"} component={ElementEdit}/>
                        <Route exact path={"/login"} render={(props) => <Login reRender={() => this.setState({render: 1})} {...props}/>}/>
                        <Route exact path={"/logout"} render={(props) => <Logout reRender={() => this.setState({render: 1})} {...props}/>}/>
                        <Route exact path={"/registration"} component={Registration}/>
                        <Route exact path={"/"} component={ElementsList}/>
                    </div>
                </div>
            </Router>

        );
    }
}

export default App;
