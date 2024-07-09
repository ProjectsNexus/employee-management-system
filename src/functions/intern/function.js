import { getDocs, collection, doc, updateDoc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { RecentProject } from "../../data/projectData";
import { useContext } from "react";
import StateContext from "../context/usecontext";
import { Description, Refresh } from "@mui/icons-material";
import { UserProfile } from "../../data/UserData";
import { NotificationHander, getUserData } from "../auth";


export const getProjects = async (setProjectData) => {
    const companyName = auth.currentUser.displayName;
    const querySnapshot = await getDocs(collection(db, companyName, "Projects", "NewProjects"));
    querySnapshot.forEach(() => {
        const Data = querySnapshot.docs.map((doc) => ({key: doc.id, data: doc.data()}));
        setProjectData(Data);
    });
}

export const AcquireProject = async (setProjectData) => {
    const companyName = auth.currentUser.displayName;
    const AcquiresquerySnapshot = await getDocs(collection(db, companyName, auth.currentUser.uid, "AcquireProjects"));
    AcquiresquerySnapshot.forEach(() => {
        const Data = AcquiresquerySnapshot.docs.map((doc) => ({key: doc.id, data: doc.data()}));
        setProjectData(Data);
    });
    }
    
export const UpdateProjectStatus = async (key) => {
    const companyName = auth.currentUser.displayName;
    const ProjectData = doc(db, companyName, "Projects", "NewProjects" , key);
        // Set the "capital" field of the city 'DC'
    
    const UpdatedData =  await getDoc(ProjectData);
    const DataWhichUpdated = UpdatedData.data();

    const InternProjectRef = doc(collection(db, companyName, auth.currentUser.uid, 'AcquireProjects'));
    await setDoc(InternProjectRef, {
        ProjectName: DataWhichUpdated.ProjectName,
        Description: DataWhichUpdated.Description,
        Department: DataWhichUpdated.Department,
        Deadline: DataWhichUpdated.Deadline,
        Attachment: DataWhichUpdated.Attachment,
        ResourcesLink: DataWhichUpdated.ResourcesLink,
        Status: 1,
        Key: UpdatedData.id,
    })
    
    //Updata General Project Data
    
    await updateDoc(ProjectData, {
        Status: 1,
        Internuid: auth.currentUser.uid,
        InternId: InternProjectRef.id
    });
    
    NotificationHander(null, null, 'New Project Assigned', "A new project has been assigned and is ready for you to start working on. Please review the project details and begin your tasks.")
}
        
export const CompletedProjectStatus = async (values, Setmessage) => {
    const key = values.project;
    const companyName = auth.currentUser.displayName;
    const DataDocSnapshort = (await getDoc( doc(collection(db, companyName, auth.currentUser.uid, 'AcquireProjects'), key))).data();
    const Prekey = DataDocSnapshort.Key;
    const ProjectName = DataDocSnapshort.ProjectName;

    const ProjectData = doc(db, companyName, "Projects", "NewProjects" , Prekey);
    // updata the porject Status'
    await updateDoc(ProjectData, {
        Status: 2
    });


    await updateDoc(doc(db, companyName, auth.currentUser.uid, 'AcquireProjects', key), {
        Status: 2
    })

    await addDoc(collection(db, companyName, "Projects", "SubmitedProjects"), {
        ProjectName: ProjectName,
        Description: values.description,
        url: values.url,
        Attachment: values.media,
        InternDocid: key,
        InternUid: auth.currentUser.uid,
        Accpetor: UserProfile.at(0).FirstName + ' ' + UserProfile.at(0).LastName,
        verified: false
    }).then(() => {
        Setmessage(ProjectName + " is Successfully Submited")
        NotificationHander('New Project for Review', 'A project has been submitted for your review. Please to evaluate the submission and provide feedback.', 'Project Submitted for Review', 'Your project has been successfully submitted for review. Please wait for feedback from the admin and be ready to make any necessary adjustments.')
    })
    .catch((error) => {
        Setmessage("Error! " + error.message)
    });
}

export const UpdateNofiticationStatus = async (key) => {
    const companyName = auth.currentUser.displayName;

    if (UserProfile.at(0).IsAdmin) {
        await updateDoc(doc(collection(db, companyName, "Notification", "Admin"), key), {
            status: 1,
        });
    } else {
        await updateDoc(doc(collection(db, companyName, "Notification", "Empolyee"), key), {
            status: 1,
        });
    } 

    getUserData();
    
}