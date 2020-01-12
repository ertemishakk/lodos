import React, { Component } from 'react'
import { CardImg } from 'reactstrap'
// import ReactImageMagnify from 'react-image-magnify';


class PostImages extends Component {

    state = {
        hovered: false
    }

    zoomIn = (e) => {
        this.setState({
            hovered: true
        })

    }

    zoomOut = (e) => {
        this.setState({
            hovered: false
        })

    }


    render() {

        var styles;

        if (this.state.hovered === false) {
            styles = {
                height: '50px',
                width: '50px'
            }
        }
        else {
            styles = {
                height: '250px',
                width: '250px'
            }
        }


        return (
            <div className='d-inline'>
                <CardImg className='p-1'
                    onMouseLeave={this.zoomOut}
                    onMouseEnter={this.zoomIn}
                    style={styles}
                    src={this.props.src} alt='forsalephotos' />

                {/* <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        src: this.props.src,
                        width: 100,
                        height: 100

                    },
                    largeImage: {
                        src: this.props.src,
                        width: 500,
                        height: 500
                    }
                }} /> */}
            </div>
        )
    }
}
export default PostImages