
import { fnGetInstitutionReference } from "./DBFunctions";

test("fnGetInstitutionReference No Sign in", async () => {
    fnGetInstitutionReference("N/A").then(res => {
        expect(res).toEqual("Error Invalid Email")
    });
});