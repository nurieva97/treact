import React, {Component} from 'react';
import {Button, FormGroup, FormControl} from "react-bootstrap";

// import {fetchRegistration} from '../actions/authActions'
import {Redirect} from "react-router-dom";
import axios from "axios/index";

const apiUrl = 'https://stormy-tor-53869.herokuapp.com/api';

export default class Registration extends Component {


    constructor(props) {
        super(props);

        this.state = {
            form: {
                email: "",
                password: "",
                name: "",
                surname: ""
            },
            redirect: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchRegistration = this.fetchRegistration.bind(this);

    }

    validateForm() {
        return this.state.form.email.length > 0 && this.state.form.password.length > 0
            && this.state.form.surname.length > 0 && this.state.form.name.length > 0;
    }

    handleChange(event) {
        this.setState({
            form: {
                ...this.state.form,
                [event.target.id]: event.target.value
            }
        });
    };

    fetchRegistration(state) {
        axios.post(`${apiUrl}/Users`, state.form)
            .then((response) => {
                this.setState({redirect:true})
                return response.data.email
            })
            .catch((error) => {
                return error
            })
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log('form', this.state.form)
        this.fetchRegistration(this.state);
    };

    render() {
        if (this.state.redirect) return <Redirect to={"login"}/>;
        if (localStorage.getItem("token")) return <Redirect to={"/"}/>;
        return (
            <div className="Login">
                <form>
                    <FormGroup controlId="name" bsSize="large">
                        <b>Имя</b>
                        <FormControl
                            autoFocus
                            type="name"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="surname" bsSize="large">
                        <b>Фамилия</b>
                        <FormControl
                            type="surname"
                            onChange={this.handleChange}
                        />
                    </FormGroup>


                    <FormGroup controlId="email" bsSize="large">
                        <b>Email</b>
                        <FormControl
                            type="email"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <b>Пароль</b>
                        <FormControl
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>

                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        onClick={this.handleSubmit}
                    >
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
        );
    }
}