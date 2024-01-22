import React, {useState, useEffect, useRef, useContext} from 'react';
import {Row, Col, Alert} from 'antd';
import { Form, Button, Card} from "react-bootstrap"


import { useHistory, Link, withRouter, Redirect  } from 'react-router-dom';

import coverSignup from '../../assets/images/cover_signup.png'
import { auth } from "../../firebase";
import { UserContext } from "../../contexts/UserProvider"

import './style.css';
import { motion } from "framer-motion";

const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()

    const [message, setMessage] = useState("")
    const [description, setDescription] = useState("")
    const [alertType, setAlertType] = useState("")

    const [loading, setLoading] = useState(false)
    const history = useHistory()



    // testing for the loginform
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(emailRef.current.value)
        // console.log(passwordRef.current.value)
        
        try {
            setLoading(true)
            await auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            if (auth.currentUser.emailVerified){
                setAlertType("success")
                setMessage("Welcome to Hotelier!")
                setDescription("Logged in successfully!")
                history.push("/")
            } else {
                setAlertType("error")
                setMessage("Login failed.")
                setDescription("Please verify your account through your email.")
            }
        } catch {
            setAlertType("error")
            setMessage("Login failed.")
            setDescription("Please try again.")
        }
        setLoading(false)
    }

    const user = useContext(UserContext);


    if (user) {
        if (auth.currentUser.emailVerified){
            return <Redirect to="/" />;
        }
    }

    return (
            <div style={{ height: '100vh', width: '100%', display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
            <div style={{ position: 'absolute', bottom: '0vh', width: '100%', height: '10vh'}}>
                <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                    <g class="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(10,111,211,0.7" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(10,111,211,0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(10,111,211,0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#0a6fd3" />
                    </g>
                </svg>
            </div>

                <motion.Row initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{type: "spring", stiffness: 140, damping: 20}}>
                    <Col>
                        <div style={{display: 'flex',justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}}>
                            <p style={{ fontSize: 42, color: 'black',fontWeight: 'bold', fontFamily: 'Gilroy-ExtraBold', paddingBottom: 30}}>Login to Hotelier</p>
                            <Card>
                                <Card.Body>
                                    
                                    
                                    <Form className="card-" onSubmit={handleSubmit}>
            {message, alertType, description && <Alert
                                                message={message}
                                                description={description}
                                                type={alertType}
                                                showIcon
                                                />}
                                        <Form.Group id="email">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
                                            <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group id="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
                                        </Form.Group>
                                        <Button variant="primary" type="submit" style={{width: '50%'}} className="w-100" disabled={loading} >
                                            Login
                                        </Button>
                                        {/* <p style={{alignItems: 'center', textAlign: 'center', marginTop: 2, marginBottom: -2}}>or</p>
                                        <Button variant="light" style={{width: '100%', paddingTop: 5, paddingBottom: 10}} onClick={() => {}}>
                                            <img src={googleLogo} alt="google-logo" width="20px" height="20px" style={{marginRight: 10}}/>Sign In using gmail account
                                        </Button> */}
                                        <div style={{textAlign: 'center', marginTop: 30}}>
                                            <p style={{fontSize: 14}}>Don't have account yet? <Link to="/signup" className="text-blue-500 hover:text-blue-600">Sign up here</Link>{" "}</p>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    
                </motion.Row>

                        

        </div>
      );
}

export default Login;