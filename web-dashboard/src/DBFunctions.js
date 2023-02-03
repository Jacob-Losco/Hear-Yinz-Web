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

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnGetOrganizationEvents

  Summary: returns a list of objects that contain information on all of the events within an organization

  Args: sOrganizationId - the id of the organization you want data for

  Returns: [{}] - list of event data
-------------------------------------------------------------------F*/
export async function fnGetOrganizationEvents(sOrganizationId) {
    const oEventRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId, "Events"));
    const oEventDocs = await getDocs(oEventRefs);
    return oEventDocs.docs.map((oEventDoc) => ({ ...oEventDoc.data() }));
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnGetOrganizationOfficers

  Summary: returns a list of objects that contain information on all of the officers of an organization

  Args: sOrganizationId

  Returns: [{}] - list of officer data
-------------------------------------------------------------------F*/
export async function fnGetOrganizationOfficers(sOrganizationId) {
    const aoOfficerData = [];
    const oOrganizationRef = doc(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId);
    const oOrganizationDoc = await getDoc(oOrganizationRef);
    const oAccountRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Accounts"));
    const oAccountDocs = await getDocs(oAccountRefs);
    for(const oAccountDoc of oAccountDocs.docs) {
        const oRelationshipRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Accounts", oAccountDoc.id, "Relationships"), where("relationship_org", "==", oOrganizationDoc.ref), where("relationship_type", "==", 0), where("relationship_status", "==", 2));
        const oRelationshipDocs = await getDocs(oRelationshipRefs);
        if(oRelationshipDocs.docs.length > 0) {
            aoOfficerData.push(oAccountDoc.data());
        }
    }
    return aoOfficerData;
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnGetRequests

  Summary: returns a list of objects that contain information on all events that have a pending status

  Args: None

  Returns: [{}] - list of event data
-------------------------------------------------------------------F*/
export async function fnGetRequests() {
    const aoRequestData = [];
    const oOrganizationRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Organizations"));
    const oOrganizationDocs = await getDocs(oOrganizationRefs);
    for(const oOrganizationDoc of oOrganizationDocs.docs) {
        const oEventRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Organizations", oOrganizationDoc.id, "Events"), where("event_status", "==", 1));
        const oEventDocs = await getDocs(oEventRefs);
        aoRequestData.push(oEventDocs.docs.map((oEventDoc) => ({ ...oEventDoc.data() })));
    }
    return aoRequestData;
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnGetReports

  Summary: returns a list of objects that contain information on all events that have at least one report made

  Args: None

  Returns: [{}] - list of event data
-------------------------------------------------------------------F*/
export async function fnGetReports() {
    const aoReportData = [];
    const oOrganizationRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Organizations"));
    const oOrganizationDocs = await getDocs(oOrganizationRefs);
    for(const oOrganizationDoc of oOrganizationDocs.docs) {
        const oEventRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Organizations", oOrganizationDoc.id, "Events"), where("event_reports", ">", 0));
        const oEventDocs = await getDocs(oEventRefs);
        aoReportData.push(oEventDocs.docs.map((oEventDoc) => ({ ...oEventDoc.data() })));
    }
    return aoReportData;
}