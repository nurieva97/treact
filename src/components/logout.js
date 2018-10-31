import React, {Component} from 'react'
import {Redirect} from "react-router-dom";

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.delete_token = this.delete_token.bind(this)
    }

    delete_token() {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token')
            this.props.reRender();
        }
    }

    render() {
        this.delete_token()
        return <Redirect to={'/login'}/>
    }
}