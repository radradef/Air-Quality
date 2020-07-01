import React, {useEffect, useState} from 'react';
import ChartButtons from './ChartButtonGroup';
import {Line} from 'react-chartjs-2';
import {Spinner, Card} from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';

function LineChart(props){ 

    const [values, setValues] = useState([]);
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [api, setApi] = useState("/api/day-data");
    
    const handleAPI = (id) => {
        switch(id){
            case 2:
                setApi("/api/12hour-data");
                break;
            case 3:
                setApi("/api/3hour-data");
                break;
            case 4:
                setApi("/api/hour-data");
                break;
            default:
                setApi("/api/day-data");        
        }
    }
    const getChartData = () => {

        return {    
                labels: values.map(item => {
                    const date = new Date(item.date);
                    const day = date.toLocaleDateString(navigator.language,
                        {day:'2-digit', month:'2-digit'});
                    const time = date.toLocaleTimeString(navigator.language,
                        {hour: '2-digit', minute:'2-digit'});
                    var labels = [];
                    labels.push(time);
                    labels.push(day);
                    return(labels);         
                }),    
                datasets: getDatasets()      
        }
    }
    const getDatasets = () => {
        var datasets = [];

        for(let i = 0; i < props.datasets.length; i++){
            datasets.push(
                {  
                    label: props.datasets[i].label,
                    backgroundColor: props.datasets[i].color,
                    data: values.map(item => item[props.datasets[i].id]),
                    pointRadius: 0
                }
            );
        }
        return datasets;
    }   
    useEffect(() => {
        fetch(api)
        .then(res => res.json())
        .then(
            (values) => {
                setValues(values);
                setIsLoaded(true);
        },
            (error) => {
                setError(error);
                setIsLoaded(true);
            }
        )
      },[api]);
    
    if(error){
        return(
            <div>Error: {error.message}</div>
        );
    } else {
        return(
            <Card>   
                <h5>{props.name}</h5>
                <ChartButtons api={handleAPI} /> 
                <LoadingOverlay 
                    active={!isLoaded}
                    spinner={
                        <Spinner color="primary" />
                    }
                    styles={{
                        overlay: (base) => ({
                          ...base,
                          background: 'rgba(255,255,255,0.5)'
                        })
                      }}
                    >       
                    <Line options={
                        {
                            responsive: true,
                            scales: {
                                xAxes:[{
                                    ticks:{
                                        display: true,
                                        autoSkip: true,
                                        maxTicksLimit: 7,
                                        maxRotation: 0,
                                        minRotation: 0
                                    }
                                }],
                                yAxes:[{
                                    ticks:{
                                        display: true,
                                        autoSkip: true,
                                        maxTicksLimit: 7,
                                        maxRotation: 0,
                                        minRotation: 0
                                    }
                                }],
                            },
                            animation: {
                                duration: 250,
                                numSteps: 7,
                                easing: "easeOutQuart"
                            }
                        }
                    }
                        data={getChartData()}
                    /> 
                </LoadingOverlay>
            </Card>    
        );
    }
}

export default LineChart;