import React, { useState, useContext} from "react";
import './style.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Cascader, Card, Col, Row, Select, Radio, PageHeader, Typography, Dropdown} from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    LockOutlined,
    DownCircleFilled,
  } from '@ant-design/icons';
import { motion } from "framer-motion";

import testImage from "../../assets/images/test.jpg"
import { UserContext } from "../../contexts/UserProvider"
import { auth } from "../../firebase";
import { Link, useHistory } from "react-router-dom"

import imagePrivato from "../../assets/images/quezonHotels/image1_privato.jpg"
import imageSeda from "../../assets/images/quezonHotels/image2_seda.jpg"
import imageRedPlanet from "../../assets/images/quezonHotels/image3_redPlanet.jpg"

import imageGardenSuites from "../../assets/images/manilaHotels/image1_cityGardenSuites.jpg"
import imageRegencySuites from "../../assets/images/manilaHotels/image2_regencyGrandSuites.jpeg"
import imageRedPlanet2 from "../../assets/images/manilaHotels/image3_redPlanet.jpg"

import imageDusitThani from "../../assets/images/makatiHotels/image1_dusitThani.jpg"
import imageHolidayInn from "../../assets/images/makatiHotels/image2_holidayInn.jpg"
import imageMakatiPalace from "../../assets/images/makatiHotels/image3_makatiPalace.jpg"

import imageBalaoro from "../../assets/images/aboutUs/balaoro.png"
import imageBen from "../../assets/images/aboutUs/ben.png"
import imageCozens from "../../assets/images/aboutUs/cozenshardy.png"
import imageFototana from "../../assets/images/aboutUs/fototana.png"
import imageTano from "../../assets/images/aboutUs/tano.png"


const {Title} = Typography;

  const { Option } = Select;
  const { Meta } = Card;
  const { Header, Content, Footer, Sider } = Layout;

  const children = [<Option key='quezonCity'>Quezon City</Option>,
                    <Option key='manilaCity'>Manila City</Option>,
                    <Option key='makatiCity'>Makati City</Option>];


const Main = () => {
  
  const user = useContext(UserContext);
  const {displayName, uid} = user;
  const history = useHistory()
  const menu = (
    <Menu style={{borderRadius: 10, height: '25vh', width: '13vw', marginTop: 0}}>
      <Menu.ItemGroup title="Account Settings">
      <Menu.Item icon={<UserOutlined />} style={{fontSize: 16}}>Edit Profile</Menu.Item>
      <Menu.Item icon={<LockOutlined />} style={{fontSize: 16}}>Account Password</Menu.Item>
      <Menu.Item icon={<LockOutlined />} onClick={async () => {
          await auth.signOut()
          history.replace("/")
      }} style={{fontSize: 16}}>Logout</Menu.Item>
      </Menu.ItemGroup>
    </Menu>
    );

    const [selectedMenu, setSelectedMenu] = useState('mainPage');
    const [selectedCity, setSelectedCity] = useState('');
    
    return (
      
        <Layout style={{height: '115vh'}}>
            <Sider style={{ height: '115vh',zIndex: 1}} breakpoint="md" collapsedWidth="0" onBreakpoint={broken => {
                console.log(broken);
            }} onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}>
            <div style={{height: 32, margin: 16, background: "#001529"}}/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" onClick={async (e) => setSelectedMenu('mainPage')} icon={<HomeOutlined />}>
                    Home
                    </Menu.Item>
                    <Menu.Item key="2" onClick={async (e) => setSelectedMenu('aboutUs')} icon={<UserOutlined />}>
                    About Us
                    </Menu.Item>

                </Menu>
            </Sider>

            <Layout>
            <PageHeader
                        className="site-page-header"
                        title={"Hotelier"}
                        subTitle={"Your escape."}
                        style={{backgroundColor: '#fff'}}
                        extra={[
                            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                                <Title style={{fontSize: 15, marginRight: 10, marginTop: 10}}>{displayName}</Title>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a style={{textDecoration: 'none', color: 'gray'}} onClick={e => e.preventDefault()}>
                                    <DownCircleFilled style={{fontSize: 20, fontWeight: 'bold'}}/>
                                    </a>
                                </Dropdown>
                            </div>
                        ]}
                    ></PageHeader>

                    
                  <Content className='canvas' style={{height: '100%', margin: '24px 16px 100px' }}>

                      
                          
                          {
                              selectedMenu === 'mainPage' ? 
                              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                              <Select placeholder='Select a location:' size='large' onChange={async (e) => setSelectedCity(e)} style={{ width: '40vw', textAlign: 'center'}}>
                                {children}
                              </Select>

                              {
                              selectedCity === 'quezonCity' ?
                                
                                  <Row className='cards' gutter={8} style={{ justifyContent: 'start', alignItems: 'center', flexDirection: 'row', paddingTop: 30}}>
                                    
                                    <Col span={8} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                      <Card hoverable style={{height: '100%', width: 600}} cover={<img alt="example" src={imagePrivato} />}>
                                        <Meta title="Privato Hotel" description="https://privatohotels.com/" />
                                      </Card>
                                    </Col>
                                    <br/>
                                    <Col span={8} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                      <Card hoverable style={{height: '100%', width: 600}} cover={<img alt="example" src={imageSeda}/>}>
                                        <Meta title="Seda Vertis North" description="https://vertisnorth.sedahotels.com/" />
                                      </Card>
                                    </Col>
                                    <br/> 
                                    <Col span={8} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                      <Card hoverable style={{height: '100%', width: 600}} cover={<img alt="example" src={imageRedPlanet}/>}>
                                        <Meta title="Red Planet" description="https://www.redplanethotels.com/hotel" />
                                      </Card>
                                    </Col>
                                  </Row>

                              :
                              selectedCity === 'manilaCity' ?
                              <Row className='cards' gutter={8} style={{ justifyContent: 'start', alignItems: 'center', flexDirection: 'row', paddingTop: 30}}>
                                    
                                    <Col span={8} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                      <Card hoverable style={{height: '100%', width: 600}} cover={<img alt="example" src={imageGardenSuites} />}>
                                        <Meta title="City Garden Suites" description="https://www.citygardensuites.com/" />
                                      </Card>
                                    </Col>
                                    <br/>
                                    <Col span={8} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                      <Card hoverable style={{height: '100%', width: 600}} cover={<img alt="example" src={imageRegencySuites}/>}>
                                        <Meta title="Regency Suites" description="https://www.rgsmanila.com/" />
                                      </Card>
                                    </Col>
                                    <br/> 
                                    <Col span={8} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                      <Card hoverable style={{height: '100%', width: 600}} cover={<img alt="example" src={imageRedPlanet2}/>}>
                                        <Meta title="Red Planet" description="https://www.redplanethotels.com/hotel" />
                                      </Card>
                                    </Col>
                                  </Row>
                              :
                              selectedCity === 'makatiCity' ?
                              <Row className='cards' gutter={8} style={{ justifyContent: 'start', alignItems: 'center', flexDirection: 'row', paddingTop: 30}}>
                                    
                                    <Col span={8} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                      <Card hoverable style={{height: '100%', width: 600}} cover={<img alt="example" src={imageDusitThani} />}>
                                        <Meta title="Dusit Thani" description="https://www.dusit.com/dusitthani-manila/" />
                                      </Card>
                                    </Col>
                                    <br/>
                                    <Col span={8} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                      <Card hoverable style={{height: '100%', width: 600}} cover={<img alt="example" src={imageHolidayInn}/>}>
                                        <Meta title="Holiday Inn" description="https://makati.holidayinn.com/" />
                                      </Card>
                                    </Col>
                                    <br/> 
                                    <Col span={8} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                      <Card hoverable style={{height: '100%', width: 600}} cover={<img alt="example" src={imageMakatiPalace}/>}>
                                        <Meta title="Makati Palace" description="https://makatipalacehotel.com.ph/" />
                                      </Card>
                                    </Col>
                                  </Row>
                              :
                              null
                              }
                            </div>
                            
                            : selectedMenu === 'aboutUs' ?
                            
                            
                            <Row className='aboutUsContainer' gutter={16} style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Col className='colCont' style={{ flexBasis: '20%', width: '20%'}}>
                                  <div style={{ background: "yellow", padding: ".5em", textAlign: "center" }}>
                                    <img className='membersImage' src={imageBalaoro}/>
                                    <p style={{paddingTop: 20, fontFamily: 'Gilroy-Light', fontSize: '1.15em', fontWeight: 'bold'}}>Maria Sofia G. Balaoro</p>
                                  </div>
                                </Col>
                                <Col className='colCont' style={{ flexBasis: "20%", width: '20%' }}>
                                  <div style={{ background: "yellow", padding: ".5em", textAlign: "center" }}>
                                    <img className='membersImage' src={imageBen}/>
                                    <p style={{paddingTop: 20, fontFamily: 'Gilroy-Light', fontSize: '1.15em', fontWeight: 'bold'}}>Erwin Paul L. Ben</p>
                                  </div>
                                </Col>
                                <Col className='colCont' style={{ flexBasis: "20%", width: '20%' }}>
                                  <div style={{ background: "yellow", padding: ".5em", textAlign: "center" }}>
                                    <img className='membersImage' src={imageCozens}/>
                                    <p style={{paddingTop: 20, fontFamily: 'Gilroy-Light', fontSize: '1.15em', fontWeight: 'bold'}}>Jeremy William D.L Cozens-Hardy</p>
                                  </div>
                                </Col>
                                <Col className='colCont' style={{ flexBasis: "20%", width: '20%' }}>
                                  <div style={{ background: "yellow", padding: ".5em", textAlign: "center" }}>
                                    <img className='membersImage' src={imageFototana}/>
                                    <p style={{paddingTop: 20, fontFamily: 'Gilroy-Light', fontSize: '1.15em', fontWeight: 'bold'}}>Christian Paul Fototana</p>
                                  </div>
                                </Col>
                                <Col className='colCont' style={{ flexBasis: "20%", width: '20%' }}>
                                  <div style={{ background: "yellow", padding: ".5em", textAlign: "center" }}>
                                    <img className='membersImage' src={imageTano}/>
                                    <p style={{paddingTop: 20, fontFamily: 'Gilroy-Light', fontSize: '1.15em', fontWeight: 'bold'}}>Patricia Anne D. Taño</p>
                                  </div>
                                </Col>
                            </Row>
                            
                            
                              

                            : null
                        }

                      
                      
                  </Content>

            </Layout>
        </Layout>
    );
}
export default Main;