import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faLocationDot, faFaceSmile, faPaperPlane, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import Script from 'next/script';
import Layout from '@/components/Layout';
import Axios from '@/helper/axios.helper';
import { pages } from '@/utils/contanst'
import { sassNull } from "sass";
const host = "http://localhost:8000";

export async function getServerSideProps({ req, res }) {
	const token = req.cookies["vechaitoken"];
	const { data: userData } = await Axios({
		url: "/api/user/getbytoken",
		method: "GET",
		headers: { authorization: token },
	})
	if (!userData) NextResponse.redirect(new URL('/login', request.url))
	const { data: users } = await Axios({
		url: "/api/user/get",
		method: "GET",
		headers: { authorization: token },
	})
	console.log('Users::', users)
	const getUserList = (key, users) => {
		let result = [];
		switch (key) {
			case 'seller':
				result = users.filter((user) => {
					return user.name === 'buyer'
				})
				break;
			case 'buyer':
				result = users.filter((user) => {
					return user.name === 'seller'
				})
				break;
			default:
				return result;
		}
		return result;
	}

	const filterUser = getUserList(userData[0].name, users.data)
	console.log('FilterUser', filterUser)
	return {
		props: {
			userData: userData[0],
			filterUser
		},
	};
}
function App({ userData, filterUser }) {
	const [layoutPages, setLayoutPages] = useState(null)
	const { fullname, name, email, accessApp, id, image } = userData;
	const socketIO = useRef(null)
	const chatLeftRender = useRef([]);
	const [chatText, setChatText] = useState('');
	const [chanel, setChanel] = useState(null);
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
			socketIO.current.on('receiveMessage', (messageObj) => {
				console.log('ms', messageObj)
	
				const { from, to, message } = messageObj
				if (to === userData.id) {
					if (!chatLeftRender.current.includes(messageObj.timestamp)) {
						console.log(chatLeftRender.current)
						console.log(message)
						addMessage(message, 'left')
						chatLeftRender.current.push(messageObj.timestamp)
					}
				}
			})
		}, 500)

		return () => {
			//socketIO.current.disconnect();
		};
	}, [])
	const handleSendmessage = () => {
		console.log(socketIO.current)
		const messageObj = {
			from: userData.id,
			to: chanel.id,
			message: chatText,
			timestamp: new Date().getTime()

		}
		socketIO.current.emit('sendMessage', messageObj);
		addMessage(chatText, 'right')
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
	return (
		<>
			<Head>
				<title>Trang chủ</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/assets/img/logo1.PNG" />
				<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"> </script>

			</Head>
			<Layout pages={layoutPages} user={{ fullname, email, name, image }} >

				<div className="chat-box" style={{ marginTop: '30px', position: 'relative' }}>
					<div className="container">
						<div className="row no-gutters">
							<div className="col-md-4 border-right">
								<div className="settings-tray">
									<img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg" alt="Profile img" />
									<span className="settings-tray--right">
										<FontAwesomeIcon icon={faRotateRight} style={{ width: '20px', height: '20px', marginTop: '5px', marginRight: '10px' }} />

									</span>
								</div>
								<div className="search-box">
									<div className="input-wrapper">

										<input placeholder="Search here" type="text" />
									</div>
								</div>
								{filterUser && filterUser.map((user, index) => {
									return (
										<>
											<div className="friend-drawer friend-drawer--onhover" key={index} onClick={() => { chatWith(user) }}
												style={chanel && (chanel.id === user.id) ? { backgroundColor: `#74b9ff`, color: `#fff` } : {}}>
												<img className="profile-image" src={user.image || "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"} alt="" />
												<div className="text">
													<h6>{user.fullname}</h6>
													<p className="text-muted">{user.email}</p>
												</div>
												<span className="time text-muted small">{user.name}</span>
											</div>
										</>
									)
								})}

								<hr />

							</div>
							<div className="col-md-8">
								{
									chanel ?
										<>
											<div className="settings-tray">
												<div className="friend-drawer no-gutters friend-drawer--grey">
													<img className="profile-image" src={chanel.image || "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"} alt="" />
													<div className="text">
														<h6>{chanel.fullname}</h6>
														{/* <p className="text-muted">Layin' down the law since like before Christ...</p> */}
													</div>
													<span className="settings-tray--right">
														<FontAwesomeIcon icon={faRotateRight} style={{ width: '20px', height: '20px', marginTop: '5px', marginRight: '10px' }} />
													</span>
												</div>
											</div>

											<div className="chat-panel">


												<div className="chat-content">
													{/* { chanel && chanel.id === id ? (   */}
													<div id="chatbox">

													</div>
													{/* ) : null}  */}
												</div>

												<div className="row">
													<div className="col-11" style={{ position: 'absolute', bottom: 0, width: '70%' }}>
														<div className="chat-box-tray">
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
										</> : <p>Chưa chọn kênh chat...</p>
								}

							</div>
						</div>
					</div>
				</div>


			</Layout>

		</>
	);
}

export default App;