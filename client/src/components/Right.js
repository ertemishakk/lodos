import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import Axios from 'axios';
import Promise from 'promise'
import Spinner from './Spinner'

class Right extends React.Component {

    state = {
        news: [],
        usdBase: {},
        eurBase: {},
        audBase: {},
        gbpBase: {},
        nzdBase: {},
        loading: false
    }

    async componentDidMount() {

        this.setState({
            loading: true
        })

        const [firstresponse, secondresponse, thirdresponse, fourthResponse, fifthResponse, sixtResponse] = await Promise.all(
            [
                Axios.get(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=turkish||turkey&pageSize=25&apiKey=032a0e3b07624eec81a5556013d9b392`),
                Axios.get('https://cors-anywhere.herokuapp.com/https://api.exchangeratesapi.io/latest?base=USD'),
                Axios.get('https://cors-anywhere.herokuapp.com/https://api.exchangeratesapi.io/latest?base=EUR'),
                Axios.get('https://cors-anywhere.herokuapp.com/https://api.exchangeratesapi.io/latest?base=AUD'),
                Axios.get('https://cors-anywhere.herokuapp.com/https://api.exchangeratesapi.io/latest?base=GBP'),
                Axios.get('https://cors-anywhere.herokuapp.com/https://api.exchangeratesapi.io/latest?base=NZD')

            ])

        this.setState({
            news: firstresponse.data.articles,
            usdBase: secondresponse.data.rates,
            eurBase: thirdresponse.data.rates,
            audBase: fourthResponse.data.rates,
            gbpBase: fifthResponse.data.rates,
            nzdBase: sixtResponse.data.rates,
            loading: false

        })


        console.log(this.state)


    }


    render() {

        return (
            <div className='container  ' >

                {/* <ListGroupItem style={{ border: 0 }} tag="a" href="/news">    NEWS</ListGroupItem> */}
                <div className='row border justify-content-center'>
                    <div>
                        <ListGroup >
                            <ListGroupItem style={{ border: 0 }} tag="a" href="/news" >   <span className='font-weight-bold'> NEWS</span>  </ListGroupItem>
                            {this.state.loading ? <ListGroupItem style={{ border: 0 }} >   <Spinner />  </ListGroupItem> : ''}
                        </ListGroup>
                    </div>




                    <div style={{ overflow: 'scroll', height: '30vh' }}>

                        {this.state.news.map((eachNews, index) => (

                            <ListGroup key={index}>

                                <ListGroupItem style={{ fontSize: '14px', border: '0', padding: '5px' }} tag="a" href={eachNews.url}>{eachNews.title}</ListGroupItem>
                            </ListGroup>

                        ))}
                    </div>

                </div>
                <div className='row border justify-content-center mt-5'>
                    <ListGroup style={{ color: '#61aaff' }}>
                        <ListGroupItem style={{ border: 0 }} >  <span className='font-weight-bold' > Currency Rates</span>  </ListGroupItem>
                        {this.state.loading ? <ListGroupItem style={{ border: 0 }} >   <Spinner />  </ListGroupItem> : ''}

                        <ListGroupItem style={{ border: 0 }} className='text-left'>   <i className="fas fa-dollar-sign"></i> :  {parseFloat(this.state.usdBase.TRY).toFixed(3)}</ListGroupItem>
                        <ListGroupItem style={{ border: 0 }} className='text-left'>   <i className="fas fa-euro-sign"></i> :  {parseFloat(this.state.eurBase.TRY).toFixed(3)}</ListGroupItem>
                        <ListGroupItem style={{ border: 0 }} className='text-left'>  <span className='font-weight-bold'>AUD</span> :  {parseFloat(this.state.audBase.TRY).toFixed(3)}</ListGroupItem>
                        <ListGroupItem style={{ border: 0 }} className='text-left'>  <span className='font-weight-bold'>NZD</span> :  {parseFloat(this.state.nzdBase.TRY).toFixed(3)}</ListGroupItem>
                        <ListGroupItem style={{ border: 0 }} className='text-left'>  <i className="fas fa-pound-sign"></i> :  {parseFloat(this.state.gbpBase.TRY).toFixed(3)}</ListGroupItem>
                    </ListGroup>



                </div>

            </div >
        )
    }
}

export default Right
