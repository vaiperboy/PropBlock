import React from 'react';
import "../../styling/Properties/SearchAvailability.scss";

class SearchAvailability extends React.Component {
    render() {
        return (
            <div className='SearchAvailability'>
                <div className='search_availability_content'>
                    <div className="search_input_container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ padding: 25 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <p style={{ fontSize: 20 }}>Location </p>
                                <svg width="23" height="27" viewBox="0 0 23 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 11.125C22 19 11.5 25.75 11.5 25.75C11.5 25.75 1 19 1 11.125C1 8.43968 2.10625 5.86435 4.07538 3.96554C6.04451 2.06674 8.71523 1 11.5 1C14.2848 1 16.9555 2.06674 18.9246 3.96554C20.8938 5.86435 22 8.43968 22 11.125Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.5 14.5C13.433 14.5 15 12.989 15 11.125C15 9.26104 13.433 7.75 11.5 7.75C9.567 7.75 8 9.26104 8 11.125C8 12.989 9.567 14.5 11.5 14.5Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <input style={{ width: '240px', color: 'rgba(51, 51, 51, 0.58)', border: 'unset' }} type="text" placeholder="Enter a city, community, ... " />
                            <div style={{ border: '1px solid #444444', marginTop: 6 }} />
                        </div>
                        <div style={{ padding: '0px 25px', margin: '25px 0px', borderLeft: '1px solid #444444' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <p style={{ fontSize: 20 }}>Property Type</p>
                                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 8.54444L10.7 1L20.4 8.54444V20.4C20.4 20.9717 20.1729 21.52 19.7687 21.9242C19.3644 22.3285 18.8161 22.5556 18.2444 22.5556H3.15556C2.58387 22.5556 2.03559 22.3285 1.63135 21.9242C1.2271 21.52 1 20.9717 1 20.4V8.54444Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7.46664 22.5556V11.7778H13.9333V22.5556" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <select style={{ width: '240px', color: 'rgba(51, 51, 51, 0.58)', border: 'unset' }} type="text" placeholder="Select property type">
                                <option>Select property type</option>
                            </select>
                            <div style={{ border: '1px solid #444444', marginTop: 6 }} />
                        </div>
                        <div style={{ padding: '0px 25px', margin: '25px 0px', borderLeft: '1px solid #444444' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <p style={{ fontSize: 20 }}>Beds</p>
                                <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.5 8.54167V3.41667C24.5 2.51051 24.1313 1.64147 23.4749 1.00072C22.8185 0.359969 21.9283 0 21 0H7C6.07174 0 5.1815 0.359969 4.52513 1.00072C3.86875 1.64147 3.5 2.51051 3.5 3.41667V8.54167C2.57174 8.54167 1.6815 8.90164 1.02513 9.54239C0.368749 10.1831 0 11.0522 0 11.9583V20.5H2.3275L3.5 23.9167H5.25L6.4225 20.5H21.5775L22.75 23.9167H24.5L25.6725 20.5H28V11.9583C28 11.0522 27.6313 10.1831 26.9749 9.54239C26.3185 8.90164 25.4283 8.54167 24.5 8.54167ZM12.25 8.54167H7V3.41667H12.25M21 8.54167H15.75V3.41667H21V8.54167Z" fill="#333333" />
                                </svg>
                            </div>
                            <input style={{ width: '100px', color: 'rgba(51, 51, 51, 0.58)', border: 'unset' }} type="text" placeholder="No. of beds" />
                            <div style={{ border: '1px solid #444444', marginTop: 6 }} />
                        </div>
                        <div style={{ padding: '0px 25px', margin: '25px 0px', borderLeft: '1px solid #444444' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <p style={{ fontSize: 20 }}>Price</p>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41V13.41Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7 7H7.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <input style={{ width: '80px', color: 'rgba(51, 51, 51, 0.58)', border: 'unset' }} type="text" placeholder="Enter price " />
                            <div style={{ border: '1px solid #444444', marginTop: 6 }} />
                        </div>
                        <div style={{ padding: '0px 25px', margin: '25px 0px', borderLeft: '1px solid #444444', display: 'flex', alignItems: 'center' }}>
                            <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_3_51)">
                                    <path d="M16.9583 29.9285C23.7698 29.9285 29.2917 24.2866 29.2917 17.327C29.2917 10.3674 23.7698 4.72559 16.9583 4.72559C10.1468 4.72559 4.625 10.3674 4.625 17.327C4.625 24.2866 10.1468 29.9285 16.9583 29.9285Z" stroke="#3DAEEE" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M35.3913 36.1956L25.7391 26.5435" stroke="#3DAEEE" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3_51">
                                        <rect width="37" height="37.8043" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
};

export default SearchAvailability;
