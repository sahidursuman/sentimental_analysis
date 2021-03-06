import React from "react"
import NavBar from "./NavBar.js"
import Header from "./Header.js"
import { Line, Bar } from "react-chartjs-2"
import { connect } from "react-redux"
import { fetchArticles } from "../actions/articleActions.js"
import { bindActionCreators } from "redux"


class Home extends React.Component {

  state = {
    date: "Select All",
  }
  componentDidMount() {
    this.props.getArticles()
  }

  getEmotionByStation = (emotion, station) => {
    if(this.props.articles.loading === true) {
      let filteredArticles = this.props.articles.articles.filter((article) => {
        return article.news_station === station
      })
      let emotionObj = filteredArticles.map((article) => {
        return {anger: article.anger, joy: article.joy, fear: article.fear, surprise: article.surprise, sadness: article.sadness}
      })
      let arrayOfData = emotionObj.map((emotes) => {
        return parseInt(emotes[emotion] * 100, 10)
      })
      return this.getAverage(arrayOfData)
    } else {
      return null
    }
  }

  getAverage = (emotionData) => {
    let length = emotionData.length
    let sum = emotionData.reduce((a, b) => {
      return a + b
    }, 0)
    return (sum / length)
  }

  getUniqueDates = () => {
    let datesObj = {}

    if (this.props.articles.loading === true) {
      this.props.articles.articles.forEach((article) => {
        if(!datesObj[article.date]) {
          datesObj[article.date] = 1
        } else {
          datesObj[article.date] += 1
        }
      })
    }
    let uniques = []
    for (let key in datesObj) {
      if(uniques.indexOf(key) === -1) {
        uniques.push(key)
      }
    }
    return uniques;
  }

  onChange = (event) => {
    this.setState({
      date: event.target.value,
    })
  }

  getArticlesByDate = (emotion, dateState) => {
    if(this.props.articles.loading === true) {
      let filteredDates = this.props.articles.articles.filter((article) => {
        return article.date === dateState
      })
      let emots = filteredDates.map((article) => {
        return {anger: article.anger, joy: article.joy, fear: article.fear, surprise: article.surprise, sadness: article.sadness}
      })
      let arrayOfData = emots.map((emotes) => {
        return parseInt(emotes[emotion] * 100, 10)
      })
      return this.getAverage(arrayOfData)
    } else {
      return null
    }
  }

  render() {
    const data = {
        labels: ["Anger", "Joy", "Fear", "Surprise", "Sadness"],

        datasets: [{
          label: "New York Times",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "black",
          borderColor: "black",
          data: [this.getEmotionByStation("anger", "New York Times"), this.getEmotionByStation("joy", "New York Times"), this.getEmotionByStation("fear", "New York Times"), this.getEmotionByStation("surprise", "New York Times"), this.getEmotionByStation("sadness", "New York Times")]
        },
        {
          label: "CNN",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "blue",
          borderColor: "blue",
          data: [this.getEmotionByStation("anger", "Cable News Network"), this.getEmotionByStation("joy", "Cable News Network"), this.getEmotionByStation("fear", "Cable News Network"), this.getEmotionByStation("surprise", "Cable News Network"), this.getEmotionByStation("sadness", "Cable News Network")]
        },
        {
          label: "Fox",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "red",
          borderColor: "red",
          data: [this.getEmotionByStation("anger", "Fox News"), this.getEmotionByStation("joy", "Fox News"), this.getEmotionByStation("fear", "Fox News"), this.getEmotionByStation("surprise", "Fox News"), this.getEmotionByStation("sadness", "Fox News")]
        },
        {
          label: "ABC",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "green",
          borderColor: "green",
          data: [this.getEmotionByStation("anger", "American Broadcasting Corporation"), this.getEmotionByStation("joy", "American Broadcasting Corporation"), this.getEmotionByStation("fear", "American Broadcasting Corporation"), this.getEmotionByStation("surprise", "American Broadcasting Corporation"), this.getEmotionByStation("sadness", "American Broadcasting Corporation")]
        },
        {
          label: "BBC",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "orange",
          borderColor: "orange",
          data: [this.getEmotionByStation("anger", "British Broadcasting Corporation"), this.getEmotionByStation("joy", "British Broadcasting Corporation"), this.getEmotionByStation("fear", "British Broadcasting Corporation"), this.getEmotionByStation("surprise", "British Broadcasting Corporation"), this.getEmotionByStation("sadness", "British Broadcasting Corporation")]
        }
      ],

    }
    const data2 = {
        labels: [this.state.date],

        datasets: [{
          label: "Anger",
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#FF4136',
          data: [this.getArticlesByDate("anger", this.state.date)]
        },
        {
          label: "Joy",
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#A1E9F4',
          data: [this.getArticlesByDate("joy", this.state.date)]
        },
        {
          label: "Fear",
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#480710',
          data: [this.getArticlesByDate("fear", this.state.date)]
        },
        {
          label: "Surprise",
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#01FF70',
          data: [this.getArticlesByDate("surprise", this.state.date)]
        },
        {
          label: "Sadness",
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#001f3f',
          data: [this.getArticlesByDate("sadness", this.state.date)]
        }
      ],
    }
    const options = {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  fontSize: 16
              }
          }],
          xAxes: [{
              ticks: {
                  beginAtZero: true,
                  fontSize: 25
              }
          }]
      }
    }

    return (
      <div>
      <NavBar/>
      <Header/>
        <div className="home-page" style={{"marginLeft":"5%", "marginRight":"5%"}}>
          <h1 style={{"fontFamily": "'Rokkitt', serif"}}>Filter By Date</h1>
          <select onChange={this.onChange}>
            <option>Select All</option>
            {this.getUniqueDates().map((date, index) => <option key={index}>{date}</option>)}
          </select>
        </div>
        <div style={{"marginLeft":"10%", "marginRight":"10%"}}>
          {this.state.date === "Select All" ? <Line data={data} options={options}/> : <Bar data={data2} options={options}/>}
        </div>
          {this.state.date === "Select All" ? <h1 style={{"textAlign":"center", "fontFamily":"'Rokkitt', serif"}}>Total Sentiment Amongst Most Popular Articles (May 3, 2018)</h1> : null} 
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articles,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getArticles: bindActionCreators(fetchArticles, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
