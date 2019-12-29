import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux'
// import { registerUser } from '../actions/formActions'
import classnames from 'classnames'
import { loginUser } from '../actions/formActions'

class Login extends React.Component {

    state = {
        email: '',
        password: '',
        errors: {}
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }


    onSubmit = (e) => {
        e.preventDefault();

        const userData = {

            email: this.state.email,
            password: this.state.password,

        }
        this.props.loginUser(userData)

    }
    componentDidUpdate(prevProps) {

        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }

        if (this.props.errors !== prevProps.errors) {
            this.setState({
                errors: this.props.errors
            })
        }
        //  console.log(this.state)
    }
    render() {
        const { errors } = this.state
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center mb-5'>Log In</h1>
                        <form onSubmit={this.onSubmit} >

                            <InputGroup className='my-2'>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>@</InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="email" onChange={this.onChange} className={classnames('', { 'is-invalid': errors.email })} value={this.state.email} name='email' />
                                <div className='invalid-feedback'>{errors.email}</div>
                            </InputGroup>

                            <InputGroup className='my-2'>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>@</InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="password" onChange={this.onChange} className={classnames('', { 'is-invalid': errors.password })} value={this.state.password} name='password' />
                                <div className='invalid-feedback'>{errors.password}</div>
                            </InputGroup>



                            <input type='submit' className='ttn btn-info btn-block mt-4 p-2' />
                        </form>
                    </div>
                </div>
            </div>


        )
    }

}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.form

})

export default connect(mapStateToProps, { loginUser })(Login)