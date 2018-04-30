import React from "react"
import { Bar } from "react-chartjs-2"
// import data from "./data.js"

class Chart extends React.Component {

  getEmotionByCategory = (specificEmotion)  => {
    if(this.props.allEmotions.loading === true) {
      let arrayOfData = this.props.allEmotions.emotions.map((emotionObj) => {
        return parseInt(emotionObj[specificEmotion] * 100)
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

  render() {
    const data = {
        labels: ["All Time Mood (from #AboutAWeekAgo)"],
        datasets: [
            {
                label: "Anger",
                backgroundColor: '#FF4136',
                borderWidth: 1,
                data: [this.getEmotionByCategory("anger")],
            },
            {
                label: "Joy",
                backgroundColor: '#A1E9F4',
                borderWidth: 1,
                data: [this.getEmotionByCategory("joy")],
            },
            {
                label: "Fear",
                backgroundColor: '#480710',
                borderWidth: 1,
                data: [this.getEmotionByCategory("fear")],
            },
            {
                label: "Surprise",
                backgroundColor: '#01FF70',
                borderWidth: 1,
                data: [this.getEmotionByCategory("surprise")],
            },
            {
                label: "Sadness",
                backgroundColor: '#001f3f',
                borderWidth: 1,
                data: [this.getEmotionByCategory("sadness")],
            }
        ],
        scaleBeginAtZero : true,
        options: {
          scales: {
            xAxes: [{
              stacked: true,
            }],
              yAxes: [{
                stacked: true,
                ticks: {
                  beginAtZero: true
                },
              }]
          }
        }
    }

    console.log("chart props", this.props);
    return (
      <div>
        {this.props.allEmotions.loading === true ? <Bar data={data}/> : null}
      </div>
    )
  }
}


export default Chart


// this.props.allEmotions.emotions