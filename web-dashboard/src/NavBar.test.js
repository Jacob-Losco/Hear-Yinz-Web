
import React from 'react';
import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar'



describe("NavBar naviation link testing", () => {

    test("Organizations page link testing ", async () => {
        render(<NavBar />, { wrapper: BrowserRouter });
        const organizationsLink = screen.getByText("Organizations");
        expect(organizationsLink).toBeInTheDocument();
        expect(organizationsLink.href).toContain("/Organizations");
    });

    test("Requests page link testing", async () => {
        render(<NavBar />, { wrapper: BrowserRouter });
        const organizationsLink = screen.getByText("Requests");
        expect(organizationsLink).toBeInTheDocument();
        expect(organizationsLink.href).toContain("/Requests");
    });

    test("Reports page link testing", async () => {
        render(<NavBar />, { wrapper: BrowserRouter });
        const organizationsLink = screen.getByText("Reports");
        expect(organizationsLink).toBeInTheDocument();
        expect(organizationsLink.href).toContain("/Reports");
    });

    test("Logout page link testing", async () => {
        render(<NavBar />, { wrapper: BrowserRouter });
        const organizationsLink = screen.getByText("Logout");
        expect(organizationsLink).toBeInTheDocument();
        expect(organizationsLink.href).toContain("/Logout");
    });
});



