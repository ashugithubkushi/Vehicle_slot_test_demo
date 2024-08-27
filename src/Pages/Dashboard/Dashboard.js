import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Box } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import './Dashboard.css';
import Navbar from '../../Components/Navbar/Navbar';

const Dashboard = () => {
const [totalSlots, setTotalSlots] = useState(0);
const [totalVehicles, setTotalVehicles] = useState(0);
const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        axios
          .get("https://combined-data1.free.beeceptor.com/combined-data")
          // .get("")
          .then((response) => {
            // Check if response.data exists and has counts object
            if (response.data && response.data.counts) {
              setTotalSlots(response.data.counts.totalSlots || 0);
              setTotalVehicles(response.data.counts.totalVehicles || 0);
              setTotalUsers(response.data.counts.totalUsers || 0);
              console.log("Total Counts", response);
            } else {
              console.error("Invalid or empty counts data:", response.data);
              // Handle the case where counts data is not as expected
              setTotalSlots(0);
              setTotalVehicles(0);
              setTotalUsers(0);
            }
          })
          .catch((error) => {
            console.error("Error fetching combined data:", error);
          });
      }, []);

      
  return (
    <div>
         <Navbar/>
    <Box  sx={{ width: "100%", p: 1, height: "100vh", mt: 1, borderRadius: 5 }}>

    <div className="grid-containers">
          {/* Slot count  */}
          <div className="grid-items">
            <div className="d-flex justify-content-between align-items-center">
              <div className="count-text">
                <h1>
                  <b>{totalSlots}</b>
                </h1>
                <h5>
                  <strong>Booked Slots</strong>
                </h5>
              </div>
              <div className="icon-wrapper">
                <ListAltIcon className="list-icon" sx={{ fontSize: 45 }} />
              </div>
            </div>
          </div>

          <div
            className="grid-items"
            //  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="count-text">
                <h1>
                  <b>{totalVehicles}</b>
                </h1>
                <h5>
                  <strong>Total Vehicles</strong>
                </h5>
              </div>
              <div className="icon-wrapper">
                <AgricultureIcon className="list-icon" sx={{ fontSize: 55 }} />
              </div>
            </div>
          </div>

          {/* Total users  */}
          <div className="grid-items">
            <div className="d-flex justify-content-between align-items-center">
              <div className="count-text">
                <h1>
                  <b>{totalUsers}</b>
                </h1>
                <h5>
                  <strong>Total Users</strong>
                </h5>
              </div>
              <div className="icon-wrapper">
                <PeopleAltIcon className="list-icon" sx={{ fontSize: 55 }} />
              </div>
            </div>
          </div>
        </div>

    </Box>
    </div>
  )
}

export default Dashboard