import React, {useState, useEffect, useRef} from 'react';
import {useAuth} from '../../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom';
import {Row, Col, Alert} from 'antd';
import { Form, Button, Card} from "react-bootstrap"
import {SignInWithGoogle, generateUserDocument} from '../../firebase'
import { auth } from "../../firebase";

import googleLogo from '../../assets/images/google_logo.png'
import coverSignup from '../../assets/images/cover_signup.png'

import './style.css';
import { motion } from "framer-motion";

  const Signup = () => {
    const emailRef = useRef();
    const passwordRef =  useRef();
    const passwordConfirmRef = useRef();
    const displayNameRef = useRef();

    // const {signup} = useAuth();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("call function")
        // console.log(emailRef.current.value)
        // console.log(passwordRef.current.value)
        // console.log(passwordConfirmRef.current.value)
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password do not match")
        } else {
            try {
                
                setLoading(true)
                const displayName = displayNameRef.current.value
                const {user} = await auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
                await generateUserDocument(user, {displayName})

                user.sendEmailVerification().then(function() {
                    setError("Just a few steps more! A verification code has been sent to your email.")
                  }).catch(function(error) {
                    // An error happened.
                  });

            } catch(error) {
                console.log(error)
                setError("Failed to create an account")
            }
            setLoading(false)
        }

    }

    return (
        <div  style={{height: '100vh', width: '100%', display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
            <div style={{ position: 'absolute', bottom: '0vh', width: '100%', height: '10vh'}}>
                <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                    <g class="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(76,0,19,0.7" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(76,0,19,0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(76,0,19,0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#4C0013" />
                    </g>
                </svg>
            </div>
            <motion.Row initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{type: "spring", stiffness: 140, damping: 20}}>
                <Col>
                    <div style={{display: 'flex',justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}}>
                        <p style={{ fontSize: 42, color: 'black',fontWeight: 'bold', fontFamily: 'Gilroy-ExtraBold', paddingBottom: 30}}>Sign Up to Hotelier</p>
                        <Card>
                            <Card.Body>
                                {error && <Alert message={error} type="warning" showIcon />}
                                <Form className="card-" onSubmit={handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Display Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter display name" ref={displayNameRef}/>
                                    </Form.Group>
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
                                    <Form.Group id="password-confirm">
                                        <Form.Label>Password Confirmation</Form.Label>
                                        <Form.Control type="password" ref={passwordConfirmRef} required placeholder="Confirm password"/>
                                    </Form.Group>
                                    <Button variant="danger" type="submit" style={{width: '50%'}} className="w-100" disabled={loading} >
                                        Create Account
                                    </Button>
                                    {/* <p style={{alignItems: 'center', textAlign: 'center', marginTop: 2, marginBottom: -2}}>or</p>
                                    <Button variant="light" style={{width: '100%', paddingTop: 5, paddingBottom: 10}} onClick={() => {}}>
                                        <img src={googleLogo} alt="google-logo" width="20px" height="20px" style={{marginRight: 10}}/>Sign In using gmail account
                                    </Button> */}
                                    <div style={{textAlign: 'center', marginTop: 30}}>
                                        <p style={{fontSize: 14}}>Already have account yet? <Link to="/login" className="text-blue-500 hover:text-blue-600">Sign In here</Link>{" "}</p>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </motion.Row>
        </div>
        // <div style={{display: 'flex',justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        //     <Card style={{width: '30vw', paddingBottom: 30, paddingLeft: 20, paddingRight: 20}}>
        //         <Card.Body>
        //         <h2 className="text-center mb-4">Sign Up</h2>
        //         {error && <Alert variant="danger">{error}</Alert>}
        //             <Form onSubmit={handleSubmit}>
        //                 <Form.Group id="email">
        //                 <Form.Label>Email</Form.Label>
        //                 <Form.Control type="email" ref={emailRef} required />
        //                 </Form.Group>
        //                 <Form.Group id="password">
        //                 <Form.Label>Password</Form.Label>
        //                 <Form.Control type="password" ref={passwordRef} required />
        //                 </Form.Group>
                        // <Form.Group id="password-confirm">
                        // <Form.Label>Password Confirmation</Form.Label>
                        // <Form.Control type="password" ref={passwordConfirmRef} required />
                        // </Form.Group>
        //                 <Button disabled={loading} className="w-100" type="submit">
        //                 Sign Up
        //                 </Button>
        //             </Form>
        //         </Card.Body>
        //         <div className="w-100 text-center mt-2">
        //         Already have an account? <Link to="/login">Log In</Link>
        //     </div>
        //     </Card>
        // </div>
        
    )
  }

  export default Signup;