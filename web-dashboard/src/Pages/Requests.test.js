import React from 'react';
import {render, screen, fireEvent,} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Requests from "./Requests"


describe("Request Naviagtion testing", () => {


    
    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Requests Events page sub navigation link testing

      Target: Requests

      Assertions: link for requests can be seen in Requests sub Navbar
        link takes user to /Requests/Events

      Writer: Philip Pavlick - 2/20/23 - SP 313
    -------------------------------------------------------------------T*/

    test("AdminEvent Navigation Testing ", async () => {
        render(
            <Requests/>,
            { wrapper: BrowserRouter},
        );
        const EventLink = screen.getByText("Events");
        expect (EventLink).toBeInTheDocument();
        expect (EventLink.href).toContain("/Events")


    
    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Requests Officer page sub navigation link testing

      Target: Requests

      Assertions: link for requests Officer can be seen in Requests sub Navbar
        link takes user to /Requests/Officer

      Writer: Philip Pavlick - 2/20/23 - SP 313
    -------------------------------------------------------------------T*/
    
    });

    test("AdminOfficer Navigation Testing ", async () => {
        render(
            <Requests/>,
            { wrapper: BrowserRouter},
        );
        const EventLink = screen.getByText("Officer");
        expect (EventLink).toBeInTheDocument();
        expect (EventLink.href).toContain("/Officer")


    
    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Requests Annoucement page sub navigation link testing

      Target: Requests

      Assertions: link for requests Annoucement can be seen in Requests sub Navbar
        link takes user to /Requests/Annoucement

      Writer: Philip Pavlick - 2/20/23 - SP 313
    -------------------------------------------------------------------T*/
    
    });

    test("AdminAnnoucement Navigation Testing ", async () => {
        render(
            <Requests/>,
            { wrapper: BrowserRouter},
        );
        const EventLink = screen.getByText("Announcements");
        expect (EventLink).toBeInTheDocument();
        expect (EventLink.href).toContain("/Announcements")


    
    
    });


});