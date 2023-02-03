/*+===================================================================
File: DBFunctions.js

Summary: A set of functions that return formatted data from the database.

Exported Data Structures: fnInitSessionData - sets sInstituionId and sAccountId values. Necessary for calling other data functions
    fnGetOfficerOrganizations - returns the name and ids of all organizations that this account is an officer of

Exported Functions: fnInitSessionData - 

Contributors:
	Jacob Losco - 01/24/23 - SP-341

===================================================================+*/

import { oFirestore, oAuthentication } from "./firebase-config";
import { collection, getDocs, query, where} from "firebase/firestore";

export var sInstitutionId;
export var sAccountId;

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnInitSessionData

  Summary: sets the institution and account ids for database functions. MUST BE RUN BEFORE RUNNING OTHER DATABASE FUNCTIONS

  Args: None

  Returns: None
-------------------------------------------------------------------F*/
export async function fnInitSessionData() {
    fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A").then(result => {
        sInstitutionId = result;
        fnGetUserAccount(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A").then(result => {
            sAccountId = result;
        })
    })
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnGetInstitution

  Summary: returns the document id of the institution that this user is logged in to

  Args: sUserEmail - the email of the logged in user

  Returns: String - the firestore document id of the institution
-------------------------------------------------------------------F*/
async function fnGetInstitution(sUserEmail) {
    if(sUserEmail != "N/A") {
        const sUserHandle = "@" + sUserEmail.split("@")[1];
        const oInstitutionRefs = query(collection(oFirestore, "Institutions"), where("institution_handle", '==', sUserHandle));
        const oInstitutionDocs = await getDocs(oInstitutionRefs);
        if (oInstitutionDocs.docs.length > 0) {
            return oInstitutionDocs.docs[0].id;
        } else {
            return "Error No Documents";
        }
    } else {
        
        return "Error Invalid Login";
    }
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnGetUserAccount

  Summary: returns the document id of the account that the user is logged into

  Args: sUserEmail - the email of the logged in user

  Returns: String - the firestore document id of the account
-------------------------------------------------------------------F*/
async function fnGetUserAccount(sUserEmail) {
    if(sUserEmail != "N/A") {
        const oAccountRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Accounts"), where("account_email", "==", sUserEmail));
        const oAccountDocs = await getDocs(oAccountRefs);
        if (oAccountDocs.docs.length > 0) {
            return oAccountDocs.docs[0].id;
        } else {
            return "Error No Documents";
        }
    } else {
        return "Error Invalid Login";
    }
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnGetOfficerOrganizations

  Summary: returns a list of objects that contain basic information for all of the organizations that this account is an officer of

  Args: None

  Returns: [{}] - list of organization data
-------------------------------------------------------------------F*/
export async function fnGetOfficerOrganizations() {
    const aoOrganizationData = []
    const oAccountRelationshipRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Accounts", sAccountId, "Relationships"), where("relationship_type", "==", 0), where("relationship_status", "==", 2));
    const oAccountRelationshipDocs = await getDocs(oAccountRelationshipRefs);
    const aoOrganizationDictionary = await fnGetOrganizationDictionary();
    oAccountRelationshipDocs.docs.forEach(oAccountRelationshipDoc => {
        const oAccountRelationshipData = oAccountRelationshipDoc.data();
        aoOrganizationData.push({
            id : aoOrganizationDictionary[oAccountRelationshipData["relationship_org"]]["id"],
            name: aoOrganizationDictionary[oAccountRelationshipData["relationship_org"]]["name"]
        });
    });
    return aoOrganizationData;
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnGetOrganizationDictionary

  Summary: returns a dictionary that maps the reference of an organization document to data stored within it

  Args: None

  Returns: { documentReference -> {}} - organization data dictionary
-------------------------------------------------------------------F*/
async function fnGetOrganizationDictionary() {
    const aoOrganizationDictionary = {}
    const oOrganizationRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Organizations"));
    const oOrganizationDocs = await getDocs(oOrganizationRefs);
    oOrganizationDocs.docs.forEach(oOrganizationDoc => {
        const oOrganizationData = oOrganizationDoc.data();
        aoOrganizationDictionary[oOrganizationDoc.ref] = {
            id: oOrganizationDoc.id,
            name: oOrganizationData["organization_name"]
        };
    });
    return aoOrganizationDictionary;
}