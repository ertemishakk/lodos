import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    Container,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/formActions';


class NavBar extends Component {
    state = {
        isOpen: false,
        dropdownOpen: false
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })

    }

    toggleDropDown = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen })
    }

    onLogoutClick = () => {

        this.props.logoutUser()
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Nav className='ml-auto' navbar >
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                    <DropdownToggle caret>
                        {user.name}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem href='/dashboard' >Profile</DropdownItem>
                        <DropdownItem href='/login' onClick={this.onLogoutClick}>Logout</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Nav>
        )


        const guestLinks = (
            <Nav className='ml-auto' navbar >
                <NavLink href='/login'>
                    Login
                </NavLink>
                <NavLink href='/register'>
                    Signup
                </NavLink>
            </Nav>)


        return (
            <div>
                <Navbar color='light' light expand='sm' className='mb-3 border-bottom'>
                    <Container>
                        <NavbarBrand href='/' className='ml-3'> Lodos</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar >
                            {isAuthenticated ? authLinks : guestLinks}
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.form
})


export default connect(mapStateToProps, { logoutUser })(NavBar);