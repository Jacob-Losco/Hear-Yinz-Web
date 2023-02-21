import React from 'react';
import {render, screen, fireEvent,} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Requests from "./Requests"

describe("Request Naviagtion testing", () => {

    test("AdminEvent Navigation Testing ", async () => {
        render(
            <Requests/>,
            { wrapper: BrowserRouter},
        );
        const EventLink = screen.getByText("Events");
        expect (EventLink).toBeInTheDocument();
        expect (EventLink.href).toContain("/Events")


    
    
    });

    test("AdminOfficer Navigation Testing ", async () => {
        render(
            <Requests/>,
            { wrapper: BrowserRouter},
        );
        const EventLink = screen.getByText("Officer");
        expect (EventLink).toBeInTheDocument();
        expect (EventLink.href).toContain("/Officer")


    
    
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