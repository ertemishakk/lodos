import React from 'react'
import { Container, Navbar } from 'reactstrap'

const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()
    return (


        <div className=' w-100 text-light '>
            <Navbar color='dark' dark  style={{ lineHeight: '1em' }} >
                <Container>
                    <div className=" ">
                        <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        <i className="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        <i className="fab fa-pinterest fa-lg white-text fa-2x"> </i>

                    </div>

                    <div className="footer-copyright text-center">© {year} Copyright:
    <a href="/"> lodos.com.au</a>
                    </div>


                </Container>
            </Navbar>
        </div>




    )
}

export default Footer
