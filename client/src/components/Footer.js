import React from 'react'

const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <div style={{ position: 'relative' }}>
            <footer className="page-footer font-small cyan darken-3 " style={{ position: 'absolute', width: '100%' }}>


                <div className="container pt-4" style={{ color: '#61aaff' }}>

                    <div className="row">


                        <div className="col-md-12 ">
                            <div className=" mb-3 flex-center">
                                <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                <i className="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                <i className="fab fa-pinterest fa-lg white-text fa-2x"> </i>

                            </div>
                        </div>


                    </div>


                </div>



                <div className="footer-copyright text-center">© {year} Copyright:
    <a href="/"> lodos.com.au</a>
                </div>


            </footer>
        </div>
    )
}

export default Footer
