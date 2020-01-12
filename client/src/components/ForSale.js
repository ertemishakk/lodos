import React, { Component } from 'react'
import { getForSalePosts, getForSalePostsAsc, getForSalePostsDes } from '../actions/postActions'
import { connect } from 'react-redux'
import { Container, Row, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Col } from 'reactstrap'
import ForSalePosts from './ForSalePosts'
import Pagination from './Pagination'
import Spinner from './Spinner'



class Housing extends Component {
    state = {
        forsaleposts: [],
        dropdown: false,
        dropdownvalue: 'newest',
        links: [],
        currentPage: 1,
        postsPerPage: 8
    }


    componentDidMount() {

        this.props.getForSalePosts()

    }


    componentDidUpdate(prevProps) {
        if (this.props.post.forsaleposts !== prevProps.post.forsaleposts) {
            this.setState({
                forsaleposts: this.props.post.forsaleposts
            })
        }
    }

    dropdownToggle = () => {
        this.setState({
            dropdown: !this.state.dropdown
        })
    }

    callDesc = (e) => {
        this.setState({
            dropdownvalue: e.target.value
        })
        this.props.getForSalePostsDes()
    }

    callAsc = (e) => {
        this.setState({
            dropdownvalue: e.target.value
        })
        this.props.getForSalePostsAsc()
    }

    callNewest = (e) => {
        this.setState({
            dropdownvalue: e.target.value
        })
        this.props.getForSalePosts()
    }


    paginate = (pageNumber) => this.setState({ currentPage: pageNumber });




    render() {



        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.forsaleposts.slice(indexOfFirstPost, indexOfLastPost);
        return (
            <Container>

                <h2>For Sale</h2>
                <Row className='pl-3 pr-1 mb-2'>
                    <Button className='btn btn-light btn-sm border-dark px-3' onClick={this.props.history.goBack}>
                        Back
                    </Button>
                    <Dropdown size='sm' className='btn-sm  ml-auto' isOpen={this.state.dropdown} toggle={this.dropdownToggle}>
                        <DropdownToggle caret className=' bg-light text-dark'>
                            {this.state.dropdownvalue}
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.state.dropdownvalue !== 'price low' ? (
                                <DropdownItem onClick={this.callDesc} value='price low' >price low</DropdownItem>)
                                : null}
                            {this.state.dropdownvalue !== 'price high' ? (
                                <DropdownItem onClick={this.callAsc} value='price high'>price high</DropdownItem>)
                                : null}
                            {this.state.dropdownvalue !== 'newest' ? (
                                <DropdownItem onClick={this.callNewest} value='newest'>newest</DropdownItem>)
                                : null}
                        </DropdownMenu>
                    </Dropdown>
                </Row>

                <Row>
                    <Col xs="2" className='border'>Filters</Col>
                    <Col xs="8">


                        {this.props.post.loading && <Spinner />}
                        <ForSalePosts forsaleposts={currentPosts} />
                    </Col>
                    <Col xs="2" className='border'>States</Col>
                </Row>
                <Pagination postsPerPage={this.state.postsPerPage}
                    totalPosts={this.state.forsaleposts.length} paginate={this.paginate} />




            </Container>
        )
    }
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.form
})


export default connect(mapStateToProps, { getForSalePosts, getForSalePostsDes, getForSalePostsAsc })(Housing)