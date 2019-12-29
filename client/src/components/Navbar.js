import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    Container, Button
} from 'reactstrap';
class NavBar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        return (
            <div>
                <Navbar color='light' light expand='sm' className='mb-5 border-bottom'>
                    <Container>
                        <NavbarBrand href='/' className='ml-3'> Lodos</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar >
                            <Nav className='ml-auto' navbar >

                                <NavLink href='/login'>
                                    Login
                        </NavLink>
                                <NavLink href='/register'>
                                    Signup
                        </NavLink>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default NavBar