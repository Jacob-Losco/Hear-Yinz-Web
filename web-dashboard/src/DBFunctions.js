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
                fnGetLocations - returns a list of all locations in the institution

Contributors:
	Jacob Losco - 02/11/23 - SP-341

===================================================================+*/

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { oAuthentication, oFirestore, oStorage } from "./firebase-config";
import { collection, getDocs, query, where, doc, getDoc, addDoc, Timestamp, updateDoc, deleteDoc} from "firebase/firestore";

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
  Function: fnGetUserRole

  Summary: returns and int the indicates the role of the authenticated user, or indicates of a user is not authenticated

  Args: None

  Returns: Int - indicator of the user's highest level role in the system
    -1 - not logged in
    0 - standard user
    1 - officer
    2 - administrator
-------------------------------------------------------------------F*/
export async function fnGetUserRole() {
    if(oAuthentication.currentUser) {
        let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser.email);
        let sAccountId = await fnGetUserAccount(oAuthentication.currentUser.email);
        try {
            const oAccountDoc = await getDoc(doc(oFirestore, "Institutions", sInstitutionId, "Accounts", sAccountId));
            return oAccountDoc.data()["account_role"];
        } catch (error) {
            return -1;
        }
    } else {
        return -1;
    }
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnGetOfficerOrganizations

  Summary: returns a list of objects that contain basic information for all of the organizations that this account is an officer of

  Args: iAccountRole - the role of the user
    -1 - not logged in
    0 - standard user
    1 - officer
    2 - administrator

  Returns: [{}] - list of organization data
-------------------------------------------------------------------F*/
export async function fnGetOfficerOrganizations() {
    const aoOrganizationData = []
    let iAccountRole = await fnGetUserRole();
    if(iAccountRole > 0) {
        let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
        if(iAccountRole == 1) {
            let sAccountId = await fnGetUserAccount(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
            const oAccountRelationshipRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Accounts", sAccountId, "Relationships"), where("relationship_type", "==", 0), where("relationship_status", "==", 2));
            const oAccountRelationshipDocs = await getDocs(oAccountRelationshipRefs);
            const aoOrganizationDictionary = await fnGetOrganizationDictionary(sInstitutionId);
            oAccountRelationshipDocs.docs.forEach(oAccountRelationshipDoc => {
                const oAccountRelationshipData = oAccountRelationshipDoc.data();
                aoOrganizationData.push({
                    id : aoOrganizationDictionary[oAccountRelationshipData["relationship_org"]]["id"],
                    name: aoOrganizationDictionary[oAccountRelationshipData["relationship_org"]]["name"],
                    image: aoOrganizationDictionary[oAccountRelationshipData["relationship_org"]]["image"],
                    lastedit: aoOrganizationDictionary[oAccountRelationshipData["relationship_org"]]["lastedit"],
                    description: aoOrganizationDictionary[oAccountRelationshipData["relationship_org"]]["description"]
                });
            });
        } else if (iAccountRole == 2) {
            const oOrganizationRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Organizations"));
            const oOrganizationDocs = await getDocs(oOrganizationRefs);
            for(var i = 0; i < oOrganizationDocs.docs.length; i++) {
                const oOrganizationData = oOrganizationDocs.docs[i].data();
                var oOrganizationImage;
                try{
                    const oOrganizationStorageReference = ref(oStorage, "images/" + sInstitutionId + "/" + oOrganizationDocs.docs[i].id + "/" + oOrganizationDocs.docs[i].id + ".png");
                    oOrganizationImage = await fnGetImage(oOrganizationStorageReference);
                }
                catch {
                    const oInstitutionStorageReference = ref(oStorage, "images/" + sInstitutionId + "/" + sInstitutionId + ".png");
                    oOrganizationImage = await fnGetImage(oInstitutionStorageReference);
                }
                aoOrganizationData.push ({
                    id: oOrganizationDocs.docs[i].id,
                    name: oOrganizationData["organization_name"],
                    image: oOrganizationImage,
                    lastedit: oOrganizationData["organization_lastedit"],
                    description: oOrganizationData["organization_description"]
                });
            }
        }
    }
    return aoOrganizationData;
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnGetOrganizationDictionary

  Summary: returns a dictionary that maps the reference of an organization document to data stored within it

  Args: None

  Returns: { documentReference -> {}} - organization data dictionary
-------------------------------------------------------------------F*/
async function fnGetOrganizationDictionary(sInstitutionId) {
    const aoOrganizationDictionary = {};
    const oOrganizationRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Organizations"));
    const oOrganizationDocs = await getDocs(oOrganizationRefs);
    for(var i = 0; i < oOrganizationDocs.docs.length; i++) {
        const oOrganizationData = oOrganizationDocs.docs[i].data();
        var oOrganizationImage;
        try{
            const oOrganizationStorageReference = ref(oStorage, "images/" + sInstitutionId + "/" + oOrganizationDocs.docs[i].id + "/" + oOrganizationDocs.docs[i].id + ".png");
            oOrganizationImage = await fnGetImage(oOrganizationStorageReference);
        }
        catch {
            const oInstitutionStorageReference = ref(oStorage, "images/" + sInstitutionId + "/" + sInstitutionId + ".png");
            oOrganizationImage = await fnGetImage(oInstitutionStorageReference);
        }
        aoOrganizationDictionary[oOrganizationDocs.docs[i].ref] = {
            id: oOrganizationDocs.docs[i].id,
            name: oOrganizationData["organization_name"],
            image: oOrganizationImage,
            lastedit: oOrganizationData["organization_lastedit"],
            description: oOrganizationData["organization_description"]
        };
    }
    return aoOrganizationDictionary;
}

async function fnGetImage(oReference) {
    try {
        return Promise.resolve(getDownloadURL(oReference));
    } catch {
        return null;
    }
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnGetOrganizationEvents

  Summary: returns a list of objects that contain information on all of the events within an organization

  Args: sOrganizationId - the id of the organization you want data for

  Returns: [{}] - list of event data
-------------------------------------------------------------------F*/
export async function fnGetOrganizationEvents(sOrganizationId) {
    const aoEventList = [];
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    const oEventRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId, "Events"));
    const oEventDocs = await getDocs(oEventRefs);
    for(const oEventDoc of oEventDocs.docs) {
        const oEventData = oEventDoc.data();
        const oLocationRef = doc(oFirestore, "Institutions", sInstitutionId, "Locations", oEventData["event_location"]);
        const oLocationDoc = await getDoc(oLocationRef);
        aoEventList.push({
            ...oEventDoc.data(),
            event_id: oEventDoc.id,
            location: oLocationDoc.data()
        });
    }
    return aoEventList;
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
            aoOfficerData.push({
                ...oAccountDoc.data(),
                account_id: oAccountDoc.id
            });
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
        for(const oEventDoc of oEventDocs.docs) {
            const oEventData = oEventDoc.data();
            const oLocationRef = doc(oFirestore, "Institutions", sInstitutionId, "Locations", oEventData["event_location"]);
            const oLocationDoc = await getDoc(oLocationRef);
            aoRequestData.push({
                ...oEventDoc.data(),
                event_id: oEventDoc.id,
                host_id: oOrganizationDoc.id,
                host: oOrganizationDoc.data(),
                location: oLocationDoc.data()
            })
        }
    }
    return aoRequestData;
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnHandleEventRequest

  Summary: Updates the status of an event based on user input

  Args: sEventId - the document id of the event being updated
    bApproved - true if the event is approved, false otherwise

  Returns: None if successful, error message if failure
-------------------------------------------------------------------F*/
export async function fnHandleEventRequest(sOrganizationId, sEventId, bApproved) {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    try {
        const oEventDoc = doc(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId, "Events", sEventId);
        updateDoc(oEventDoc, {
            event_status: bApproved ? 2 : 3,
        });
    } catch (error) {
        console.error("Error editing document: ", error);
    }
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnGetAnnouncementRequests

  Summary: returns a list of objects that contain information on all announcements that have a pending status

  Args: None

  Returns: [{}] - list of announcement data
-------------------------------------------------------------------F*/
export async function fnGetAnnouncementRequests() {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    const aoRequestData = [];
    const oOrganizationRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Organizations"));
    const oOrganizationDocs = await getDocs(oOrganizationRefs);
    for(const oOrganizationDoc of oOrganizationDocs.docs) {
        const oAnnouncementRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Organizations", oOrganizationDoc.id, "Announcements"), where("announcement_status", "==", 1));
        const oAnnouncementDocs = await getDocs(oAnnouncementRefs);
        for(const oAnnouncementDoc of oAnnouncementDocs.docs) {
            aoRequestData.push({
                ...oAnnouncementDoc.data(),
                announcement_id: oAnnouncementDoc.id,
                host_id: oOrganizationDoc.id,
                host: oOrganizationDoc.data()
            });
        }
    }
    return aoRequestData;
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnHandleAnnouncementRequest

  Summary: Updates the status of an announcement based on user input

  Args: sOrganizationId: the id of the organization associated with the request 
    sAnnouncementId - the document id of the announcement being updated
    bApproved - true if the event is approved, false otherwise

  Returns: None if successful, error message if failure
-------------------------------------------------------------------F*/
export async function fnHandleAnnouncementRequest(sOrganizationId, sAnnouncementId, bApproved) {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    try {
        const oAnnouncementDoc = doc(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId, "Announcements", sAnnouncementId);
        updateDoc(oAnnouncementDoc, {
            announcement_status: bApproved ? 2 : 3,
        });
    } catch (error) {
        console.error("Error editing document: ", error);
    }
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnGetOfficerRequests

  Summary: returns a list of objects that contain information on all officers that have a pending status

  Args: None

  Returns: [{}] - list of account data
-------------------------------------------------------------------F*/
export async function fnGetOfficerRequests() {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    const aoRequestData = [];
    const oAccountRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Accounts"));
    const oAccountDocs = await getDocs(oAccountRefs);
    for (const oAccountDoc of oAccountDocs.docs) {
        const oAccountData = oAccountDoc.data();
        const oRelationshipRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Accounts", oAccountDoc.id, "Relationships"), where("relationship_type", "==", 0), where("relationship_status", "==", 1));
        const oRelationshipDocs = await getDocs(oRelationshipRefs);
        if(oRelationshipDocs.docs.length > 0) {
            for(const oRelationshipDoc of oRelationshipDocs.docs) {
                const oRelationshipData = oRelationshipDoc.data();
                const oOrganizationDoc = await getDoc(oRelationshipData["relationship_org"]);
                const oOrganizationData = oOrganizationDoc.data();
                aoRequestData.push({ account_name: oAccountData["account_email"], account_id: oAccountDoc.id, organization_name: oOrganizationData["organization_name"], officer_relationship_id: oRelationshipDoc.id })
            }
        }
    }
    return aoRequestData;
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnHandleOfficerRequest

  Summary: Updates the status of an officer based on user input

  Args: sAccountId - the document id of the account being updated
    sRelationshipId - the document id of the officer relationship being approved
    bApproved - true if the officer is approved, false otherwise

  Returns: None if successful, error message if failure
-------------------------------------------------------------------F*/
export async function fnHandleOfficerRequest(sAccountId, sRelationshipId, bApproved) {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    try {
        const oRelationshipDoc = doc(oFirestore, "Institutions", sInstitutionId, "Accounts", sAccountId, "Relationships", sRelationshipId);
        updateDoc(oRelationshipDoc, {
            relationship_status: bApproved ? 2 : 3,
        });
    } catch (error) {
        console.error("Error editing document: ", error);
    }
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
        if(oEventDocs.docs.length > 0) {
            for(const oEventDoc of oEventDocs.docs) {
                const oEventData = oEventDoc.data();
                const oLocationRef = doc(oFirestore, "Institutions", sInstitutionId, "Locations", oEventData["event_location"]);
                const oLocationDoc = await getDoc(oLocationRef);
                aoReportData.push({
                    ...oEventDoc.data(),
                    event_id: oEventDoc.id,
                    host_id: oOrganizationDoc.id,
                    host: oOrganizationDoc.data(),
                    location: oLocationDoc.data()
                });
            }
        }
    }
    return aoReportData;
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnHandleEventReport

  Summary: Updates the status of an event based on user input

  Args: sOrganizationId - the document id of the organization with the event
    sEventId - the document id of the event being updated
    bToBeRemoved - true if the event needs to be removed, false otherwise

  Returns: None if successful, error message if failure
-------------------------------------------------------------------F*/
export async function fnHandleEventReport(sOrganizationId, sEventId, bToBeRemoved) {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    try {
        const oEventDoc = doc(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId, "Events", sEventId);
        if (bToBeRemoved) {
            updateDoc(oEventDoc, {
                event_status: 4,
                event_reports: 0,
            });
        } else {
            updateDoc(oEventDoc, {
                event_reports: 0,
            });
        }
    } catch (error) {
        console.error("Error editing document: ", error);
    }
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
            try {
                const newDocRef = await addDoc(collection(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId, "Events"), {
                  event_name: oNewEvent.event_name,
                  event_description: oNewEvent.event_description,
                  event_status: oNewEvent.event_status,
                  event_timestamp: Timestamp.fromDate(oNewEvent.event_timestamp),
                  event_location: oNewEvent.event_location,
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
                await addDoc(collection(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId, "Announcements"), {
                  announcement_message: oNewAnnouncement.announcement_message,
                  announcement_status: oNewAnnouncement.announcement_status,
                  announcement_timestamp: Timestamp.fromDate(oNewAnnouncement.announcement_timestamp)
                });
            } catch (error) {
                console.error("Error adding document: ", error);
                return "Error adding document...";
            }
    } else {
        return "Error: invalid object parameter";
    }
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnUpdateEvent

  Summary: Updates an event in database based off of passed in information

  Args: sOrganizationId - a string the contains the id for the current organization
    sEventId - a string that contains the id of the event being updated
    oNewEvent - an object that contains all of the information about
    the new event, it should be organized as follows:
        event_description - string
        event_name - string
        event_status - 0 if private, 1 if public (int)
        event_timestamp - timestamp
        event_location - id of location chosen (string)

  Returns: None if successful, error message if failue
-------------------------------------------------------------------F*/
export async function fnUpdateEvent(sOrganizationId, sEventId, oNewEvent) {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    if(oNewEvent.event_description !== null &&
        oNewEvent.event_name !== null &&
        oNewEvent.event_status !== null &&
        oNewEvent.event_timestamp !== null &&
        oNewEvent.event_location !== null) {
            const oLocationRef = doc(oFirestore, "Institutions", sInstitutionId, "Locations", oNewEvent.event_location);
            // const oLocationDoc = await getDoc(oLocationRef);
            try {
                const oEventDoc = doc(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId, "Events", sEventId);
                updateDoc(oEventDoc, {
                    event_name: oNewEvent.event_name,
                    event_description: oNewEvent.event_description,
                    event_status: oNewEvent.event_status,
                    event_timestamp: Timestamp.fromDate(oNewEvent.event_timestamp),
                    event_location: oNewEvent.event_location,
                    event_likes: 0,
                    event_reports: 0  
                });
            } catch (error) {
                console.error("Error adding document: ", error);
                return "Error adding document";
            }
    } else {
        return "Error: invalid object parameter";
    }
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnDeleteEvent

  Summary: Deletes an event from the database

  Args: sOrganizationId - the document id of the organization
    sEventId - the document id of the event

  Returns: None if successful, error message if failue
-------------------------------------------------------------------F*/
export async function fnDeleteEvent(sOrganizationId, sEventId) {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    try {
        await deleteDoc(doc(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId, "Events", sEventId));
    } catch (error) {
        console.error("Error deleting document: ", error);
        return "Error deleting document: ";
    }
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnAddOfficer

  Summary: Creates a officer relationship between an account and the current organization

  Args: sOrganizationId - a string the contains the id for the current organization
    sAccountEmail - an email meant to link to an account

  Returns: None if successful, error message if failue
-------------------------------------------------------------------F*/
export async function fnAddOfficer(sOrganizationId, sAccountEmail) {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    const oAccountRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Accounts"), where("account_email", "==", sAccountEmail));
    const oAccountDocs = await getDocs(oAccountRefs);
    if(oAccountDocs.docs.length > 0) {
        const sAccountId = oAccountDocs.docs[0].id;
        try {
            const newDocRef = await addDoc(collection(oFirestore, "Institutions", sInstitutionId, "Accounts", sAccountId, "Relationships"), {
                relationship_org: doc(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId),
                relationship_status: 1,
                relationship_type: 0
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    } else {
        return "Error Invalid Email";
    }
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnRemoveOfficer

  Summary: Deletes an officer relationship between an account and the current organization

  Args: sOrganizationId - a string the contains the id for the current organization
    sAccountEmail - an email meant to link to an account

  Returns: None if successful, error message if failue
-------------------------------------------------------------------F*/
export async function fnRemoveOfficer(sOrganizationId, sAccountEmail) {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    const oOrganizationRef = doc(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId)
    const oAccountRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Accounts"), where("account_email", "==", sAccountEmail));
    const oAccountDocs = await getDocs(oAccountRefs);
    if(oAccountDocs.docs.length > 0) {
        const sAccountId = oAccountDocs.docs[0].id;
        const oRelationshipRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Accounts", sAccountId, "Relationships"), where("relationship_org", "==", oOrganizationRef), where("relationship_type", "==", 0));
        const oRelationshipDocs = await getDocs(oRelationshipRefs);
        await deleteDoc(oRelationshipDocs.docs[0].ref);
    } else {
        return "Error No Account for Email";
    }
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnGetLocations

  Summary: Gets a list of all locations for institution user is logged into

  Args: None

  Returns: [{}] - list of objects with location data
-------------------------------------------------------------------F*/
export async function fnGetLocations() {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    var aoLocationData = [];
    const oLocationRefs = query(collection(oFirestore, "Institutions", sInstitutionId, "Locations"));
    const oLocationDocs = await getDocs(oLocationRefs);
    for(const oLocationDoc of oLocationDocs.docs) {
        aoLocationData.push({
            ...oLocationDoc.data(),
            location_id: oLocationDoc.id
        });
    }
    return aoLocationData;
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnUpdateOrganizationImage

  Summary: Updates this organizations image with a new image

  Args: oNewImage - the file to be uploaded
        sOrganizationId - the document id associated with this organization

  Returns: None if successful, error message if false
-------------------------------------------------------------------F*/
export async function fnUpdateOrganizationImage(oNewImage, sOrganizationId) {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    const oOrganizationStorageReference = ref(oStorage, "images/" + sInstitutionId + "/" + sOrganizationId + "/" + sOrganizationId + ".png");
    try {
        await uploadBytes(oOrganizationStorageReference, oNewImage);
        fnUpdateOrganizationLastEdit(sInstitutionId, sOrganizationId);
    } catch {
        oOrganizationStorageReference = ref(oStorage, "images/" + sInstitutionId + "/" + sOrganizationId);
        try {
            await uploadBytes(oOrganizationStorageReference, oNewImage);
            fnUpdateOrganizationLastEdit(sInstitutionId, sOrganizationId);
        } catch {
            return "Error uploading image";
        }
    }
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnUpdateOrganizationDescription

  Summary: Updates this organizations description

  Args: sNewOrganizationDescription - the new description
        sOrganizationId - the document id associated with this organization

  Returns: None if successful, error message if false
-------------------------------------------------------------------F*/
export async function fnUpdateOrganizationDescription(sNewOrganizationDescription, sOrganizationId) {
    let sInstitutionId = await fnGetInstitution(oAuthentication.currentUser ? oAuthentication.currentUser.email : "N/A");
    try {
        const oOrganizationDoc = doc(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId);
        updateDoc(oOrganizationDoc, {
            organization_description: sNewOrganizationDescription
        });
        fnUpdateOrganizationLastEdit(sInstitutionId, sOrganizationId);
    } catch (error) {
        console.error("Error editing document: ", error);
    }
}

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnUpdateOrganizationDescription

  Summary: Updates this organizations lastedit timestamp

  Args: sInstitutionId - the document id associated with this institution
        sOrganizationId - the document id associated with this organization

  Returns: None if successful, error message if false
-------------------------------------------------------------------F*/
export async function fnUpdateOrganizationLastEdit(sInstitutionId, sOrganizationId) {
    try {
        const oOrganizationDoc = doc(oFirestore, "Institutions", sInstitutionId, "Organizations", sOrganizationId);
        updateDoc(oOrganizationDoc, {
            organization_lastedit: Timestamp.fromDate(new Date())
        });
    } catch (error) {
        console.error("Error editing document: ", error);
    }
}