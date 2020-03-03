import React, { Component } from 'react'
import { CardImg } from 'reactstrap'
import { deletePhotos } from '../actions/postActions'
import { connect } from 'react-redux'


class PostImages extends Component {

    state = {
        hovered: false,
        source: ''
    }

    componentDidMount() {

        this.setState({
            source: this.props.src
        })

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

    deletePhoto = (e) => {
        // if (this.props.prevPath) {
            const data = {
                link: this.props.src,
                postid: this.props.postid,
                category: this.props.category,
                userid: this.props.auth.user.id
            }
            this.props.deletePhotos(data)

            this.setState({
                source: null
            })
        // }
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
                {(this.props.src.length !== 0 && this.props.src) && (this.state.source !== null) && (
                    <CardImg className='p-1'
                        onMouseLeave={this.zoomOut}
                        onMouseEnter={this.zoomIn}
                        style={styles}
                        src={this.state.source} alt='forsalephotos'
                        onClick={this.deletePhoto}


                    />

                )}







            </div>
        )
    }
}



const mapStateToProps = state => ({
    post: state.post,
    auth: state.form
})





export default connect(mapStateToProps, { deletePhotos })(PostImages)