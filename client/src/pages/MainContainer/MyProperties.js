import React, { useState } from 'react';
import stats from '../../assets/etienne-beauregard-riverin.png';
import "../../styling/MainContainer/CreateProperty.scss";
import {
	Input,
	Stepper,
	Upload,
	Select,
} from "@web3uikit/core";
import blueTick from "./assets/blue_tick.png"

const MyProperties = () => {

	//set this to false to display the current properties
	const [addPropertyView, setAddPropertyView] = useState(true);


	const [address, setAddress] = useState("");
	const [name, setName] = useState("");
	const [deedyr, setDeedyr] = useState({});
	const [type, setType] = useState({});
	const [deedno, setDeedno] = useState("");
	const [email, setEmail] = useState("");
	const [propertyid, setPropertyId] = useState("");
	const [datesub, setDateSubmitted] = useState("");
	const [street, setStreet] = useState("");
	const [area, setArea] = useState("");
	const [apartno, setApartmentNo] = useState("");
	const [price, setPrice] = useState("");
	const [bednumber, setBedNumber] = useState(0);
	const [bathnumber, setBathNumber] = useState(0);
	const [occupNum, setOccupNumber] = useState(0);
	const [isfreeparking, setIsFreeParking] = useState(false);
	const [hasPool, setHasPool] = useState(false);
	const [hasKitchen, setHasKitchen] = useState(false);
	const [hasCoffee, setHasCoffee] = useState(false);
	const [hasWholeAccess, setHasWholeAccess] = useState(false);
	const [hasSecurity, setHasSecurity] = useState(false);
	const [hasTV, setHasTV] = useState(false);
	const [isfreewifi, setIsFreeWifi] = useState(false);
	const [hasRestaurant, setHasRestaurant] = useState(false);

	const clearState = () => {
		setAddress("");
		setName("");
		setDeedno("");
		setDeedyr("");
		setType("");
	};


	if (!addPropertyView) {
		return (
			<div className='rightsidebar_container'>
				<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div>
						<p className='rightsidebar_title'>My Properties</p>
					</div>
				</div>
				<div className='rightsidebar_content' style={{ width: '100%', display: 'flex', marginTop: 30, height: 'auto' }}>
					<div style={{ height: '60px', width: '100%', display: 'flex', gap: '30px', borderRadius: '8px', padding: '16px', flexWrap: 'wrap' }}>
						<div style={{ width: '350px', height: 'fit-content', display: 'flex', flexDirection: 'column', boxShadow: '0px 0px 4px 1px rgba(0, 0, 0, 0.33)' }}>
							<div>
								<img src={stats} style={{ width: '100%' }} />
							</div>
							<div style={{ padding: 15 }}>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', maxHeight: '25px' }}>
									<p className="card_title">Villas, Jumeriah</p>
									<p className="card_amount_text" style={{ color: '#278F3E', fontWeight: 600 }}>$ 1,500,000	</p>
								</div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', maxHeight: '25px' }}>
									<p className="card_info" style={{ display: 'flex', alignItems: 'center' }}>3BKH <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(85, 85, 85, 0.47)', margin: '0px 5px' }} /> Lorem Ipsum</p>
								</div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', maxHeight: '25px' }}>
									<p className="card_amount_sub_text" style={{ marginTop: 2 }}>Property ID - 1</p>
								</div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '20px', marginTop: 7 }}>
									<div style={{ display: 'flex', gap: '20px' }}>
										<span className="card_info" style={{ marginTop: 2, fontWeight: 500, color: '#555555', alignItems: 'center', display: 'flex', gap: '7px' }}>
											<svg width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M24.5455 2.46847H8.45455C6.7977 2.46847 5.45455 3.81161 5.45455 5.46847V9.74447C5.45455 10.4976 4.84402 11.1081 4.09091 11.1081C3.33779 11.1081 2.72727 10.4976 2.72727 9.74447V1.36364C2.72727 0.610523 2.11675 0 1.36364 0C0.610521 0 0 0.610521 0 1.36364V17.1499C0 17.903 0.610521 18.5135 1.36364 18.5135C2.11675 18.5135 2.72727 17.903 2.72727 17.1499V16.6622C2.72727 15.6397 3.55615 14.8108 4.57862 14.8108H25.4214C26.4438 14.8108 27.2727 15.6397 27.2727 16.6622V17.1499C27.2727 17.903 27.8832 18.5135 28.6364 18.5135C29.3895 18.5135 30 17.903 30 17.1499V7.40541C30 6.09605 29.4253 4.84032 28.4024 3.91446C27.3795 2.98861 25.9921 2.46847 24.5455 2.46847Z" fill="#3DAEEE" />
											</svg>
											3 Beds
										</span>
										<span className="card_info" style={{ marginTop: 2, fontWeight: 500, color: '#555555', alignItems: 'center', display: 'flex', gap: '7px' }}>
											<svg width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M24.5455 2.46847H8.45455C6.7977 2.46847 5.45455 3.81161 5.45455 5.46847V9.74447C5.45455 10.4976 4.84402 11.1081 4.09091 11.1081C3.33779 11.1081 2.72727 10.4976 2.72727 9.74447V1.36364C2.72727 0.610523 2.11675 0 1.36364 0C0.610521 0 0 0.610521 0 1.36364V17.1499C0 17.903 0.610521 18.5135 1.36364 18.5135C2.11675 18.5135 2.72727 17.903 2.72727 17.1499V16.6622C2.72727 15.6397 3.55615 14.8108 4.57862 14.8108H25.4214C26.4438 14.8108 27.2727 15.6397 27.2727 16.6622V17.1499C27.2727 17.903 27.8832 18.5135 28.6364 18.5135C29.3895 18.5135 30 17.903 30 17.1499V7.40541C30 6.09605 29.4253 4.84032 28.4024 3.91446C27.3795 2.98861 25.9921 2.46847 24.5455 2.46847Z" fill="#3DAEEE" />
											</svg>
											4 Baths
										</span>
									</div>
								</div>
							</div>
						</div>
						<div style={{ width: '350px', height: 'fit-content', display: 'flex', flexDirection: 'column', boxShadow: '0px 0px 4px 1px rgba(0, 0, 0, 0.33)' }}>
							<div>
								<img src={stats} style={{ width: '100%' }} />
							</div>
							<div style={{ padding: 15 }}>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', maxHeight: '25px' }}>
									<p className="card_title">Villas, Jumeriah</p>
									<p className="card_amount_text" style={{ color: '#278F3E', fontWeight: 600 }}>$ 1,500,000	</p>
								</div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', maxHeight: '25px' }}>
									<p className="card_info" style={{ display: 'flex', alignItems: 'center' }}>3BKH <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(85, 85, 85, 0.47)', margin: '0px 5px' }} /> Lorem Ipsum</p>
								</div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', maxHeight: '25px' }}>
									<p className="card_amount_sub_text" style={{ marginTop: 2 }}>Property ID - 1</p>
								</div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '20px', marginTop: 7 }}>
									<div style={{ display: 'flex', gap: '20px' }}>
										<span className="card_info" style={{ marginTop: 2, fontWeight: 500, color: '#555555', alignItems: 'center', display: 'flex', gap: '7px' }}>
											<svg width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M24.5455 2.46847H8.45455C6.7977 2.46847 5.45455 3.81161 5.45455 5.46847V9.74447C5.45455 10.4976 4.84402 11.1081 4.09091 11.1081C3.33779 11.1081 2.72727 10.4976 2.72727 9.74447V1.36364C2.72727 0.610523 2.11675 0 1.36364 0C0.610521 0 0 0.610521 0 1.36364V17.1499C0 17.903 0.610521 18.5135 1.36364 18.5135C2.11675 18.5135 2.72727 17.903 2.72727 17.1499V16.6622C2.72727 15.6397 3.55615 14.8108 4.57862 14.8108H25.4214C26.4438 14.8108 27.2727 15.6397 27.2727 16.6622V17.1499C27.2727 17.903 27.8832 18.5135 28.6364 18.5135C29.3895 18.5135 30 17.903 30 17.1499V7.40541C30 6.09605 29.4253 4.84032 28.4024 3.91446C27.3795 2.98861 25.9921 2.46847 24.5455 2.46847Z" fill="#3DAEEE" />
											</svg>
											3 Beds
										</span>
										<span className="card_info" style={{ marginTop: 2, fontWeight: 500, color: '#555555', alignItems: 'center', display: 'flex', gap: '7px' }}>
											<svg width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M24.5455 2.46847H8.45455C6.7977 2.46847 5.45455 3.81161 5.45455 5.46847V9.74447C5.45455 10.4976 4.84402 11.1081 4.09091 11.1081C3.33779 11.1081 2.72727 10.4976 2.72727 9.74447V1.36364C2.72727 0.610523 2.11675 0 1.36364 0C0.610521 0 0 0.610521 0 1.36364V17.1499C0 17.903 0.610521 18.5135 1.36364 18.5135C2.11675 18.5135 2.72727 17.903 2.72727 17.1499V16.6622C2.72727 15.6397 3.55615 14.8108 4.57862 14.8108H25.4214C26.4438 14.8108 27.2727 15.6397 27.2727 16.6622V17.1499C27.2727 17.903 27.8832 18.5135 28.6364 18.5135C29.3895 18.5135 30 17.903 30 17.1499V7.40541C30 6.09605 29.4253 4.84032 28.4024 3.91446C27.3795 2.98861 25.9921 2.46847 24.5455 2.46847Z" fill="#3DAEEE" />
											</svg>
											4 Baths
										</span>
									</div>
								</div>
							</div>
						</div>
						<div>
							<svg className="add-property-sign" width="77" height="77" viewBox="0 0 77 77" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="38.5" cy="38.5" r="38" fill="white" stroke="#3DAEEE" />
								<path d="M50.1667 39.6667H40.6667V49.1667H37.5V39.6667H28V36.5H37.5V27H40.6667V36.5H50.1667V39.6667Z" fill="#3DAEEE" />
							</svg>
						</div>
					</div>
				</div>
			</div>
		);
	}
	else {
		return (
			<div className='rightsidebar_container'>
				<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div>
						<p className='rightsidebar_title'>My Profile</p>
					</div>
				</div>
				<div className='rightsidebar_content' style={{ width: '100%', display: 'flex', marginTop: 20, height: 'auto' }}>
					<div className="create-property">
						<div className="container">
							<div className="containerchild">
								<Stepper
									style={{
										position: "relative",
									}}
									onComplete={() => console.log("TTEST")}
									step={1}
									hasNavButtons={false}
									stepData={[
										{
											content: (
												<div className="fullform">
													<div className="row">
														<div className="col-25">
															<label for="InputAddress">Owner's Address</label>
														</div>
														<div className="col-75">
															<Input
																type="text"
																id="InputAddress"
																name="address"
																placeholder="..."
																value={address}
																onChange={(e) => {
																	setAddress(e.target.value);
																}}
																validation={{
																	readOnly: true,
																}}
																disabled="true"
																style={{
																	backgroundColor: "rgb(225, 225, 225)",
																}}
															/>
														</div>
													</div>

													<div className="row">
														<div className="col-25">
															<label for="InputName">Owner's Name</label>
														</div>
														<div className="col-75">
															<Input
																type="text"
																id="InputName"
																name="name"
																placeholder="..."
																value={name}
																onChange={(e) => {
																	setName(e.target.value);
																}}
																validation={{
																	readOnly: true,
																}}
																disabled="true"
																style={{
																	backgroundColor: "rgb(225, 225, 225)",
																}}
															/>
														</div>
													</div>

													<div className="row">
														<div className="col-25">
															<label for="InputDeedno">Title Deed No.</label>
														</div>
														<div className="col-75">
															<Input
																type="text"
																id="InputDeedno"
																name="titleno"
																placeholder="#789456"
																value={deedno}
																onChange={(e) => {
																	setDeedno(e.target.value);
																}}
																validation={{
																	required: true,
																	regExp: "[0-9]+([,.][0-9]+)?",
																}}
															/>
														</div>
													</div>

													<div className="row">
														<div className="col-25">
															<label for="type">Title Deed Year</label>
														</div>
														<div className="col-75">
															<Input
																type="month"
																id="titleyr"
																name="titleyr"
																placeholder="..."
																value={deedyr}
																onChange={(e) => {
																	setDeedyr(e.target.value);
																}}
																validation={{
																	required: true,
																}}
															/>
														</div>
													</div>

													<div className="row">
														<div className="col-25">
															<label for="property-type">Property Type</label>
														</div>
														<div className="col-75">
															<Select
																id="property-type"
																name="property-type"
																placeholder="..."
																onChange={(e) => {
																	setType(e.target.value);
																}}
																validation={{
																	required: true,
																}}
																options={[
																	{
																		id: "villa",
																		label: "Villa",
																		value: type,
																	},
																	{
																		id: "townhouse",
																		label: "Townhouse",
																		value: type,
																	},
																	{
																		id: "apartment",
																		label: "Apartment",
																		value: type,
																	},
																	{
																		id: "penthouse",
																		label: "Penthouse",
																		value: type,
																	},
																	{
																		id: "duplex",
																		label: "Duplex",
																		value: type,
																	},
																]}
															/>
														</div>
													</div>

													<button
														id="next"
														className="nextButton btn-submit "
														text="Next"
													>
														Next
													</button>
													<button id="prev" className="prevButton btn-submit reset">
														Previous
													</button>
												</div>
											),
											title: "",
										},
										{
											content: (
												<div className="fullform">
													<div className="row">
														<div className="col-25">
															<label for="prop-id">Property ID</label>
														</div>
														<div className="col-75">
															<Input
																type="text"
																id="prop-id"
																name="propertyid"
																placeholder="..."
																value={propertyid}
																onChange={(e) => setPropertyId(e.target.value)}
																disabled
																style={{ backgroundColor: "rgb(225, 225, 225)" }}
															/>
														</div>
													</div>
													<div className="row">
														<div className="col-25">
															<label for="InputName">Owner's Email</label>
														</div>
														<div className="col-75">
															<Input
																type="text"
																id="InputName"
																name="name"
																placeholder="..."
																value={email}
																onChange={(e) => setEmail(e.target.value)}
																disabled
																style={{ backgroundColor: "rgb(225, 225, 225)" }}
															/>
														</div>
													</div>
													<div className="row">
														<div className="col-25">
															<label for="InputDeedno">Owner's Address</label>
														</div>
														<div className="col-75">
															<Input
																type="text"
																id="InputDeedno"
																name="titleno"
																placeholder="..."
																value={address}
																onChange={(e) => setAddress(e.target.value)}
																disabled
																style={{ backgroundColor: "rgb(225, 225, 225)" }}
															/>
														</div>
													</div>
													<div className="row">
														<div className="col-25">
															<label for="datesub">Date Submitted</label>
														</div>
														<div className="col-75">
															<Input
																type="date"
																id="datesub"
																name="datesub"
																placeholder="..."
																value={datesub}
																onChange={(e) => setDateSubmitted(e.target.value)}
																validation={{
																	required: true,
																}}
															/>
														</div>
													</div>
													<div className="row">
														<div className="col-25">
															<label for="street">Street Name</label>
														</div>
														<div className="col-75">
															<Input
																type="text"
																id="street"
																name="street"
																placeholder="Sheikh Mohammed Bin Zayed Str"
																value={street}
																onChange={(e) => setStreet(e.target.value)}
																validation={{
																	required: true,
																}}
															/>
														</div>
													</div>
													<div className="row">
														<div className="col-25">
															<label for="type">Area</label>
														</div>
														<div className="col-75">
															<Input
																type="text"
																id="area"
																name="area"
																placeholder="Al Barari"
																value={area}
																onChange={(e) => setArea(e.target.value)}
																validation={{
																	required: true,
																}}
															/>
														</div>
													</div>
													<div className="row">
														<div className="col-25">
															<label for="type">Apartment No.</label>
														</div>
														<div className="col-75">
															<Input
																type="text"
																id="apartno"
																name="apartno"
																placeholder="123"
																value={apartno}
																onChange={(e) => setApartmentNo(e.target.value)}
																validation={{
																	required: true,
																	regExp: "[0-9]+([,.][0-9]+)?",
																}}
															/>
														</div>
													</div>
													<div className="row">
														<div className="col-25">
															<label for="type">Listing Price</label>
														</div>
														<div className="col-75">
															<Input
																type="text"
																id="price"
																name="price"
																placeholder="999 AED"
																value={price}
																onChange={(e) => setPrice(e.target.value)}
																validation={{
																	regExp: "[0-9]+([,.][0-9]+)?",
																	required: true,
																}}
															/>
														</div>
													</div>

													<br />
													<div className="row">
														<div className="col-75">
															<button
																onClick={clearState}
																className="prevButton btn-submit reset"
																id="prev"
															>
																{" "}
																Back
															</button>
														</div>
														<div className="col-25">
															<button className="nextButton btn-submit" id="next">
																{" "}
																Next
															</button>
														</div>
													</div>
												</div>
											),
										},
										{
											content: (
												<div className="fullform ">
													<p style={{ fontWeight: "bold" }}>
														Enter Additional Property Details
													</p>
													<div className="row">
														<div className="col-25">
															<label for="NumberofBeds">No. of Beds</label>
														</div>
														<div className="col-10 ">
															<Input
																type="number"
																id="NumberofBeds"
																name="NumberofBeds"
																placeholder="0"
																value={bednumber}
																onChange={(e) => {
																	setBedNumber(e.target.value);
																}}
																validation={{
																	required: true,
																}}
															></Input>
														</div>
														<div className="col-25">
															<label for="NumberofBathrooms">No. of Bathrooms</label>
														</div>
														<div className="col-10">
															<Input
																type="number"
																id="NumberofBathrooms"
																name="NumberofBathrooms"
																placeholder="0"
																value={bathnumber}
																onChange={(e) => {
																	setBathNumber(e.target.value);
																}}
																validation={{
																	required: true,
																}}
															></Input>
														</div>
													</div>
													<div className="row">
														<div className="col-25">
															<label for="occupancynum">Occupancy No.</label>
														</div>
														<div className="col-10">
															<Input
																type="number"
																id="occupancynum"
																name="occupancynum"
																placeholder="0"
																value={occupNum}
																onChange={(e) => {
																	setOccupNumber(e.target.value);
																}}
																validation={{
																	required: true,
																}}
															></Input>
														</div>
													</div>
													<div className="row">
														<p style={{ fontWeight: "bold" }}>
															Check The Facilities that Apply
														</p>
														<div className="col-5">
															{" "}
															<img
																alt=""
																className="facilityIcon"
																src={require("./assets/pic1.png")}
															></img>
														</div>
														<div className="col-10">
															<label for="freeparking">Free Parking</label>
														</div>
														<div className="col-10">
															<Input
																type="checkbox"
																id="freeparking"
																name="freeparking"
																value={isfreeparking}
																onChange={(e) => {
																	setIsFreeParking(e.target.value);
																}}
																style={{
																	outline: "none",
																}}
															/>
														</div>


														<div className="col-5">
															{" "}
															<img
																alt=""
																className="facilityIcon"
																src={require("./assets/Picture2.png")}
															></img>
														</div>



														<div className="col-10">

															<label for="freewifi">Free Wifi</label>
														</div>
														<div className="col-10">
															<Input
																type="checkbox"
																id="freewifi"
																name="freewifi"
																value={isfreewifi}
																onChange={(e) => {
																	setIsFreeWifi(e.target.value);
																}}
																style={{
																	outline: "none",
																}}
															/>
														</div>


														<div className="col-5">
															{" "}
															<img
																alt=""
																className="facilityIcon"
																src={require("./assets/Picture3.png")}
															></img>
														</div>

														<div className="col-10">
															{" "}

															<label for="restaurant">Restaurant</label>
														</div>
														<div className="col-10">
															<Input
																type="checkbox"
																id="restaurant"
																name="restaurant"
																value={hasRestaurant}
																onChange={(e) => {
																	setHasRestaurant(e.target.value);
																}}
																style={{
																	outline: "none",
																}}
															/>
														</div>
													</div>
													<div className="row">


														<div className="col-5">
															{" "}
															<img
																alt=""
																className="facilityIcon"
																src={require("./assets/Picture5.png")}
															></img>
														</div>
														<div className="col-10">
															{" "}

															<label for="kitchen">Kitchen</label>
														</div>
														<div className="col-10">
															<Input
																type="checkbox"
																id="kitchen"
																name="kitchen"
																value={hasKitchen}
																onChange={(e) => {
																	setHasKitchen(e.target.value);
																}}
																style={{
																	outline: "none",
																}}
															/>
														</div>


														<div className="col-5">
															{" "}
															<img
																alt=""
																className="facilityIcon"
																src={require("./assets/Picture6.png")}
															></img>
														</div>
														<div className="col-10">
															{" "}

															<label for="coffee">Coffee Maker</label>
														</div>
														<div className="col-10">
															<Input
																type="checkbox"
																id="coffee"
																name="coffee"
																value={hasCoffee}
																onChange={(e) => {
																	setHasCoffee(e.target.value);
																}}
																style={{
																	outline: "none",
																}}
															/>
														</div>


														<div className="col-5">
															{" "}
															<img
																alt=""
																className="facilityIcon"
																src={require("./assets/Picture7.png")}
															></img>
														</div>
														<div className="col-10">
															{" "}

															<label for="access">24 Hour Access</label>
														</div>
														<div className="col-10">
															<Input
																type="checkbox"
																id="access"
																name="access"
																value={hasWholeAccess}
																onChange={(e) => {
																	setHasWholeAccess(e.target.value);
																}}
																style={{
																	outline: "none",
																}}
															/>
														</div>
													</div>
													<div className="row">


														<div className="col-5">
															{" "}
															<img
																alt=""
																className="facilityIcon"
																src={require("./assets/Picture8.png")}
															></img>
														</div>
														<div className="col-10">
															{" "}

															<label for="security">Security</label>
														</div>
														<div className="col-10">
															<Input
																type="checkbox"
																id="security"
																name="security"
																value={hasSecurity}
																onChange={(e) => {
																	setHasSecurity(e.target.value);
																}}
																style={{
																	outline: "none",
																}}
															/>
														</div>


														<div className="col-5">
															{" "}
															<img
																alt=""
																className="facilityIcon"
																src={require("./assets/Picture4.png")}
															></img>
														</div>
														<div className="col-10">
															{" "}

															<label for="pool">Swimming Pool</label>
														</div>
														<div className="col-10">
															<Input
																type="checkbox"
																id="pool"
																name="pool"
																value={hasPool}
																onChange={(e) => {
																	setHasPool(e.target.value);
																}}
																style={{
																	outline: "none",
																}}
															/>
														</div>


														<div className="col-5">
															{" "}
															<img
																alt=""
																className="facilityIcon"
																src={require("./assets/Picture9.png")}
															></img>
														</div>
														{" "}
														<div className="col-10">


															<label for="tv">TV</label>
														</div>
														<div className="col-10">
															<Input
																type="checkbox"
																id="tv"
																name="tv"
																value={hasTV}
																onChange={(e) => {
																	setHasTV(e.target.value);
																}}
																style={{
																	outline: "none",
																}}
															/>
														</div>
													</div>
													<div className="row">
														<div className="col-75">
															<button className="prevButton btn-submit reset" id="prev">
																{" "}
																Previous
															</button>
														</div>
														<div className="col-25">
															<button id="next" className="nextButton btn-submit">
																{" "}
																Next
															</button>
														</div>
													</div>
												</div>
											),
										},
										{
											content: (
												<div className="fullform">
													<p>
														Upload the required title deed and images for your property.
														Make sure that the images are high quality for better
														viewing.<br></br>
														You can upload upto 8 images for your property.
													</p>
													<br></br>
													<p className="text upload">Upload Title Deed</p>
													<Upload />
													<br />
													<p className="text upload">Upload Images</p>
													<Upload />

													<div className="row">
														<div className="col-75">
															<button className="prevButton btn-submit reset" id="prev">
																{" "}
																Previous
															</button>
														</div>
														<div className="col-25">
															<button id="next" className="nextButton btn-submit">
																{" "}
																Next
															</button>
														</div>
													</div>
												</div>
											),
										},
										{
											content: (
												<div className="fullform">
													<p className="text done">
														Your property was created Successfully!
													</p>
													<br />
													<div className="checkimage">
														<img src={blueTick} alt=""></img>
													</div>
													<br></br>
													<div id="dashboardend">
														<button
															className="nextButton btn-submit end"
															id="next"
															style={{
																left: "8em",
																position: "absolute",
															}}
														>
															{" "}
															Finish
														</button>
													</div>
												</div>
											),
										},
									]}
								/>
							</div>
						</div>
					</div>
				</div>

			</div>


		);
	}
}


export default MyProperties;
