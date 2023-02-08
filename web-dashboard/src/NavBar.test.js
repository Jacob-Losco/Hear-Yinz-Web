
import React from 'react';
import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar'

describe("NavBar naviation link testing", () => {

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Organizations page link testing

      Target: Navbar

      Assertions: link can be seen in navbar
        link takes user to /Organizations

      Writer: Phil Pavlick
    -------------------------------------------------------------------T*/
    test("Organizations page link testing ", async () => {
        render(<NavBar />, { wrapper: BrowserRouter });
        const organizationsLink = screen.getByText("Organizations");
        expect(organizationsLink).toBeInTheDocument();
        expect(organizationsLink.href).toContain("/Organizations");
    });

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Requests page link testing

      Target: Navbar

      Assertions: link can be seen in navbar
        link takes user to /Requests

      Writer: Phil Pavlick
    -------------------------------------------------------------------T*/
    test("Requests page link testing", async () => {
        render(<NavBar />, { wrapper: BrowserRouter });
        const organizationsLink = screen.getByText("Requests");
        expect(organizationsLink).toBeInTheDocument();
        expect(organizationsLink.href).toContain("/Requests");
    });

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Reports page link testing

      Target: Navbar

      Assertions: link can be seen in navbar
        link takes user to /Organizations

      Writer: Phil Pavlick
    -------------------------------------------------------------------T*/
    test("Reports page link testing", async () => {
        render(<NavBar />, { wrapper: BrowserRouter });
        const organizationsLink = screen.getByText("Reports");
        expect(organizationsLink).toBeInTheDocument();
        expect(organizationsLink.href).toContain("/Reports");
    });
});



