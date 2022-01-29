import React, { useEffect, useState } from 'react';
import './app.css';
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core'
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import { prettyPrintStat, sortData } from './utils'
import LineGraph from './components/LineGraph';
import "leaflet/dist/leaflet.css"

const App = () => {

    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState('worldwide')
    const [countryInfo, setCountryInfo] = useState({})
    const [tableData, setTableData] = useState([])
    const [mapCenter, setMapCenter] = useState([34.80746, -40.4796])
    const [casesType, setCasesType] = useState('cases')
    // const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
    const [mapZoom, setMapZoom] = useState(2)
    const [mapCountries, setMapCountries] = useState([])

    // Get all countries
    useEffect(() => {
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json()).then((data) => {
                // console.log(data);
                const countries = data.map((country) => (
                    {
                        name: country.country,
                        value: country.countryInfo.iso2
                    }
                ))
                const sortedData = sortData(data)
                setCountries(countries)
                setTableData(sortedData)
                setMapCountries(data)
            })
        }
        getCountriesData()
    }, [])


    // Get the worldwide or specific country data
    useEffect(async () => {
        const url = country === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${country}`
        // console.log(mapCenter, country);
        await fetch(url).then((response) => response.json()).then((data) => {
            // console.log(data);
            setCountryInfo(data)
            if (country === 'worldwide') {
                setMapCenter([34.80746, -40.4796])
                setMapZoom(2)
            } else {
                setMapCenter([data.countryInfo.lat, data.countryInfo.long])
                setMapZoom(4)
            }
        })
    }, [country])

    return (
        <div className='app'>
            <div className="app__left">
                <div className="app__header">
                    <h1>COVID-19 TRACKER</h1>
                    <FormControl className='app__dropdown'>
                        <Select variant='outlined' value={country} onChange={(e) => setCountry(e.target.value)}>
                            <MenuItem value="worldwide">Worldwide</MenuItem>
                            {
                                countries.map((country, index) => (
                                    <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className="app__stats">
                    {/* <InfoBox title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={countryInfo.cases} /> */}
                    <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} onClick={() => setCasesType('cases')} active={casesType === 'cases'} isRed />
                    <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} onClick={() => setCasesType('recovered')} active={casesType === 'recovered'} />
                    <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} onClick={() => setCasesType('deaths')} active={casesType === 'deaths'} isRed />
                </div>
                <Map mapCountries={mapCountries} center={mapCenter} zoom={mapZoom} casesType={casesType} />
            </div>
            <Card className="app__right">
                <CardContent className='app__cardContent'>
                    <h3>Live Cases by Country</h3>
                    <Table countries={tableData} />
                    <LineGraph className="app__graph" casesType={casesType} country={country} />
                </CardContent>
            </Card>
        </div>
    )
};

export default App;
