import React from 'react';
import stats from '../../assets/etienne-beauregard-riverin.png';

class MyProperties extends React.Component{

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
							<p className='rightsidebar_title'>My Properties</p>
						</div>
					</div>
					<div className='rightsidebar_content' style={{width:'100%', display:'flex', marginTop: 30, height:'auto'}}>
						<div style={{height:'60px',width:'100%', display:'flex', gap:'30px', borderRadius:'8px', padding:'16px', flexWrap:'wrap'}}>
						<div style={{width: '350px', height:'fit-content', display:'flex', flexDirection:'column', boxShadow:'0px 0px 4px 1px rgba(0, 0, 0, 0.33)'}}>
								<div>
									<img src={stats} style={{width:'100%'}}/>
								</div>
								<div style={{padding: 15}}>
									<div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', maxHeight: '25px'}}>
										<p className="card_title">Villas, Jumeriah</p>
										<p className="card_amount_text" style={{color:'#278F3E',fontWeight:600}}>$ 1,500,000	</p>
									</div>
									<div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', maxHeight: '25px'}}>
										<p className="card_info" style={{display:'flex', alignItems:'center'}}>3BKH <div style={{width:'7px',height:'7px', borderRadius:'50%', background: 'rgba(85, 85, 85, 0.47)', margin: '0px 5px'}}/> Lorem Ipsum</p>
									</div>
									<div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', maxHeight: '25px'}}>
										<p className="card_amount_sub_text" style={{marginTop: 2}}>Property ID - 1</p>
									</div>
									<div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap: '20px', marginTop: 7}}>
										<div style={{display:'flex', gap: '20px'}}>
											<span className="card_info" style={{marginTop: 2, fontWeight: 500, color: '#555555', alignItems:'center',display:'flex', gap:'7px'}}>
												<svg width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M24.5455 2.46847H8.45455C6.7977 2.46847 5.45455 3.81161 5.45455 5.46847V9.74447C5.45455 10.4976 4.84402 11.1081 4.09091 11.1081C3.33779 11.1081 2.72727 10.4976 2.72727 9.74447V1.36364C2.72727 0.610523 2.11675 0 1.36364 0C0.610521 0 0 0.610521 0 1.36364V17.1499C0 17.903 0.610521 18.5135 1.36364 18.5135C2.11675 18.5135 2.72727 17.903 2.72727 17.1499V16.6622C2.72727 15.6397 3.55615 14.8108 4.57862 14.8108H25.4214C26.4438 14.8108 27.2727 15.6397 27.2727 16.6622V17.1499C27.2727 17.903 27.8832 18.5135 28.6364 18.5135C29.3895 18.5135 30 17.903 30 17.1499V7.40541C30 6.09605 29.4253 4.84032 28.4024 3.91446C27.3795 2.98861 25.9921 2.46847 24.5455 2.46847Z" fill="#3DAEEE"/>
												</svg>
												3 Beds 
											</span>
											<span className="card_info" style={{marginTop: 2, fontWeight: 500, color: '#555555', alignItems:'center',display:'flex', gap:'7px'}}>
												<svg width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M24.5455 2.46847H8.45455C6.7977 2.46847 5.45455 3.81161 5.45455 5.46847V9.74447C5.45455 10.4976 4.84402 11.1081 4.09091 11.1081C3.33779 11.1081 2.72727 10.4976 2.72727 9.74447V1.36364C2.72727 0.610523 2.11675 0 1.36364 0C0.610521 0 0 0.610521 0 1.36364V17.1499C0 17.903 0.610521 18.5135 1.36364 18.5135C2.11675 18.5135 2.72727 17.903 2.72727 17.1499V16.6622C2.72727 15.6397 3.55615 14.8108 4.57862 14.8108H25.4214C26.4438 14.8108 27.2727 15.6397 27.2727 16.6622V17.1499C27.2727 17.903 27.8832 18.5135 28.6364 18.5135C29.3895 18.5135 30 17.903 30 17.1499V7.40541C30 6.09605 29.4253 4.84032 28.4024 3.91446C27.3795 2.98861 25.9921 2.46847 24.5455 2.46847Z" fill="#3DAEEE"/>
												</svg>
												4 Baths
											</span>
										</div>									
									</div>
								</div>
							</div>
							<div style={{width: '350px', height:'fit-content', display:'flex', flexDirection:'column', boxShadow:'0px 0px 4px 1px rgba(0, 0, 0, 0.33)'}}>
								<div>
									<img src={stats} style={{width:'100%'}}/>
								</div>
								<div style={{padding: 15}}>
									<div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', maxHeight: '25px'}}>
										<p className="card_title">Villas, Jumeriah</p>
										<p className="card_amount_text" style={{color:'#278F3E',fontWeight:600}}>$ 1,500,000	</p>
									</div>
									<div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', maxHeight: '25px'}}>
										<p className="card_info" style={{display:'flex', alignItems:'center'}}>3BKH <div style={{width:'7px',height:'7px', borderRadius:'50%', background: 'rgba(85, 85, 85, 0.47)', margin: '0px 5px'}}/> Lorem Ipsum</p>
									</div>
									<div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', maxHeight: '25px'}}>
										<p className="card_amount_sub_text" style={{marginTop: 2}}>Property ID - 1</p>
									</div>
									<div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap: '20px', marginTop: 7}}>
										<div style={{display:'flex', gap: '20px'}}>
											<span className="card_info" style={{marginTop: 2, fontWeight: 500, color: '#555555', alignItems:'center',display:'flex', gap:'7px'}}>
												<svg width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M24.5455 2.46847H8.45455C6.7977 2.46847 5.45455 3.81161 5.45455 5.46847V9.74447C5.45455 10.4976 4.84402 11.1081 4.09091 11.1081C3.33779 11.1081 2.72727 10.4976 2.72727 9.74447V1.36364C2.72727 0.610523 2.11675 0 1.36364 0C0.610521 0 0 0.610521 0 1.36364V17.1499C0 17.903 0.610521 18.5135 1.36364 18.5135C2.11675 18.5135 2.72727 17.903 2.72727 17.1499V16.6622C2.72727 15.6397 3.55615 14.8108 4.57862 14.8108H25.4214C26.4438 14.8108 27.2727 15.6397 27.2727 16.6622V17.1499C27.2727 17.903 27.8832 18.5135 28.6364 18.5135C29.3895 18.5135 30 17.903 30 17.1499V7.40541C30 6.09605 29.4253 4.84032 28.4024 3.91446C27.3795 2.98861 25.9921 2.46847 24.5455 2.46847Z" fill="#3DAEEE"/>
												</svg>
												3 Beds 
											</span>
											<span className="card_info" style={{marginTop: 2, fontWeight: 500, color: '#555555', alignItems:'center',display:'flex', gap:'7px'}}>
												<svg width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M24.5455 2.46847H8.45455C6.7977 2.46847 5.45455 3.81161 5.45455 5.46847V9.74447C5.45455 10.4976 4.84402 11.1081 4.09091 11.1081C3.33779 11.1081 2.72727 10.4976 2.72727 9.74447V1.36364C2.72727 0.610523 2.11675 0 1.36364 0C0.610521 0 0 0.610521 0 1.36364V17.1499C0 17.903 0.610521 18.5135 1.36364 18.5135C2.11675 18.5135 2.72727 17.903 2.72727 17.1499V16.6622C2.72727 15.6397 3.55615 14.8108 4.57862 14.8108H25.4214C26.4438 14.8108 27.2727 15.6397 27.2727 16.6622V17.1499C27.2727 17.903 27.8832 18.5135 28.6364 18.5135C29.3895 18.5135 30 17.903 30 17.1499V7.40541C30 6.09605 29.4253 4.84032 28.4024 3.91446C27.3795 2.98861 25.9921 2.46847 24.5455 2.46847Z" fill="#3DAEEE"/>
												</svg>
												4 Baths
											</span>
										</div>									
									</div>
								</div>
							</div>
							<div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'350px', marginLeft: 20}}>
								<svg width="77" height="77" viewBox="0 0 77 77" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="38.5" cy="38.5" r="38" fill="white" stroke="#3DAEEE"/>
									<path d="M50.1667 39.6667H40.6667V49.1667H37.5V39.6667H28V36.5H37.5V27H40.6667V36.5H50.1667V39.6667Z" fill="#3DAEEE"/>
								</svg>
							</div>
						</div>
					</div>
				</div>
		);
	}
};

export default MyProperties;
