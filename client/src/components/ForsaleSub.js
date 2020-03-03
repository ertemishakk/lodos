import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getYellowPages, clearYellowPages, updatePage } from '../actions/postActions'
import ForSalePosts from './ForSalePosts'
import {
    Container, Row, Col, Dropdown,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import Spinner from './Spinner'
import SideFilter from './SideFilter'
import InfiniteScroll from 'react-infinite-scroll-component';
import SideQuestions from './SideQuestions'
import QuickLinks from './QuickLinks'
import SidePosts from './SidePosts'

class ForsaleSub extends Component {

    state = {
        dropdown: false,
        dropdownvalue: 'listby',
        hasMoreItems: true,
        filters: {},
        category: ''
    }


    componentDidMount() {

        if (!this.props.check.stopComponentReload) {
            this.setState({
                category: window.location.pathname.split('/').slice(1, 2).toString(),
                filters: {
                    ...this.state.filters,
                    subcategory: this.props.match.params.subcategory
                }
            }, () => {

                this.props.getYellowPages(this.state.category, this.state.filters, this.props.post.page)

            })

            if (this.props.post.yellowpages.length !== 0) {
                this.setState({
                    hasMoreItems: true,

                })
            }
        }
        if (this.props.check.stopComponentReload) {
            this.setState({
                category: window.location.pathname.split('/').slice(1, 2).toString(),
                filters: {
                    ...this.state.filters,
                    subcategory: this.props.match.params.subcategory
                }
            })
        }


    }


    componentDidUpdate(prevProps) {
        if (this.props.post.yellowpagefetchingfinished !== prevProps.post.yellowpagefetchingfinished) {
            this.setState({
                hasMoreItems: false,
            })
        }
        if (this.props.post.yellowpages !== prevProps.post.yellowpages) {
            this.props.updatePage(this.props.post.page + 1)
            if (this.props.post.yellowpages.length < 12) {
                this.setState({
                    hasMoreItems: false,
                })
            }

        }
    }

    fetchData = () => {
        this.props.getYellowPages(this.state.category, this.state.filters, this.props.post.page)
    }
    dropdownToggle = (e) => {
        this.setState({
            dropdown: !this.state.dropdown
        })

    }

    setSort = (e) => {
        this.props.updatePage(0)
        this.setState({
            dropdown: !this.state.dropdown,
            dropdownvalue: e.target.value,
            filters: {
                ...this.state.filters,
                sortby: e.target.value
            }
        }, () => {
            this.props.clearYellowPages()

            this.props.getYellowPages(this.state.category, this.state.filters, this.props.post.page)

        })

    }


    getAllFilters = (allfilters) => {
        this.props.updatePage(0)
        this.setState({
            filters: {
                ...this.state.filters,
                state: allfilters.state,
                city: allfilters.city,
                minprice: allfilters.minprice,
                maxprice: allfilters.maxprice,
                make: allfilters.make,
                minyear: allfilters.minyear,
                maxyear: allfilters.maxyear,
                minkm: allfilters.minkm,
                maxkm: allfilters.maxkm,
                often: allfilters.often
            }
        }, () => {
            this.props.clearYellowPages()


            this.props.getYellowPages(this.state.category, this.state.filters, this.props.post.page)

        })

    }

    resetAllFilters = () => {
        this.props.updatePage(0)

        this.setState({

            filters: {
                subcategory: this.props.match.params.subcategory
            }
        }, () => {
            this.props.clearYellowPages()
            this.props.getYellowPages(this.state.category, this.state.filters, this.props.post.page)
        })

    }



    render() {
        return (
            <Container >
                <Row>

                    <Col xs='2' className='  mt-5 h-50 d-inline-block'>
                        <div className='d-none d-sm-block'>
                            <h6 className='mt-2'>Search Filters</h6>

                            <SideFilter category={window.location.pathname.split('/').slice(1, 2).toString()}
                                subcategory={this.props.match.params.subcategory}
                                resetFilters={this.resetAllFilters} getFilters={this.getAllFilters} />


                        </div>
                    </Col>


                    <Col sm='5' md='6' xs='12'>
                        {this.props.post.yellowpages !== null && this.props.post.yellowpages.length !== 0 && this.state.category !== 'jobs' &&
                            this.state.category !== 'garagesale' &&
                            this.state.category !== 'events' && (
                                this.state.category !== 'classes' &&
                                this.state.category !== 'volunteers' &&
                                this.state.category !== 'lostandfound' &&
                                this.state.category !== 'services' &&
                                <Row className='pl-3 mb-1 pr-2'>
                                    {/* <Button className='btn btn-light btn-sm border-dark px-3' onClick={(e) => this.props.history.push('/')}>
                                    Back
                                </Button> */}

                                    <Dropdown size='sm' className='btn-sm  ml-auto' isOpen={this.state.dropdown} toggle={this.dropdownToggle}>
                                        <DropdownToggle caret className=' bg-light text-dark'>
                                            {this.state.dropdownvalue}
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem value='pricelow' onClick={this.setSort}>price(low to high)</DropdownItem>
                                            <DropdownItem value='pricehigh' onClick={this.setSort}>price(hight to low)</DropdownItem>
                                            <DropdownItem value='newest' onClick={this.setSort}>newest</DropdownItem>
                                            {window.location.pathname.split('/').slice(1, 2).toString() === 'forsale' &&
                                                (this.props.match.params.subcategory === 'Cars' || this.props.match.params.subcategory === 'Motorcycle') &&
                                                (
                                                    <React.Fragment>
                                                        <DropdownItem value='minyear' onClick={this.setSort}>year(low to high)</DropdownItem>
                                                        <DropdownItem value='maxyear' onClick={this.setSort}>year(high to low)</DropdownItem>
                                                        <DropdownItem value='minkm' onClick={this.setSort}>km(low to high)</DropdownItem>
                                                        <DropdownItem value='maxkm' onClick={this.setSort} >km(high to low)</DropdownItem>
                                                    </React.Fragment>
                                                )}

                                        </DropdownMenu>
                                    </Dropdown>
                                </Row>
                            )}

                        {this.props.post.yellowpages.length > 0 && (
                            <ForSalePosts yellowpages={this.props.post.yellowpages} category={window.location.pathname.split('/').slice(1, 2).toString()} />

                        )}

                        {!this.props.post.loading && !this.state.hasMoreItems && this.props.post.yellowpages.length === 0 && (
                            <h1 className='h6 text-small text-muted'>Nothing has been posted here. </h1>
                        )}

                        <InfiniteScroll
                            dataLength={this.props.post.yellowpages.length} //This is important field to render the next data
                            next={this.fetchData}
                            hasMore={this.state.hasMoreItems}
                            // loader={<h1 className='h6 text-small text-muted'>Loading...</h1>}
                            endMessage={

                                !this.props.post.loading && this.props.post.yellowpagefetchingfinished && this.props.post.yellowpages.length !== 0 && (
                                    <h1 className='h6 text-small text-muted'>You have seen it all</h1>
                                )
                            }

                        >

                        </InfiniteScroll>


                    </Col>


                    <Col md='3' sm='4' className='position-relative'>
                        <QuickLinks />
                        <SidePosts />
                        <SideQuestions />
                    </Col>





                </Row>
                {this.props.post.loading && <Spinner />}
            </Container >
        )
    }
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.form,
    question: state.question,
    check: state.check

})


export default connect(mapStateToProps, { getYellowPages, clearYellowPages, updatePage })(ForsaleSub)