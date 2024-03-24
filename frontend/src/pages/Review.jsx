import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Select, MenuItem } from '@mui/material';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import '../App.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation


const Review = () => {
    const [building, setBuilding] = useState('none');
    const [floor, setFloor] = useState('none');
    const [room, setRoom] = useState('none');
    const [reviews, setReviews] = useState([]);
    const [roomsList, setRoomsList] = useState([]);

    const location = useLocation();
    const { state } = location;
    const buildingParam = state ? state.buildingParam : null;

    useEffect(() => {
        if (buildingParam) {
            setBuilding(buildingParam);
        }
    }, [buildingParam]);

    


    const buildingData = [
        {
            buildingName: "Beatty Hall",
            floors: ["Ground", "Floor 1", "Floor 2", "Floor 3", "Floor 4"],
        },
        {
            buildingName: "Wentworth Hall",
            floors: ["Ground", "Floor 1"]
        },
        {
            buildingName: "Watson Hall",
            floors: ["Ground", "Floor 1", "Floor"],
        }
    ]

    const handleBuildingChange = (event) => {
        setBuilding(event.target.value);
    };

    const handleFloorChange = (event) => {
        setFloor(event.target.value);
    };

    const handleRoomChange = (event) => {
        setRoom(event.target.value);
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                console.log("Floor", floor);
                const response = await axios.get(`http://localhost:5555/review/?building=${(!(building === "none") ? building : "")}&floor=${(!(floor === "none") ? floor : "")}&room=${(!(room === "none") ? room : "")}`);
                setReviews(response.data); // Assuming response.data is an array of reviews
                if(!(building === "none") && !(floor === "none")) {
                    const responseRooms = await axios.get(`http://localhost:5555/review/rooms/?building=${building}&floor=${floor}`)
                    console.log("Room", responseRooms.data);
                    setRoomsList(responseRooms.data);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setReviews([]);
            }
        };

        fetchReviews();
    }, [building, floor, room]);

    const cBuildingItem = buildingData.find(buildingItem => buildingItem.buildingName === building);
    const floorList = cBuildingItem ? cBuildingItem.floors : [];

    return (
        <Grid container spacing={2} style={{ height: '100vh', marginBottom: '50px'}}>
            <Grid item xs={3} style={{height: '100%'}}>
                <Paper className="panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: 'lightgrey' }}>
                    <Typography variant="h5" style={{ marginBottom: '1rem', color: '#333' }}>Building</Typography>
                    <div style={{ width: '70%', marginBottom: '1rem' }}>
                        <Select fullWidth value={building} onChange={handleBuildingChange}>
                            <MenuItem value="none">None</MenuItem>
                            {buildingData.map((building, index) => (
                                <MenuItem key={index} value={building.buildingName}>{building.buildingName}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <Typography variant="h5" style={{ marginBottom: '1rem', color: '#333' }}>Floor</Typography>

                    <div style={{ width: '70%', marginBottom: '1rem' }}>
                        <Select fullWidth value={floor} onChange={handleFloorChange} disabled={building === "none"}>
                            <MenuItem value="none">None</MenuItem>
                            {floorList.map((floorItem, index) =>
                                <MenuItem key={index} value={floorItem}>{floorItem}</MenuItem>
                            )}
                        </Select>
                    </div>
                    <Typography variant="h5" style={{ marginBottom: '1rem', color: '#333' }}>Room</Typography>

                    <div style={{ width: '70%' }}>
                        <Select  fullWidth value={room} onChange={handleRoomChange} disabled={!(!(floor === "none") && !(building === "none"))}>
                            <MenuItem value="none">None</MenuItem>
                            {roomsList.map((roomItem, index) => 
                                <MenuItem key={index} value={roomItem}>{roomItem}</MenuItem>
                            )}
                        </Select>
                    </div>
                </Paper>
            </Grid>
           <Grid item xs={9} style={{ height: '100%', paddingBottom: '50px' }}>
  <div id='rightSide' style={{ height: '100%', overflow: 'hidden', overflowY: 'auto', padding: '16px', paddingBottom: '50px' }}>
    <ReviewForm building={building} floor={floor} roomItem={room} />
    <ReviewList reviews={reviews} />
  </div>
</Grid>


        </Grid>
    );
}

export default Review;
