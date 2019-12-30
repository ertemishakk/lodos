import React, { Component } from 'react'
import Axios from 'axios'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
} from 'reactstrap';

class News extends Component {
    state = {
        news: []
    }

    async componentDidMount() {
        Axios.get(`https://newsapi.org/v2/everything?q=turkish||turkey&pageSize=25&apiKey=032a0e3b07624eec81a5556013d9b392`)
            .then(res => {
                this.setState({
                    news: res.data.articles
                })
            })

    }
    render() {
        return (
            <div className='container'>
                <div className='row  justify-content-center'>


                    <div>
                        {this.state.news.map((eachNews, index) => (
                            <Card key={index} style={{ width: '70%' }} className='mx-auto p-4 my-2'>
                                <CardImg top width="100%" src={eachNews.urlToImage} alt="Card image cap" />
                                <CardTitle className='font-weight-bold pt-2' style={{ fontSize: '20px' }}>{eachNews.title}</CardTitle>
                                {/* <CardSubtitle className='text-muted'>Author: {eachNews.author}</CardSubtitle> */}
                                <CardBody>


                                    <CardText>{eachNews.description}</CardText>
                                    <Button href={eachNews.url}>Read More</Button>
                                </CardBody>
                            </Card>

                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
export default News
