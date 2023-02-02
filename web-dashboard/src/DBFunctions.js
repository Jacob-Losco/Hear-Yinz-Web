import { oFirestore, oAuthentication } from "./firebase-config";
import { collection, getDocs, doc, query, where} from "firebase/firestore";

export var sInstitutionId;
export var sAccountId;

export async function fnInitSessionData() {
    sInstitutionId = "cT8cVHg6O0QxE9vOodNM";
    sAccountId = "GA5qa9h3tkrv0FtAi9Uq";
    fnGetOfficerOrganizations();
}

async function fnSetInstitution(sUserEmail) {
    if(sUserEmail != "N/A") {
        const sUserHandle = "@" + sUserEmail.split("@")[1];
        const oInstitutions = query(collection(oFirestore, "Institutions"), where("institution_handle", '==', sUserHandle));
        getDocs(oInstitutions).then(
            function(value) {
                return value.docs[0].id;
            }, function(error) {
                return "Error No Matching Institution";
            }
        );
    } else {
        return "Error Invalid Login";
    }
}

function fnGetUserAccount(sUserEmail) {
    if(sUserEmail != "N/A") {
        const oAccounts = query(collection(oFirestore, "Institutions", sInstitutionId, "Accounts"), where("account_email", "==", sUserEmail));
        getDocs(oAccounts).then(
            function(value) {
                console.log(value.docs[0].id);
                return value.docs[0].id;
            }, function(error) {
                return "Error No Matching User Account";
            }
        );
    } else {
        return "Error Invalid Login";
    }
}

function fnGetOfficerOrganizations() {
    const oAccountReference = doc(oFirestore, "Institutions", sInstitutionId, "Accounts", sAccountId);
}