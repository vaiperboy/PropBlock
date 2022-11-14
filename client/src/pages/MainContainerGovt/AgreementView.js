import React from 'react';
import stats from './stats.png';
import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

class AgreementView extends React.Component{

	state={
        inputDragEvent:{},
		file1:[],
		file2:[],
		file3:[],
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
							<p className='rightsidebar_title'>Purchase Agreement</p>
							<p className='agreement_view_subtitle' style={{marginBottom: 15}}>Agreement ID - #12</p>
							<div style={{display:'flex',alignItems:'center'}}>
								<p className='agreement_view_subtitle' style={{color: '#3DAEEE', marginBottom: 0}}>Buyer’s Documents<span style={{color: '#555555'}}>(0x6e8 ... D00f94)</span></p>
								<div style={{marginLeft:'10px', cursor: "pointer", borderRadius:'50%', height:'52px', width:'52px', border:'2px solid #3DAEEE', background: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB7WOft_Yed83SLXPSHpdGxI9Ms2HQVT9q1w&usqp=CAU")'}}/>
							</div>
						</div>
					</div>
					<div style={{display:"flex", flexDirection:'column', marginTop: 30, gap: 30}}>
						<div style={{marginTop: 20}}>
							<div style={{display:'flex', justifyContent:'space-between'}}>
								<div style={{display:'flex', alignItems:'center', gap: 20}}>
									<svg width="40" height="47" viewBox="0 0 40 47" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M28 0H12C9.8 0 8 1.7625 8 3.91667V35.25C8 37.4042 9.8 39.1667 12 39.1667H36C38.2 39.1667 40 37.4042 40 35.25V11.75L28 0ZM36 35.25H12V3.91667H26V13.7083H36V35.25ZM4 7.83333V43.0833H36V47H4C1.8 47 0 45.2375 0 43.0833V7.83333H4ZM16 19.5833V23.5H32V19.5833H16ZM16 27.4167V31.3333H26V27.4167H16Z" fill="#1877F2"/>
									</svg>
									<p className="document_title">NOC (No Objection Letter) Uploaded</p>
								</div>
								<div style={{display:'flex', gap: 10}}>
									<button className='accept_button' style={{userSelect:'none'}}>
										Accept
									</button>
									<button className='reject_button' style={{userSelect:'none'}}>
										Decline
									</button>
								</div>
							</div>
							<div style={{display:'flex',flexDirection:'column' ,gap: 10, marginTop: 20}}>
								<p className="document_title">Reason for rejection (if applicable)</p>
								<div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', gap:'20px'}}>
									<textarea className="profile_form_textarea" type="text" defaultValue="" style={{height:'58px',width:'100%'}}/>
								</div>
							</div>
							<div style={{borderTop: '1px solid rgba(102, 102, 102, 0.8)', marginTop: 8}}/>
						</div>
						<div style={{marginTop: 20}}>
							<div style={{display:'flex', justifyContent:'space-between'}}>
								<div style={{display:'flex', alignItems:'center', gap: 20}}>
									<svg width="40" height="47" viewBox="0 0 40 47" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M28 0H12C9.8 0 8 1.7625 8 3.91667V35.25C8 37.4042 9.8 39.1667 12 39.1667H36C38.2 39.1667 40 37.4042 40 35.25V11.75L28 0ZM36 35.25H12V3.91667H26V13.7083H36V35.25ZM4 7.83333V43.0833H36V47H4C1.8 47 0 45.2375 0 43.0833V7.83333H4ZM16 19.5833V23.5H32V19.5833H16ZM16 27.4167V31.3333H26V27.4167H16Z" fill="#1877F2"/>
									</svg>
									<p className="document_title">MOU Uploaded</p>
								</div>
								<div style={{display:'flex', gap: 10}}>
									<button className='accept_button' style={{userSelect:'none'}}>
										Accept
									</button>
									<button className='reject_button' style={{userSelect:'none'}}>
										Decline
									</button>
								</div>
							</div>
							<div style={{display:'flex',flexDirection:'column' ,gap: 10, marginTop: 20}}>
								<p className="document_title">Reason for rejection (if applicable)</p>
								<div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', gap:'20px'}}>
									<textarea className="profile_form_textarea" type="text" defaultValue="" style={{height:'58px',width:'100%'}}/>
								</div>
							</div>
						</div>
						<div style={{marginTop: 20}}>
							<div style={{display:'flex', justifyContent:'space-between'}}>
								<div style={{display:'flex', alignItems:'center', gap: 20}}>
									<svg width="40" height="47" viewBox="0 0 40 47" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M28 0H12C9.8 0 8 1.7625 8 3.91667V35.25C8 37.4042 9.8 39.1667 12 39.1667H36C38.2 39.1667 40 37.4042 40 35.25V11.75L28 0ZM36 35.25H12V3.91667H26V13.7083H36V35.25ZM4 7.83333V43.0833H36V47H4C1.8 47 0 45.2375 0 43.0833V7.83333H4ZM16 19.5833V23.5H32V19.5833H16ZM16 27.4167V31.3333H26V27.4167H16Z" fill="#1877F2"/>
									</svg>
									<p className="document_title">Other Relevant docs</p>
								</div>
								<div style={{display:'flex', gap: 10}}>
									<button className='accept_button' style={{userSelect:'none'}}>
										Accept
									</button>
									<button className='reject_button' style={{userSelect:'none'}}>
										Decline
									</button>
								</div>
							</div>
							<div style={{display:'flex',flexDirection:'column' ,gap: 10, marginTop: 20}}>
								<p className="document_title">Reason for rejection (if applicable)</p>
								<div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', gap:'20px'}}>
									<textarea className="profile_form_textarea" type="text" defaultValue="" style={{height:'58px',width:'100%'}}/>
								</div>
							</div>
						</div>
					</div>
					<div style={{borderTop:'3px solid rgba(231, 17, 17, 0.8)', marginTop: 10}}/>
					<div style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: 20}}>
						<div style={{display:'flex',alignItems:'center'}}>
							<p className='agreement_view_subtitle' style={{color: '#3DAEEE', marginBottom: 0}}>Seller’s Documents <span style={{color: '#555555'}}>(0x6e8 ... D00f94)</span></p>
							<div style={{marginLeft:'10px', cursor: "pointer", borderRadius:'50%', height:'52px', width:'52px', border:'2px solid #3DAEEE', background: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB7WOft_Yed83SLXPSHpdGxI9Ms2HQVT9q1w&usqp=CAU")'}}/>
						</div>
					</div>
					<div className='rightsidebar_content' style={{width:'100%', display:'flex', marginTop: 30, height:'auto'}}>
						<div style={{marginTop: 20}}>
							<div style={{display:'flex', justifyContent:'space-between'}}>
								<div style={{display:'flex', alignItems:'center', gap: 20}}>
									<svg width="40" height="47" viewBox="0 0 40 47" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M28 0H12C9.8 0 8 1.7625 8 3.91667V35.25C8 37.4042 9.8 39.1667 12 39.1667H36C38.2 39.1667 40 37.4042 40 35.25V11.75L28 0ZM36 35.25H12V3.91667H26V13.7083H36V35.25ZM4 7.83333V43.0833H36V47H4C1.8 47 0 45.2375 0 43.0833V7.83333H4ZM16 19.5833V23.5H32V19.5833H16ZM16 27.4167V31.3333H26V27.4167H16Z" fill="#1877F2"/>
									</svg>
									<p className="document_title">NOC (No Objection Letter) Uploaded</p>
								</div>
								<div style={{display:'flex', gap: 10}}>
									<button className='accept_button' style={{userSelect:'none'}}>
										Accept
									</button>
									<button className='reject_button' style={{userSelect:'none'}}>
										Decline
									</button>
								</div>
							</div>
							<div style={{display:'flex',flexDirection:'column' ,gap: 10, marginTop: 20}}>
								<p className="document_title">Reason for rejection (if applicable)</p>
								<div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', gap:'20px'}}>
									<textarea className="profile_form_textarea" type="text" defaultValue="" style={{height:'58px',width:'100%'}}/>
								</div>
							</div>
							<div style={{borderTop: '1px solid rgba(102, 102, 102, 0.8)', marginTop: 8}}/>
						</div>
						<div style={{marginTop: 20}}>
							<div style={{display:'flex', justifyContent:'space-between'}}>
								<div style={{display:'flex', alignItems:'center', gap: 20}}>
									<svg width="40" height="47" viewBox="0 0 40 47" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M28 0H12C9.8 0 8 1.7625 8 3.91667V35.25C8 37.4042 9.8 39.1667 12 39.1667H36C38.2 39.1667 40 37.4042 40 35.25V11.75L28 0ZM36 35.25H12V3.91667H26V13.7083H36V35.25ZM4 7.83333V43.0833H36V47H4C1.8 47 0 45.2375 0 43.0833V7.83333H4ZM16 19.5833V23.5H32V19.5833H16ZM16 27.4167V31.3333H26V27.4167H16Z" fill="#1877F2"/>
									</svg>
									<p className="document_title">MOU Uploaded</p>
								</div>
								<div style={{display:'flex', gap: 10}}>
									<button className='accept_button' style={{userSelect:'none'}}>
										Accept
									</button>
									<button className='reject_button' style={{userSelect:'none'}}>
										Decline
									</button>
								</div>
							</div>
							<div style={{display:'flex',flexDirection:'column' ,gap: 10, marginTop: 20}}>
								<p className="document_title">Reason for rejection (if applicable)</p>
								<div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', gap:'20px'}}>
									<textarea className="profile_form_textarea" type="text" defaultValue="" style={{height:'58px',width:'100%'}}/>
								</div>
							</div>
							<div style={{borderTop: '1px solid rgba(102, 102, 102, 0.8)', marginTop: 8}}/>
						</div>
						<div style={{marginTop: 20}}>
							<div style={{display:'flex', justifyContent:'space-between'}}>
								<div style={{display:'flex', alignItems:'center', gap: 20}}>
									<svg width="40" height="47" viewBox="0 0 40 47" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M28 0H12C9.8 0 8 1.7625 8 3.91667V35.25C8 37.4042 9.8 39.1667 12 39.1667H36C38.2 39.1667 40 37.4042 40 35.25V11.75L28 0ZM36 35.25H12V3.91667H26V13.7083H36V35.25ZM4 7.83333V43.0833H36V47H4C1.8 47 0 45.2375 0 43.0833V7.83333H4ZM16 19.5833V23.5H32V19.5833H16ZM16 27.4167V31.3333H26V27.4167H16Z" fill="#1877F2"/>
									</svg>
									<p className="document_title">Updated Title deed</p>
								</div>
								<div style={{display:'flex', gap: 10}}>
									<button className='accept_button' style={{userSelect:'none'}}>
										Accept
									</button>
									<button className='reject_button' style={{userSelect:'none'}}>
										Decline
									</button>
								</div>
							</div>
							<div style={{display:'flex',flexDirection:'column' ,gap: 10, marginTop: 20}}>
								<p className="document_title">Reason for rejection (if applicable)</p>
								<div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', gap:'20px'}}>
									<textarea className="profile_form_textarea" type="text" defaultValue="" style={{height:'58px',width:'100%'}}/>
								</div>
							</div>
							<div style={{borderTop: '1px solid rgba(102, 102, 102, 0.8)', marginTop: 8}}/>
						</div>
						<div style={{marginTop: 20}}>
							<div style={{display:'flex', justifyContent:'space-between'}}>
								<div style={{display:'flex', alignItems:'center', gap: 20}}>
									<svg width="40" height="47" viewBox="0 0 40 47" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M28 0H12C9.8 0 8 1.7625 8 3.91667V35.25C8 37.4042 9.8 39.1667 12 39.1667H36C38.2 39.1667 40 37.4042 40 35.25V11.75L28 0ZM36 35.25H12V3.91667H26V13.7083H36V35.25ZM4 7.83333V43.0833H36V47H4C1.8 47 0 45.2375 0 43.0833V7.83333H4ZM16 19.5833V23.5H32V19.5833H16ZM16 27.4167V31.3333H26V27.4167H16Z" fill="#1877F2"/>
									</svg>
									<p className="document_title">Other relevant docs </p>
								</div>
								<div style={{display:'flex', gap: 10}}>
									<button className='accept_button' style={{userSelect:'none'}}>
										Accept
									</button>
									<button className='reject_button' style={{userSelect:'none'}}>
										Decline
									</button>
								</div>
							</div>
							<div style={{display:'flex',flexDirection:'column' ,gap: 10, marginTop: 20}}>
								<p className="document_title">Reason for rejection (if applicable)</p>
								<div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', gap:'20px'}}>
									<textarea className="profile_form_textarea" type="text" defaultValue="" style={{height:'58px',width:'100%'}}/>
								</div>
							</div>
							<div style={{borderTop: '1px solid rgba(102, 102, 102, 0.8)', marginTop: 8}}/>
						</div>
					</div>
					<div style={{display:'flex', gap: 10, marginTop: 20, justifyContent:'flex-end'}}>
						<button className='apply_button' style={{userSelect:'none'}}>
							Apply Changes
						</button>
						<button className='revert_button' style={{userSelect:'none'}}>
							Revert
						</button>
					</div>
				</div>
		);
	}
};

export default AgreementView;
