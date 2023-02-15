import {render, screen, fireEvent} from "@testing-library/react";
import React from "react";
import Organizations from "./Organizations";

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Organization Name is populated

      Target: Organizations

      Assertions: no input. 

      Writer: Sam Merlin
    -------------------------------------------------------------------T*/
    test("Organizations populated ", async () => {
        render(<Organizations />);
        const orgName = screen.getByText(/teststatic_org1/i)
        expect(orgName).toBeInTheDocument();
    });