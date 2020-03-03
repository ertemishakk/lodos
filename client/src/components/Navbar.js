import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    Container, Dropdown, DropdownMenu, DropdownItem
} from 'reactstrap';
// import ProfileImage from '../images/profileimage.jpg'
import { connect } from 'react-redux';
import { logoutUser } from '../actions/formActions';
// import Badge from '@material-ui/core/Badge';


class NavBar extends Component {
    state = {
        isOpen: false,
        dropdownOpen: false,
        count: 1
    }


    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })

    }

    toggleDropDown = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen })
    }

    onLogoutClick = () => {

        this.props.logoutUser()
        this.props.history.push('/login')

    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const authLinks = (
            <Nav className='ml-auto' navbar >
                <NavLink href='/dashboard'>
                    <i className="fas fa-user-circle fa-2x text-light"></i>
                </NavLink>
                <NavLink >

                    <Dropdown size='sm' className=' ml-auto' isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                        {/* <DropdownToggle tag='span'>
                            <Badge badgeContent={1} color="error">
                                <i className="fas fa-globe-asia fa-2x text-light">
                                </i>
                            </Badge>
                        </DropdownToggle> */}
                        <DropdownMenu right>

                            <DropdownItem>Some Action</DropdownItem>

                            <DropdownItem>Foo Action</DropdownItem>
                            <DropdownItem>Bar Action</DropdownItem>
                            <DropdownItem>Quo Action</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                </NavLink>
                <NavLink onClick={this.onLogoutClick} href='#'>
                    <i className="fas fa-sign-out-alt text-light fa-2x"></i>
                </NavLink>
            </Nav >
        )


        const guestLinks = (
            <Nav className='ml-auto' navbar >
                <NavLink className='text-white' href='/login'>
                    Login
                </NavLink>
                <NavLink className='text-white' href='/register'>
                    Signup
                </NavLink>
            </Nav>)


        return (
            <div className=' sticky-top'>
                <Navbar color='dark' dark expand='sm' className='mb-3' style={{ lineHeight: '1em' }} >
                    <Container>
                        <NavbarBrand href='/' className='ml-3' style={{ fontFamily: 'Marat Sans Regular', fontSize: '30px' }}> Lodos</NavbarBrand>


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


export default connect(mapStateToProps, { logoutUser })(withRouter(NavBar))