import 'bootstrap/dist/css/bootstrap.min.jsx';
import { Navbar, Nav } from 'react-bootstrap';
import React, { Component } from 'react'
import Head from 'next/head';

const Home = ({ Component }) => {

    return (
        <>
            <Head>
                <title>GOGOGOGO</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.21.2/antd.css" />
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

            </Head>

            <div>

                <Navbar bg="light" variant="light" className="justify-content-between">
                    <Navbar.Brand href="#home">PUMPETITION</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link href="#about">ABOUT</Nav.Link>
                        {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}

                    <Component />

                    </Navbar.Collapse>
                    {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form> */}
                </Navbar>
                {/* {memo.p2}  */}
            </div>
        </>
    );
};

export default Home;