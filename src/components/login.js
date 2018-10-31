import React, {Component} from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import * as authActions from '../actions/authActions';
import {bindActionCreators} from 'redux';
import {getElement} from "../actions";
import {fetchLogin} from "../actions/authActions";
import {setLogin} from "../actions/authActions";


class LoginForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                password: ''
            },
        };
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    validateForm() {
        return this.state.form.email.length > 0 && this.state.form.password.length > 0;
    }

    onChange(event) {
        this.setState({
            form: {
                ...this.state.form,
                [event.target.id]: event.target.value
            }
        });
    }

    onSave(event) {
        event.preventDefault();
        this.props.login(this.state.form);
    }

    componentWillReceiveProps(newProps) {
        let token = newProps.auth.id
        if (token) {
            localStorage.setItem('token', token)
            this.setState({logined:true})
        }

    }

    render() {
        if (localStorage.getItem("token")) {
            this.props.reRender();
            return <Redirect to={"/"}/>;
        }

        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <b>Email</b>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.form.email}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <b>Пароль</b>
                        <FormControl
                            value={this.state.form.password}
                            onChange={this.onChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        onClick={this.onSave}
                    >
                        Войти
                    </Button>
                    <Link to={"/registration"} >Зарегистрироваться </Link>

                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: form => {
            dispatch(fetchLogin(form));
        },
        setToken: is_authenticated => {
            dispatch(setLogin(is_authenticated))
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps)
(LoginForm);

