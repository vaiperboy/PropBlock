import React, { useEffect, useState } from 'react';
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Input } from "@web3uikit/core";
import { message } from 'antd';

const MyProfile = () => {
	const {
		Moralis,
		authenticated,
		auth,
		authenticate,
		isAuthenticated,
		isAuthenticating,
		isUnauthenticated,
		user,
		account,
		isloggedOut,
		login,
		logout,
		oralis,
		isInitialized,
		...rest
	} = useMoralis();

	const shortenAddress = (text, maxWords) => {
		if (maxWords < text.length && maxWords >= 18) {
			text = text.substring(0, 12) + " ... " + text.substring(text.length - 3);
		}
		return text;
	}
	const [emailAddress, setEmailAddress] = useState("");
	const [fullName, setFullName] = useState("");
	const [description, setDescription] = useState("");

	const { fetch } = useMoralisQuery(
		"usersSignedUp",
		(query) => query.equalTo("address", user.get("ethAddress").toLowerCase()),
		[],
		{ autoFetch: false }
	)

	useEffect(() => {
		async function loadData() {
			try {
				const result = await fetch();
				if (result.length == 1) {
					result = result[0];
					message.info(result.get("email"));
				}
			} catch (error) {
				message.error(error);
			}
			
		}
		loadData();
	})

	return (
		<div className='rightsidebar_container'>
			<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<div>
					<p className='rightsidebar_title'>My Profile</p>
				</div>
			</div>
			<div className='rightsidebar_content' style={{ width: '100%', display: 'flex', marginTop: 30, height: 'auto' }}>
				<div className="profile_banner">
					<div className="profile_bottom">
						<div className="profile_picture" />
						<div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', alignItems: 'center' }}>
							<p className='profile_address'>Address - [{shortenAddress(user.get("ethAddress"), 18)}]</p>
							<div style={{ display: 'flex', gap: '15px' }}>
								<button className='profile_button' style={{ userSelect: 'none', height: 'fit-content' }}>
									Edit Profile
								</button>
							</div>
						</div>
					</div>
				</div>
				<div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '30px', borderRadius: '8px', padding: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
					<div>
						<p>Name</p>
						<Input
							className="profile_form_input"
							type="text"
							placeholder="asd"
						/>
					</div>
					<div>
						<p>Email</p>
						<Input
							className="profile_form_input"
							type="text"
							style={{ width: "550px" }}
						/>
					</div>
					<div>
						<p>Description</p>
						<textarea className="profile_form_textarea" type="text" value="None" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyProfile;
