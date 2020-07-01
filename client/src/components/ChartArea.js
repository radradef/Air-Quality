import React from 'react';
import {Card} from 'reactstrap';
import LineChart from './chart/LineChart'

function ChartArea(){

    return(
        <div>
            <LineChart name="Particulate matter"
                datasets={[
                    {
                        id: "pm25",
                        color: "rgb(255, 0, 255, 1)",
                        label: "PM25"
                        
                    },
                    {
                        id: "pm10",
                        color: "rgba(0, 230, 64, 1)",
                        label: "PM10"
                        
                    }
                ]}
            />
            <LineChart name="Temperature"
                datasets={[
                    {
                        id: "temp",
                        color: "rgba(240, 52, 52, 1)",
                        label: "Temperature °C"
                        
                    }
                ]}
            />
            <LineChart name="Humidity"
                datasets={[
                    {
                        id: "hum",
                        color: "rgba(30, 139, 195, 1)",
                        label: "Humidity %"
                    }
                ]}
            />
        </div>
    );
}

export default ChartArea;