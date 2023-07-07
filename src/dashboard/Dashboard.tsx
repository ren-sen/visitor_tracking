import { FC, useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import './Dashboard.css';
import exampleGraph from '../assets/example_graph.png';

const Dashboard: FC = () => {
    interface AccessPointData {
        name: string;
        currentVisitors: number;
        totalUniqueVisitors: number;
        occupancyRate: number;
    }
    interface DataTypeToString {
        [key: string] : string
    }
    interface Device {
        macAddr: string;
        accessPoint: string;
    }

    type TrafficData = 'currentVisitors' | 'totalUniqueVisitors' | 'occupancyRate';
    const dataTypes: Array<TrafficData> = ['currentVisitors', 'totalUniqueVisitors', 'occupancyRate'];

    const stringifyDataType: DataTypeToString = {
        'currentVisitors': 'Current Visitors',
        'totalUniqueVisitors': 'Total Unique Visitors',
        'occupancyRate': 'Occupancy Rate (as avg. # of people)'
    }

    const data: Array<AccessPointData> = [
        {
            name: "All Access Points",
            currentVisitors: 52,
            totalUniqueVisitors: 143,
            occupancyRate: 68 
        },
        {
            name: "Access Point 1",
            currentVisitors: 23,
            totalUniqueVisitors: 68,
            occupancyRate: 35
        },
        {
            name: "Access Point 2",
            currentVisitors: 17,
            totalUniqueVisitors: 24,
            occupancyRate: 17
        },
        {
            name: "Access Point 3",
            currentVisitors: 6,
            totalUniqueVisitors: 42,
            occupancyRate: 28
        },
        {
            name: "Access Point 4",
            currentVisitors: 6,
            totalUniqueVisitors: 9,
            occupancyRate: 4
        },
    ];

    const devices: Array<Device> = [
        {
            macAddr: '00:0A:95:9D:68:16',
            accessPoint: "Access Point 1"
        },
        {
            macAddr: '08:00:27:AB:CD:EF',
            accessPoint: "Access Point 3"
        },
        {
            macAddr: '20:4C:03:2F:55:88',
            accessPoint: "Access Point 2"
        },
        {
            macAddr: '1C:B7:2C:6A:8E:41',
            accessPoint: "Access Point 4"
        },
        {
            macAddr: '40:6C:8F:12:34:56',
            accessPoint: "Access Point 1"
        },
    ];

    const [dataType, setDataType] = useState<TrafficData>(dataTypes[0]);
    const [selectedAccessPoint, setSelectedAccessPoint] = useState<AccessPointData>(data[0]);
    const [dataDisplay, setDataDisplay] = useState(selectedAccessPoint[dataType]);

    useEffect(() => {
        setDataDisplay(selectedAccessPoint[dataType])
    }, [selectedAccessPoint]);
    useEffect(() => {
        setDataDisplay(selectedAccessPoint[dataType])
    }, [dataType]);

    function onSelectAccessPoint(event: Event, index: number) {
        event.preventDefault();

        setSelectedAccessPoint(data[index]);
    }

    function onSelectDataType(event: Event, index: number) {
        event.preventDefault();

        setDataType(dataTypes[index]);
    }

    const renderAccessPointTableRows = data.map((accessPointData, index) => {
        return (
          <tr key={index}>
            <td>
                <button onClick={(event) => onSelectAccessPoint(event.nativeEvent, index)}>
                    {accessPointData.name}
                </button>
            </td>
          </tr>
        );
    });

      const renderDataTypeTableRows = dataTypes.map((currDataType, index) => {
        return (
            <tr key={index}>
                <td>
                    <button onClick={(event) => onSelectDataType(event.nativeEvent, index)}>
                        {stringifyDataType[currDataType]}
                    </button>
                </td>
            </tr>
        );
    });
    
    const renderMacAddressTableRows = devices.map((device, index) => {
        return (
            <tr key={index}>
                <td>
                    {device.macAddr}
                </td>
                <td>
                    {device.accessPoint}
                </td>
            </tr>
        );
    })

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-body">
                <div className="left-row">
                    <div className="visitor-count">
                        <span className="count">{dataDisplay}</span>
                        <span className="data-type">{stringifyDataType[dataType]}</span>
                        <span className="descriptor">In {selectedAccessPoint.name}</span>
                    </div>
                    <div className="access-point-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Access Point</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderAccessPointTableRows}
                            </tbody>
                        </table>
                        <table>
                            <thead>
                                <tr>
                                    <th>Data Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderDataTypeTableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="right-row">
                    <div className="active-addresses">
                        <table>
                            <thead>
                                <tr>
                                    <th>Mac Address</th>
                                    <th>Current Access Point</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderMacAddressTableRows}
                            </tbody>
                        </table>
                    </div>
                    <div className="analytics">
                        <img src={exampleGraph} alt="Example Graph"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;