import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) =>{
    const { country = 'in', pageSize = 10, category = 'general' } = props;
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    
    // const async componentDidMount(){
        //     this.update();
        // }
        
        const capitalizeFirstWord = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        
        // constructor(props){
            //     super(props);
            //     this.state = {
    //         articles: [],
    //         loading: false,
    //         page:1,
    //         totalResults: 0
    //     }
    // } 
    const update = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page}&pageSize=${props.pagesize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    
    useEffect(() => {
        document.title = `${capitalizeFirstWord(props.category)} - NewsUpdater`;
        update();
    }, [])
    
    //     handlePrevClick = async()=>{
        //         this.setState({page: this.state.page - 1});
        //         this.update();
//     }
//     handleNextClick = async()=>{
//         this.setState({page: this.state.page + 1});
//         this.update();
// }
    const fetchMoreData = async() => {
        setPage(page + 1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page+1}&pageSize=${props.pagesize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    };
    return (
        <>
      <div className='container my-3'>
        <h1 className='text-center' style={{margin: '90px 35px 3px'}}>NewsUpdater - Top {capitalizeFirstWord(props.category)} Headlines</h1>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
        <div className="container">
        <div className="row my-4">
        {
        // !this.state.loading && 
        articles.map((element) =>{
            return <div className="col-md-4"  key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source.name} author={element.author} date={element.publishedAt}/>
            </div>
        })}
        </div>
        </div>
    </InfiniteScroll>
        
      </div>
      </>
    )
  }


// News.defaultProps = {
   
// }
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News