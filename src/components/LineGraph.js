import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'
import millify from 'millify';

const LineGraph = ({ casesType, country, className }) => {

    const [data, setData] = useState([])
    const [country2, setCountry2] = useState('worldwide')

    const options = {
        legend: {
            display: false,
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0");
                },
            },
        },
        scales: {
            xAxes: [
                {
                    type: "time",
                    time: {
                        format: "MM/DD/YY",
                        tooltipFormat: "ll",
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return numeral(value).format("0a");
                        },
                    },
                },
            ],
        },
    };

    const buildChartData = (data, casesType) => {
        const chartData = []
        let lastDataPoint
        let timeline
        if (country === 'worldwide') {
            timeline = data
        } else {
            timeline = data.timeline
        }
        // console.log(timeline);
        for (let date in timeline[casesType]) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: timeline[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = timeline[casesType][date]
        }
        return chartData
    }
    // const buildChartData = (data, casesType) => {
    //     const chartData = []
    //     let lastDataPoint
    //     let timeline
    //     if(country === 'worldwide'){
    //         timeline = data
    //     }else{
    //         timeline = data.timeline
    //     }
    //     for (let date in data[casesType]) {
    //         if (lastDataPoint) {
    //             const newDataPoint = {
    //                 x: date,
    //                 y: data[casesType][date] - lastDataPoint
    //             }
    //             chartData.push(newDataPoint)
    //         }
    //         lastDataPoint = data[casesType][date]
    //     }
    //     return chartData
    // }

    useEffect(async () => {
        const url = country === 'worldwide' ? 'https://disease.sh/v3/covid-19/historical/all?lastdays=120' : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`
        // const url = 'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
        await fetch(url).then(response => response.json()).then(data => {
            // console.log(data);
            setCountry2(data?.country)
            setData(buildChartData(data, casesType))
        })
    }, [casesType, country])

    return (
        <div className={className}>
            <h3 style={{ marginBottom: '5px' }}><span style={{ textTransform: 'capitalize' }}>{country !== 'worldwide' ? country2 : 'worldwide'}</span> New <span style={{ textTransform: 'capitalize' }}>{casesType}</span> of Last 4 Months</h3>
            {/* <h3>Worldwide New <span style={{ textTransform: 'capitalize' }}>{casesType}</span> of Last 4 Months</h3> */}
            {
                data?.length > 0 && (
                    <Line
                        options={options}
                        data={{
                            datasets: [
                                {
                                    data: data,
                                    backgroundColor: "rgba(204,16,52,0.5)",
                                    borderColor: '#CC1034',
                                }
                            ]
                        }}
                    />
                )
            }
        </div>
    )
};

export default LineGraph;
