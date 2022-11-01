import React from 'react';
import noPayment from './noPayment.png';

class MyProfile extends React.Component{

	state={

    }

	componentDidMount=()=>{

	}

	componentWillUnmount=()=>{

	}

	render(){

		return(
				<div className='rightsidebar_container'>
					<div style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
						<div>
							<p className='rightsidebar_title'>My Profile</p>
						</div>
					</div>
					<div className='rightsidebar_content' style={{width:'100%', display:'flex', marginTop: 30, height:'auto'}}>
						<div className="profile_banner">
							<div className="profile_bottom">
								<div className="profile_picture"/>
								<div style={{display:'flex', justifyContent:'space-between', width:'80%', alignItems:'center'}}>
									<p className='profile_address'>Address - [0xd1D3 ... 5f9]</p>
									<div style={{display: 'flex', gap: '15px'}}>
										<button className='profile_button' style={{userSelect:'none', height:'fit-content'}}>
											Edit Profile
										</button>
									</div>
								</div>
							</div>
						</div>
						<div style={{width:'100%', display:'flex', flexDirection:'column',gap:'30px', borderRadius:'8px', padding:'16px', flexWrap:'wrap', justifyContent:'center'}}>
							<div>
								<p>Name</p>
								<input className="profile_form_input" type="text" value="You have not made any payments yet."/>
							</div>
							<div>
								<p>Email</p>
								<input className="profile_form_input" type="text" value="something@something.com"/>
							</div>
							<div>
								<p>Description</p>
								<textarea className="profile_form_textarea" type="text" value="None"/>
							</div>
						</div>
					</div>
				</div>
		);
	}
};

export default MyProfile;
