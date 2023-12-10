import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faLocationDot, faFaceSmile, faPaperPlane, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import Script from 'next/script';
import Layout from '@/components/Layout';
import Axios from '@/helper/axios.helper';
import axios from "axios";
import { pages } from '@/utils/contanst'
import { useSearchParams } from 'next/navigation'
import { sassNull } from "sass";
const host = "http://localhost:8000";

export async function getServerSideProps({ req, res }) {
	const token = req.cookies["vechaitoken"];
	const { data: userData } = await Axios({
		url: "/api/user/getbytoken",
		method: "GET",
		headers: { authorization: token },
	});
	// const { data: users } = await Axios({
	//   url: "/api/user/getalluser",
	//   method: "GET",
	//   headers: { authorization: token },
	// });

	// const getUserList = (key, users) => {
	//   // saler - buyer
	//   let result = [];
	//   switch (key) {
	// 	case "saler":
	// 	  // get buyer list
	// 	  result = users.filter((user) => {
	// 		return user.name === "buyer";
	// 	  });
	// 	  break;
	// 	case "buyer":
	// 	  // get saler list
	// 	  result = users.filter((user) => {
	// 		return user.name === "saler";
	// 	  });
	// 	  break;
	// 	default:
	// 	  return result;
	//   }
	//   return result;
	// };

	// const filterUser = getUserList(userData[0].name, users); // saler
	// console.log("Filer::", filterUser);

	return {
		props: {
			userData: userData[0],

		},
	};
}
function App({ userData }) {
	const [layoutPages, setLayoutPages] = useState(null)
	const { fullname, name, email, accessApp, id, image } = userData;
	const socketIO = useRef(null)
	const chatLeftRender = useRef([]);
	const [chatText, setChatText] = useState('');
	const [chanel, setChanel] = useState(null);
	const [filterUser, setfilterUser] = useState([]);
	const searchParams = useSearchParams()






	useEffect(() => {
		const accessAppList = accessApp.split(', ')
		if (accessAppList && Array.isArray(accessAppList)) {
			let foundePages = []
			pages.forEach((page, index) => {
				if (accessAppList.includes(page.key)) {
					foundePages.push(page)
				}
			})
			setLayoutPages(foundePages)

		}
		setTimeout(() => {
			socketIO.current = window.io("ws://localhost:8000");
			socketIO.current.on("receiveMessage", (messageObj) => {
				console.log(`Ms:::`, messageObj);
				const { from, to, text } = messageObj    
				console.log('TO', to)
				console.log('ID', userData.id)
				if(to === userData.id) {
				  if(!chatLeftRender.current.includes(messageObj.timestamp)) {
					addMessage(text, 'left')
					chatLeftRender.current.push(messageObj.timestamp)
				  }
				}
			  });
		}, 500)
		getMessageByUser({ userId: userData.id, role: userData.name }).then(() => {
			// Check Query params
			triggerGetDataByParam()

		})

		return () => {
			//socketIO.current.disconnect();
		};
	}, [])
	const handleSendmessage = () => {
		console.log(socketIO.current)

		const messageObj = {
			messageId: chanel.message_id,
			userId: userData.id,
			from: userData.id,
			to: (chanel.buyer_id == userData.id) ? chanel.saler_id : userData.id,
			text: chatText,
			timestamp: new Date().getTime()
		}
		socketIO.current.emit('sendMessage', messageObj);
		addMessage(chatText, 'right');
		setChatText('')
	}

	// const scrollToBottom = () => {
	// 	messagesEnd.current.scrollIntoView({ behavior: "smooth" });
	// }
	const onEnterPress = (e) => {
		if (e.keyCode == 13 && e.shiftKey == false) {
			handleSendmessage()
		}
	}
	const chatWith = (user) => {
		user.contentObj = JSON.parse(user.content)
		setChanel(user)
	}


	const addMessage = (message, key) => {
		console.log(message)
		let child = document.createElement('div');
		if (key === "left") {
			child.innerHTML = '<div class="row no-gutters"><div class="col-md-4"><div class="chat-bubble chat-bubble--left">' +
				message +
				'</div></div></div>';
		} else {
			child.innerHTML = '<div class="row no-gutters"><div class="col-md-4 offset-md-8"><div class="chat-bubble chat-bubble--right">' +
				message +
				'</div></div></div>'
		}
		child = child.firstChild;
		document.getElementById('chatbox').appendChild(child)
	}


	const triggerGetDataByParam = () => {
		const salerId = searchParams.get('salerId')
		const postId = searchParams.get('postId')
		if (salerId && postId) {
			checkAndCreateMessage({
				buyerId: userData.id,
				salerId: salerId,
				postId: postId
			})
		}
	}

	const checkAndCreateMessage = async ({ buyerId, salerId, postId }) => {
		axios.post(`/api/message`, {
			buyerId, salerId, postId
		}).then((res) => {
			console.log(res);
			if (res && res.data) {
				const { data } = res;
				if (data && data.content) {
					data.contentObj = JSON.parse(data.content)
				}
				setChanel(data);
			}
		})
	}

	//   const getMessageByParams = async ({ buyerId, salerId, postId }) => {
	// 	axios.get(`/api/message/getbypost?buyerId=${buyerId}&salerId=${salerId}&postId=${postId}`).then((res) => {
	// 	  console.log(res);
	// 	  if (res && res.data) {
	// 		  const { data } = res.data;
	// 		  if(data && data[0]) {
	// 			setChanel(data[0]);
	// 		  }

	// 	  }
	// 	});
	//   }

	const getMessageByUser = async ({ userId, role }) => {
		return axios.get(`/api/message/getbyuser?userId=${userId}&role=${role}`).then((res) => {

			if (res && res.data) {
				console.log('gggggggggg')
				const { data } = res;
				console.log('hhh', data)
				setfilterUser(data);

			}
		});
	}



	return (
		<>
			<Head>
				<title>Trang chủ</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/assets/img/logo1.PNG" />
				<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"> </script>

			</Head>
			<main>
			<Layout pages={layoutPages} user={{ fullname, name, email }}>
				<h2 className="posttitle" style={{ padding: "10px" }}>
					Chat box
				</h2>

				<div className="chat-box">
					<div className="container">
						<div className="row no-gutters">
							<div className="col-md-4 border-right">
								<div className="search-box">
									<div className="input-wrapper">
										<input placeholder="Search here" type="text" />
									</div>
								</div>

								{filterUser &&
									filterUser.map((fuser, index) => {
										return (
											<div key={index} onClick={() => chatWith(fuser)}>
												<div className="friend-drawer friend-drawer--onhover">
													<img
														className="profile-image"
														src={
															fuser.post_image ||
															"https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
														}
														alt=""
													/>
													<div className="text">
														<h6>{fuser.saler_fullname}</h6>
														<p className="text-muted">{fuser.post_name}</p>
													</div>
													<span className="time text-muted small">
														{fuser.saler_phonenumber}
													</span>
												</div>
												<hr />
											</div>
										);
									})}
							</div>
							<div className="col-md-8" style={{ height: 500, overflowY: "auto" }}>
								{chanel ? (
									<>
										<div className="settings-tray">
											<div className="friend-drawer no-gutters friend-drawer--grey">
												<img
													className="profile-image"
													src={chanel.post_image || "https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"}
													alt=""
												/>
												<div className="text">
													<h6>Bài viết: {chanel.post_name}</h6>
													<p>Người bán: {chanel.saler_fullname}</p>
													<p>Người mua: {chanel.buyer_fullname}</p>
												</div>
												<span className="settings-tray--right">
													<p>Trạng thái bán: {chanel.post_approve_request || 'chưa bán'}</p>
													<span>Giá muốn bán: {chanel.post_expectprice}</span>
													{/* <i className="material-icons">cached</i> */}
												</span>
											</div>
										</div>
										<div className="chat-panel">
											<div id="chatbox">
												{
													chanel.contentObj && chanel.contentObj.messages &&  chanel.contentObj.messages.map((msg, index) => {
														let tpl = ''
														if (msg && msg.userId === userData.id) {
															tpl = <div className="row no-gutters" key={index}><div className="col-md-3 offset-md-9"><div className="chat-bubble chat-bubble--right"> {msg.text} </div></div></div>
														} else {
															tpl = <div className="row no-gutters" key={index}><div className="col-md-3"><div className="chat-bubble chat-bubble--left"> {msg.text} </div></div></div>
														}
														return tpl
													})
												}

											</div>
											{/* <div className="row no-gutters">
                          <div className="col-md-3">
                            <div className="chat-bubble chat-bubble--left">
                              Hello dude!
                            </div>
                          </div>
                        </div>
                        <div className="row no-gutters">
                          <div className="col-md-3 offset-md-9">
                            <div className="chat-bubble chat-bubble--right">
                              Hello dude!
                            </div>
                          </div>
                        </div> */}

											<div className="row">
												<div className="col-11" style={{ position: 'absolute', bottom: '-49px', width: '70%' }}>
													<div className="chat-box-tray" style={{width: '50%'}}>
														<FontAwesomeIcon icon={faFaceSmile} style={{ width: '20px', height: '20px', marginTop: '5px', marginRight: '10px' }} />
														<input type="text"
															value={chatText}
															// onKeyDown={onEnterPress}
															onChange={(e) => { setChatText(e.target.value) }}
															placeholder="Type your message here..." />

														<button onClick={handleSendmessage}><FontAwesomeIcon icon={faPaperPlane} style={{ width: '20px', height: '20px', marginTop: '5px', marginRight: '10px' }} /></button>
													</div>
												</div>
											</div>
										</div>
									</>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</Layout>
			</main>
			

		</>
	);
}

export default App;