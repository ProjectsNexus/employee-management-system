//imports
import { deleteUser, reload } from "firebase/auth";
import { Intern, NewPorjects, UserProfile } from "../../data/UserData";
import { auth, db } from "../firebase/config"
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore"; 
import { NotificationHander } from "../auth";

// //Get UserData 
// export const getUserData = async () => {
  
//   const uid = auth.currentUser.uid;
//   const companyName = auth.currentUser.displayName;
  
//   // User Profile
//   const userCollectionRef = collection(db, companyName, uid, "Profile");
//   const userDocSnapshot = await getDocs(userCollectionRef);
//   const profile = [];
//   userDocSnapshot.forEach((doc) => {
//     UserProfile.push(doc.data());
//   });
  
//   //Intern Data
//   const InternCollectionRef = collection(db, companyName);
//   const InternDocSnapshot = await getDocs(InternCollectionRef);
//   const InternData = [];
//   InternDocSnapshot.forEach((doc) => {
//     InternData.push({key: doc.id , data: doc.data()});
//   });
//   Intern.push(InternData);
//   return UserProfile, Intern;
// }

//Verified Projects
export const VerifiedProject =  async (key, setMessage, verified, setloading) => {
  const CompanyName = auth.currentUser.displayName; 
  setMessage('');
  setloading(true);
  try {
    const projectDocRef = doc(db, CompanyName,  'Projects', 'SubmitedProjects', key);
    
    if (verified == false) {
      const projectSanpshot = await getDoc(projectDocRef);
      const Internuid = projectSanpshot.data().InternUid;
      const internDocid = projectSanpshot.data().InternDocid;
      console.log(Internuid);
      
      const internAcquiredDocRef = doc(db, CompanyName, Internuid, 'AcquireProjects', internDocid); 
      
      const internAcquiredSnapShot = await getDoc(internAcquiredDocRef);
      const GerneralProjectkey = internAcquiredSnapShot.data().Key;

      await updateDoc(doc(db, CompanyName, 'Projects', 'NewProjects', GerneralProjectkey), {
        Status: 3
      })

      await updateDoc(internAcquiredDocRef, {
        Status: 3
      })
        
      await updateDoc(projectDocRef, {
        verified: true
      })
      
      setloading(false);
      setMessage('Project Verified')

      
      NotificationHander(NULL, null, 'Project Verified', 'We are pleased to inform you that your project has been successfully verified. Congratulations on completing this milestone!')
    }
  } catch (error) {
    setMessage('Project Already Verified')
    console.log(error); 
    setloading(false);
  }
}

//Change Accesss Level
export const ChangeAccessLevel = (key, accountstatus, companyName, setAlertMessage) => {
  const internDocRef = doc(db, companyName, key);
  if (accountstatus === 0) {
    updateDoc(internDocRef, {
      accountStatus: 1
    })
    setAlertMessage("Disabled Accounts!")
  } else {
    updateDoc(internDocRef, {
      accountStatus: 0
    })
    setAlertMessage("Active Accounts!")
  }
}


  //upload function
  export const uploadTask = async (values, setMessage, setOpen) => {
    try {
      const CompanyName = auth.currentUser.displayName;
      setMessage('');
      setOpen(true);
      // Reference to the company document
      const companyDocRef = doc(db, CompanyName, "Projects");
      
      // Reference to the subcollection "NewProjects" within the company document
      const projectDocRef = doc(collection(companyDocRef, "NewProjects"));

      await setDoc(projectDocRef, {
        id: projectDocRef.id,
        ProjectName: values.projectname,
        Deadline: values.deadline,
        Department: values.dept,
        Description: values.description,
        ResourcesLink: values.url,
        Attachment: values.media,
        Status: 0,
      });
      await NotificationHander(null, null, 'New Project Available', 'A new project is now available for you to take on! Please  review the details and begin working on the project tasks.')
      setOpen(false);
      setMessage("Congratulations! Project Details Successfully Uploaded.");
    } catch (e) {
      if (e.code === 'Error! The value of property "Attachment" is longer than 1048487 bytes.') {
        setMessage('Error! The value of property "Attachment" is longer than 1 Mb')
      } else(
        setMessage(`Error! ${e.message}`)
      )
    }

    
  };

  export const UpdateProject = async (values, setMessage, setOpen, Data) => {
    try {
      const CompanyName = auth.currentUser.displayName;
      setMessage('');
      setOpen(true);
      // Reference to the company document
      const companyDocRef = doc(db, CompanyName, "Projects");
      
      // Reference to the subcollection "NewProjects" within the company document
      const projectDocRef = doc(collection(companyDocRef, "NewProjects"), Data.key);

      await updateDoc(projectDocRef, {
        ProjectName: values.projectname,
        Deadline: values.deadline,
        Department: values.dept,
        Description: values.description,
        ResourcesLink: values.url,
        Attachment: values.media,
        Status: Data.Status,
      });
      setOpen(false);
      // setMessage("Congratulations! Project Details Successfully Uploaded.");
      NotificationHander(null, null, 'Project Update', 'This is to notify you that there has been an update to the project you are involved in. Please review the latest changes and tasks.')
    } catch (e) {
      if (e.code === 'Error! The value of property "Attachment" is longer than 1048487 bytes.') {
        setMessage('Error! The value of property "Attachment" is longer than 1 Mb')
      } else(
        setMessage(`Error! ${e.message}`)
      )
    }
  };

  export const UpdataUserInfo = async (key, values) => {

    try {
      const CompanyName = auth.currentUser.displayName;
      console.log(key);
      console.log(values);
      const UserProfile = doc(collection(db, CompanyName, key));
  
      await updateDoc(UserProfile, {
        username: values.username,
        email: values.email,
        password: values.Password,
        department: values.department,
        desination: values.desination,
      })
      
    } catch (error) {
      console.log(error);
    }
    
  }