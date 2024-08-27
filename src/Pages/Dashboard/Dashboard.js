import React, { useEffect, useState } from "react";
import "./Dashboard.css";
// import Navbar from "./Navbar";
import { Box } from "@mui/material";
import axios from "axios";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const Dashboard = () => {
  const [vehicleNumbers, setVehicleNumbers] = useState([]);
  const [totalSlots, setTotalSlots] = useState(0);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const [modal, setModal] = useState(false);
  const [villaNumber, setVillaNumber] = useState("");

  const timeSlots = [
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
    "07:00 PM - 08:00 PM",
    "08:00 PM - 09:00 PM",
  ];

  //
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    axios
      // .get("https://combined-data1.free.beeceptor.com/combined-data")
      .get("")
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

  // const [vehicleCounts, setVehicleCounts] = useState({});
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/vehicles/counts")
  //     .then((response) => {
  //       setVehicleCounts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching vehicle counts:", error);
  //     });
  // }, []);

  //on click vehicle
  // const handleVehicleClick = (selectedVehicle) => {
  //   setSelectedVehicle(selectedVehicle);
  //   toggleModal();
  // };

  const [selectedVehicleName, setSelectedVehicleName] = useState("");
  const [selectedVehicleNumber, setSelectedVehicleNumber] = useState("");

  // Handle vehicle click
  // const handleVehicleClick = (vehicle) => {
  //   setSelectedVehicle(vehicle.vehicleId);
  //   setSelectedVehicleName(vehicle.vehicleName);

  //   fetch(
  //     `https://slotapi3.free.beeceptor.com/slots?vehicle=${vehicle.vehicleId}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data && data.vehicles) {
  //         const vehicleData = data.vehicles.find(
  //           (v) => v.vehicleNumber === vehicle.vehicleId
  //         );
  //         setAvailableDates(vehicleData ? vehicleData.dates : []);
  //       } else {
  //         console.error("Invalid or empty slots data:", data);
  //         setAvailableDates([]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching available slots:", error);
  //     });

  //   toggleModal();
  // };

  // imp
  // const handleVehicleClick = (vehicle) => {
  //   setSelectedVehicleName(vehicle.vehicleName);

  //   fetch(
  //     `https://slotapi3.free.beeceptor.com/slots?vehicleName=${encodeURIComponent(vehicle.vehicleName)}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data && data.vehicles) {
  //         const vehicleData = data.vehicles.find(
  //           (v) => v.vehicleName === vehicle.vehicleName
  //         );
  //         setAvailableDates(vehicleData ? vehicleData.dates : []);
  //       } else {
  //         console.error("Invalid or empty slots data:", data);
  //         setAvailableDates([]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching available slots:", error);
  //     });

  //   toggleModal();
  // };

  // const handleVehicleClick = (vehicle) => {
  //   setSelectedVehicleName(vehicle.vehicleName);
  
  //   // Fetch available slots based on vehicle name
  //   fetch(`https://slotapi3.free.beeceptor.com/slots?vehicleName=${vehicle.vehicleName}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("API Response of Slots:", data);
  //       if (data && data.vehicles) {
  //         const vehicleData = data.vehicles.find(
  //           (v) => v.vehicleName === vehicle.vehicleName
  //         );
  //         setAvailableDates(vehicleData ? vehicleData.dates : []);
  //       } else {
  //         console.error("Invalid or empty slots data:", data);
  //         setAvailableDates([]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching available slots:", error);
  //     });
  // toggleModal();
  // };
  const handleVehicleClick = (vehicle) => {
    setSelectedVehicleName(vehicle.vehicleName);
    fetchSlots(vehicle.vehicleName);
    toggleModal();
  };

  const fetchSlots = (vehicleName) => {
    fetch(`https://slotapi3.free.beeceptor.com/slots?vehicleName=${vehicleName}`) 
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response of Slots:", data);
        if (data && data.vehicles) {
          const vehicleData = data.vehicles.find(
            (v) => v.vehicleName === vehicleName
          );
          setAvailableDates(vehicleData ? vehicleData.dates : []);
        } else {
          console.error("Invalid or empty slots data:", data);
          setAvailableDates([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching available slots:", error);
      });
  };
  

  const toggleModal = () => {
    if (!modal) {
      setModal(true);
      resetForm();
    } else {
      setModal(false);
    }
  };

  const resetForm = () => {
    setVillaNumber("");
    setDate("");
    setSelectedTime("");
    setSelectedVehicle("");
    setSelectedVehicleNumber("");
  };

  // const handleTimeClick = (time, date) => {
  //   const dateData = availableDates.find((d) => d.date === date);
  //   if (dateData) {
  //     const slot = dateData.slots.find((slot) => slot.time === time);
  //     if (slot && slot.isBooked) {
  //       alert("This slot is already booked.");
  //       return;
  //     }
  //   }
  //   setSelectedTime(time);
  // };
  const handleTimeClick = (time, date) => {
    const dateData = availableDates.find((d) => d.date === date);
    if (dateData) {
      const slot = dateData.slots.find((slot) => slot.time === time);
      if (slot && slot.isBooked) {
        alert("This slot is already booked.");
        return;
      }
    }
    setSelectedTime(time);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setSelectedTime("");
  };

  // useEffect(() => {
  //   if (selectedVehicleName) {
  //     axios
  //       .get("https://getvehicles.free.beeceptor.com/getVeh")
  //       .then((response) => {
  //         const vehicles = response.data;
  //         console.log("Response from vehicleNumbers", response)
  //         const filteredData = vehicles
  //           .filter((vehicle) => vehicle.vehicleName === selectedVehicleName)
  //           .map((vehicle) => vehicle.vehicleNum);
  //         setVehicleNumbers(filteredData);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching vehicle numbers:", error);
  //       });
  //   }
  // }, [selectedVehicleName]);

  // useEffect(() => {
  //   if (selectedVehicleName) {
  //     axios
  //       .get("https://getveh.free.beeceptor.com/getVeh")
  //       .then((response) => {

  //         if (
  //           response.data &&
  //           response.data.vehicles &&
  //           Array.isArray(response.data.vehicles)
  //         ) {
  //           const formattedVehicles = response.data.vehicles.map((vehicle) => {
  //             return {
  //               id: vehicle.id, // Include the ID
  //               vehicleName: vehicle.vehicleName,
  //             };
  //           });
  //           setVehicles(formattedVehicles);
  //         } else {
  //           console.error("Invalid or empty vehicle data:", response.data);
  //           setVehicles([]); // Clear vehicles if data is not as expected
  //         }

  //         console.log("API Response Vehicles:", response);
  //         const vehicles = response.data;
  //         const filteredData = vehicles
  //           .filter((vehicle) => vehicle.vehicleName === selectedVehicleName)
  //           .map((vehicle) => vehicle.vehicleNum);
  //         setVehicleNumbers(filteredData);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching vehicle numbers:", error);
  //       });
  //   }
  // }, [selectedVehicleName]);
  // useEffect(() => {
  //   // Fetch data from API when the component mounts
  //   axios
  //     .get("https://getveh.free.beeceptor.com/getVeh")
  //     .then((response) => {
  //       console.log("API Response Vehicles:", response);
  //       setVehicles(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching vehicle data:", error);
  //     });
  // }, []);

  const [aggregatedVehicles, setAggregatedVehicles] = useState([]);

  useEffect(() => {
  axios
    // .get("https://vehnum1.free.beeceptor.com/vehNum1")
    .get("")
    .then((response) => {
      const vehicles = response.data;

      // Aggregate vehicle data by vehicleName
      const vehicleMap = vehicles.reduce((acc, vehicle) => {
        if (!acc[vehicle.vehicleName]) {
          acc[vehicle.vehicleName] = {
            id: vehicle._id, 
            count: 0,
            vehicleNums: [] 
          };
        }
        acc[vehicle.vehicleName].count += 1;
        acc[vehicle.vehicleName].vehicleNums.push(vehicle.vehicleNum); // Collect vehicle numbers
        return acc;
      }, {});

      // Convert the aggregated data into an array of objects
      const aggregatedData = Object.keys(vehicleMap).map((vehicleName) => ({
        vehicleName,
        id: vehicleMap[vehicleName].id,
        count: vehicleMap[vehicleName].count,
        vehicleNums: Array.from(new Set(vehicleMap[vehicleName].vehicleNums)) // Remove duplicates
      }));

      setAggregatedVehicles(aggregatedData);
    })
    .catch((error) => {
      console.error("Error fetching vehicle data:", error);
    });
}, []);


useEffect(() => {
  const selectedVehicle = aggregatedVehicles.find(vehicle => vehicle.vehicleName === selectedVehicleName);
  if (selectedVehicle) {
    setVehicleNumbers(selectedVehicle.vehicleNums);
  } else {
    setVehicleNumbers([]);
  }
}, [selectedVehicleName, aggregatedVehicles]);







//


  const handleVehicleChange = (e) => {
    setSelectedVehicle(e.target.value);
    setDate("");
    setSelectedTime("");
  };

  // handleSubmit
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setFormErrors({});

    // Basic validation
    const errors = {};
    if (!selectedVehicleNumber) errors.vehicle = "Vehicle number is required.";
    if (!date) errors.date = "Date is required.";
    if (!selectedTime) errors.time = "Time slot is required.";
    if (!villaNumber) errors.villaNumber = "Villa number is required.";

    // If there are errors, set them and return
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const formData = {
      vehicle: selectedVehicleNumber,
      date,
      timeSlot: selectedTime,
      villaNumber,
    };

    axios
      .post("https://vehicles-slot.free.beeceptor.com/submit", {
        formData,
      })
      .then((response) => {
        console.log("Response from server", response);
        console.log("response from Api", response.data);
        const combinedData = `Selected VehicleName: ${selectedVehicleName}\nSelected Vehicle: ${selectedVehicleNumber}\nSelected Date: ${date}\nSelected Time Slot: ${selectedTime}\nVilla Number: ${villaNumber}`;
        console.log("Submitted data", combinedData);
      })
      .catch((error) => {
        console.error("Error Occured", error);
      });
  };

  return (
    <div>
      {/* <Navbar /> */}
      <Box
        sx={{ width: "100%", p: 1, height: "100vh", mt: 1, borderRadius: 5 }}
      >
        {/* Total slots, total users, total vehicles */}
        <div class="grid-containers">
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

        {/* vehicles  */}
        <div className="container-fluid mt-5">
          <div className="m-1">
            <h4>
              <strong>Click here to book your Slot</strong>
            </h4>
          </div>
          <div className="row">
            {/* Main Container */}
            <div className="col-lg-8">
              <div className="row">
                {aggregatedVehicles.map((vehicle, index) => (
                  <div key={index} className="col-xl-4 col-lg-6 col-md-6 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <img
                            // src="https://4.imimg.com/data4/KJ/BY/MY-14831048/john-deere-5050d-tractor.jpg"
                            // alt="Vehicle Icon"
                            className="vehicle-icon"
                          />
                          <h5 className="card-title ms-2">
                            <span className="text-muted">
                              <b className="float-end">ID: {vehicle.id}</b>
                            </span>{" "}
                            <br />
                            <b>{vehicle.vehicleName}</b>
                          </h5>
                        </div>
                        <div
                          onClick={() => handleVehicleClick(vehicle)}
                          className="d-grid"
                        >
                          <span>Total: {vehicle.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Modal
                isOpen={modal}
                toggle={toggleModal}
                centered={true}
                style={{ marginTop: "40px" }}
                size="xl"
              >
                <ModalHeader toggle={toggleModal}>
                  <h4>Slot Details:</h4>
                </ModalHeader>
                <ModalBody>
                  <form>
                    <h1>Book the slots</h1>

                    {/* Selected vehicle */}
                    <label htmlFor="">Selected Vehicle:</label>
                    <div className="m-2 p-1">
                      <input
                        type="text"
                        value={selectedVehicleName}
                        readOnly
                        style={{ width: "75%" }}
                      />
                    </div>

                    {/* Villa number */}
                    <label htmlFor="">Villa Number</label>
                    <div className="m-2 p-1">
                      <input
                        type="text"
                        id="villaNumber"
                        value={villaNumber}
                        onChange={(e) => setVillaNumber(e.target.value)}
                        placeholder="Villa Number"
                        style={{ width: "75%" }}
                      />
                    </div>

                    {/* Vehicle number */}
                    <label htmlFor="vehicle">Select Vehicle Number:</label>
                    <div className="m-2 p-1">
                      <select
                        id="vehicle"
                        value={selectedVehicleNumber}
                        onChange={(e) =>
                          setSelectedVehicleNumber(e.target.value)
                        }
                        style={{ width: "75%" }}
                      >
                        <option value="">Vehicle Number</option>
                        {vehicleNumbers.map((vehicleNum, index) => (
                          <option key={index} value={vehicleNum}>
                            {vehicleNum}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date */}
                    <br />
                    <br />
                    <label htmlFor="date">Select Date:</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={date}
                      onChange={handleDateChange}
                      required
                    />

                    <br />
                    <br />

                    {/* Time Slot */}
                    <label>Select Time Slot:</label>
                    <div className="time-slot-container">
                      {timeSlots.map((slot, index) => {
                        const isBooked = availableDates
                          .find((d) => d.date === date)
                          ?.slots.some((s) => s.time === slot && s.isBooked);
                        return (
                          <button
                            type="button"
                            value={slot}
                            key={index}
                            className={`time-slot-button ${
                              selectedTime === slot ? "selected" : ""
                            } ${isBooked ? "disabled" : ""}`}
                            onClick={() => handleTimeClick(slot, date)}
                            disabled={isBooked}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>

                    <button type="submit" onClick={handleSubmit}>
                      Submit
                    </button>

                    {/* Error message */}
                    {Object.keys(formErrors).length > 0 && (
                      <div style={{ color: "red", marginBottom: "10px" }}>
                        <p>Please fill all the fields above:</p>
                        {/* <ul>
                          {Object.values(formErrors).map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul> */}
                      </div>
                    )}
                  </form>
                </ModalBody>
              </Modal>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Dashboard;
