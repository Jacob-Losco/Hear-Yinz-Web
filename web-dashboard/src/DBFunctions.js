/*+===================================================================
File: DBFunctions.js

Summary: A set of functions that return formatted data from the database.

Exported Data Structures: None

Exported Functions: fnInitSessionData - sets the variables necessary to run other database functions
                fnGetOfficerOrganizations - returns a list of all organizations that the account is an officer of
                fnGetOrganizationEvents - returns a list of all events for an organization
                fnGetOrganizationOfficers  - returns a list of all accounts that are officers of an organization
                fnGetEventRequests - returns all events that are pending approval
                fnGetEventReports - returns all events that have at least one report
                fnCreateEvent - creates event based on parameterized data
                fnCreateAnnouncement - creates announcement based on parameterized data

Contributors:
	Jacob Losco - 01/24/23 - SP-341

===================================================================+*/

import { oFirestore, oAuthentication } from "./firebase-config";
import { collection, getDocs, query, where, doc, getDoc, addDoc, Timestamp} from "firebase/firestore";

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
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
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
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    let sAccountId = await fnGetUserAccount(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    const aoOrganizationData = []
    const oAccountRelationshipRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Accounts", sAccountId, "Relationships"), where("relationship_type", "==", 0), where("relationship_status", "==", 2));
    const oAccountRelationshipDocs = await getDocs(oAccountRelationshipRefs);
    const aoOrganizationDictionary = await fnGetOrganizationDictionary(sInstitutionId);
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
async function fnGetOrganizationDictionary(sInstitutionId) {
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
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
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
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
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
  Function: fnGetEventRequests

  Summary: returns a list of objects that contain information on all events that have a pending status

  Args: None

  Returns: [{}] - list of event data
-------------------------------------------------------------------F*/
export async function fnGetEventRequests() {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
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
  Function: fnGetEventReports

  Summary: returns a list of objects that contain information on all events that have at least one report made

  Args: None

  Returns: [{}] - list of event data
-------------------------------------------------------------------F*/
export async function fnGetEventReports() {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
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

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnCreateEvent

  Summary: Creates an event in database based off of passed in information

  Args: sOrganizationId - a string the contains the id for the current organization
    oNewEvent - an object that contains all of the information about
    the new event, it should be organized as follows:
        event_description - string
        event_name - string
        event_status - 0 if private, 1 if public (int)
        event_timestamp - timestamp
        event_location - id of location chosen (string)

  Returns: None if successful, error message if failue
-------------------------------------------------------------------F*/
export async function fnCreateEvent(sOrganizationId, oNewEvent) {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    if(oNewEvent.event_description !== null &&
        oNewEvent.event_name !== null &&
        oNewEvent.event_status !== null &&
        oNewEvent.event_timestamp !== null &&
        oNewEvent.event_location !== null) {
            const oLocationRef = doc(oFirestore, "Institutions", sInstitutionId, "Locations", oNewEvent.event_location);
            const oLocationDoc = await getDoc(oLocationRef);
            try {
                const newDocRef = await addDoc(collection(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId, "Events"), {
                  event_name: oNewEvent.event_name,
                  event_description: oNewEvent.event_description,
                  event_status: oNewEvent.event_status,
                  event_timestamp: Timestamp.fromDate(oNewEvent.event_timestamp),
                  event_location: oLocationDoc.ref,
                  event_likes: 0,
                  event_reports: 0   
                });
            } catch (error) {
                console.error("Error adding document: ", error);
            }
    } else {
        return "Error: invalid object parameter";
    }
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnCreateAnnouncement

  Summary: Creates an announcement in database based off of passed in information

  Args: sOrganizationId - a string the contains the id for the current organization
    oNewAnnouncement - an object that contains all of the information about
    the new announcement, it should be organized as follows:
        announcement_message - string
        announcement_status - 0 if private, 1 if public (int)
        announcement_timestamp - the current time

  Returns: None if successful, error message if failue
-------------------------------------------------------------------F*/
export async function fnCreateAnnouncement(sOrganizationId, oNewAnnouncement) {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    if(oNewAnnouncement.announcement_message !== null &&
        oNewAnnouncement.announcement_status !== null &&
        oNewAnnouncement.announcement_timestamp !== null) {
            try {
                const newDocRef = await addDoc(collection(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId, "Announcements"), {
                  announcement_name: oNewAnnouncement.announcement_message,
                  announcement_status: oNewAnnouncement.announcement_status,
                  announcement_timestamp: Timestamp.fromDate(oNewAnnouncement.announcement_timestamp)
                });
            } catch (error) {
                console.error("Error adding document: ", error);
            }
    } else {
        return "Error: invalid object parameter";
    }
}