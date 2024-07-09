import { AdUnits, ColorLens } from "@mui/icons-material";
import { auth, db } from "../firebase/config"; // Import your Firebase configuration
import { createUserWithEmailAndPassword, deleteUser, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateEmail, updateProfile } from "firebase/auth";
import { doc, setDoc, collection, getDoc, getDocs, query, where, addDoc, updateDoc} from "firebase/firestore";
import { Intern, InternProject, NewPorjects, SubmitProjects, UserNotification, UserProfile } from "../../data/UserData";


// export const CreateAdminAccount = async (values, SetCurrentUser, seterror) => {
  
//   const email = values.email;
//   const password = values.password;
//   const CompanyName = values.companyname;
//   try {
//       // Check if the company name already exists
//       const companySnapshot = await getDoc(doc(db, CompanyName));
//       if (companySnapshot.exists()) {
//         seterror("Company name already exists. Please choose a different one.");
//         return;
//       }

//       // Check if the username already exists
//       const usernameSnapshot = await getDocs(query(collection(db, "UserCredential"), where("username", "==", Username)));
//       if (!usernameSnapshot.empty) {
//         seterror("Username already exists. Please choose a different one.");
//         return;
//       }

//     await createUserWithEmailAndPassword(auth, email, password).then(
//       async (userCredential) => {
//             // Reference to the company document
//             const newcompanyDocRef = doc(db, CompanyName, userCredential.user.uid);
        
//             // Reference to the subcollection "InterUserCredential" within the company document
//             const userDocRef = doc(collection(newcompanyDocRef, 'UserCredential'));
        
//             //set Company name and Username
//             // await setDoc (doc(db, "Alpha", "Checking"), {
//             //   CompanyName: values.companyname,
//             //   username: values.username 
//             // })
              
//             // Set user data under the custom document ID
//               await setDoc(userDocRef, {
//                 FirstName: values.fristname,
//                 LastName: values.lastname,
//                 username: values.username,
//                 email: userCredential.user.email,
//                 password: values.password,
//                 phoneNumber: values.phonenumber,
//                 CompanyName: values.companyname,
//                 IsAdmin: true,
//                 emailVerified: userCredential.user.emailVerified,
//                 accountStatus: 0,
//               })
//               .then(() => {
//                 SetCurrentUser(true);
//               })
//               .catch((e) => {
//                 seterror(e.code);
//                 deleteUser(userCredential)
//               })
//       }
//     );
//   } catch (e) {
//     if (e.code === "auth/email-already-in-use") {
//       seterror("Email is alredy used.")
//     } else{
//       seterror(e.code);
//     }
//   }
// };

export const CreateAdminAccount = async (values, SetCurrentUser, seterror) => {
  const email = values.email;
  const password = values.password;
  const CompanyName = values.companyname;
  seterror("")
  try {
    // Check if the company name already exists
      // const companySnapshot = await getDocs(doc(collection(db, CompanyName)));
      const companySnapshot = await getDocs(query(collection(db, CompanyName), where("CompanyName", "==", CompanyName)));

      if (!companySnapshot.empty) {
        seterror("Company name already exists. Please choose a different one.");
        return;
      }

    // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      sendEmailVerification(userCredential);
    // Reference to the company document
      const newcompanyDocRef = doc(db, CompanyName, userCredential.user.uid);
        
    // Reference to the subcollection "InterUserCredential" within the company document
      const profileDocRef = doc(collection(newcompanyDocRef, "Profile"));
        
    // Reference to the user document under 'users' collection with the user's UID
    // const userDocRef = doc(db,  CompanyName, userCredential.user.uid, );
    
    // Set user Profile
    await setDoc(profileDocRef, {
      FirstName: values.fristname,
      LastName: values.lastname,
      username: values.username,
      email: userCredential.user.email,
      password: values.password,
      phoneNumber: values.phonenumber,
      CompanyName: values.companyname,
      IsAdmin: true,
      emailVerified: userCredential.user.emailVerified,
      accountStatus: 0,
      Address: '',
    })
    
    // set firebase user profile
    await updateProfile(auth.currentUser, {
      displayName: CompanyName,
      photoURL: null,
    })

    // Set user data
      await setDoc(newcompanyDocRef, {
        username: values.username,
        desination: null,
        department: null,
        email: userCredential.user.email,
        password: values.password,
        CompanyName: values.companyname,
        IsAdmin: true,
        emailVerified: userCredential.user.emailVerified,
        accountStatus: 0,
      })

    SetCurrentUser(true);
  } catch (e) {
    if (e.code === "auth/email-already-in-use") {
      seterror("Email is already used.");
    } else {
      seterror(e.message);
      console.error(e)
    }
  }
};


export const CreateInternAccount = async (values, setSuccees, setisload, seterror, CompanyName) => {
  const email = values.email;
  const password = values.password;
  seterror("")
  try {
    // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Reference to the company document
      const newcompanyDocRef = doc(db, CompanyName, userCredential.user.uid);
        
    // Reference to the subcollection "InterUserCredential" within the company document
      const profileDocRef = doc(collection(newcompanyDocRef, "Profile"));
        
    
    // Set user Profile
    await setDoc(profileDocRef, {
      FirstName: "",
      LastName:  '',
      username: values.username,
      email: userCredential.user.email,
      password: values.password,
      phoneNumber: '',
      desination: values.desig,
      department: values.dept,
      CompanyName: CompanyName,
      IsAdmin: false,
      emailVerified: userCredential.user.emailVerified,
      accountStatus: 0,
      Address: '',
    })
    
    // set firebase user profile
    await updateProfile(auth.currentUser, {
      displayName: CompanyName,
      photoURL: null,
    })

    // Set user data
      await setDoc(newcompanyDocRef, {
        username: values.username,
        desination: values.desig,
        department: values.dept,
        email: userCredential.user.email,
        password: values.password,
        CompanyName: CompanyName,
        IsAdmin: false,
        emailVerified: userCredential.user.emailVerified,
        accountStatus: 0,
      })

      setSuccees(true);
      setisload(false);
      signOut(auth);
  } catch (e) {
    if (e.message === "auth/email-already-in-use") {
      seterror("Email is already used.");
    } else {
      seterror(e.message);
    }
  }
};

export const SigninUser = async (values, SetCurrentUser, seterror) => {
  const email = values.email;
  const password = values.password;

  try {
    // Start sign-in process
    await signInWithEmailAndPassword(auth, email, password).then(async () => {
      await getUserData();
      if (UserProfile.at(0).accountStatus ==  0) {
        SetCurrentUser(true)
      } else {
        seterror('Your Account was disabled! For more infomation contact on cre8ivcove@gmail.com'  )
      }
    });
  } catch (e) {
    if (e.code === "auth/invalid-credential") {
      seterror("Email or Password are invalid!");
    } else {
      seterror(e.message)
    }
  }
};

export const LoginBack = (SetCurrentUser, setisloading, isloading, setUser) => {
  
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await getUserData();
      // setUser(user)
      if (UserProfile.at(0).accountStatus == 0) {
        SetCurrentUser(true);
      } else {
        SetCurrentUser(false)
      }
    } else{
      SetCurrentUser(false);
    }

    if (isloading) {
      setisloading(false)
    }
  })
}

//GernalErrorHandler
export const GernalErrorHandler = (setError) => {
  //checking email verfied

  if (!auth.currentUser.emailVerified) {
    setError('Please Verified Your Email! Go to profile Page and Verified Your email.')
  }

  if (UserProfile.at(0).LastName === '' || UserProfile.at(0).FirstName === '' || UserProfile.at(0).phoneNumber === '' || UserProfile.at(0).Address === '' ) {
    setError('Please Complete your Porfile!')
  }

}

//Notification Hander
export const NotificationHander = async (adminNotficationTitle, adminNotficationContent, employeeNotficationTitle, employeeNotficationContent) => {
  //Get Company Name
  const CompanyName = auth.currentUser.displayName;

  // Reference to the company document
  const companyDocRef = doc(db, CompanyName, 'Notification');

  // Reference to the subcollection "admin" within the company document
  const AdminDocRef = doc(collection(companyDocRef, "Admin"));
  
  // Reference to the subcollection "employee" within the company document
  const employeeDocRef = doc(collection(companyDocRef, "Empolyee"));

  if (adminNotficationTitle != "" || adminNotficationContent != "") {
    await setDoc(AdminDocRef, {
      title: adminNotficationTitle,
      content: adminNotficationContent,
      status: 0,
    })
  } 
  if (employeeNotficationTitle != "" || employeeNotficationContent != "") {
    await setDoc(employeeDocRef, {
      title: employeeNotficationTitle,
      content: employeeNotficationContent,
      status: 0,
    })
  }

  getUserData();
}

//Get UserData 
export const getUserData = async () => {
  
  const uid = auth.currentUser.uid;
  const companyName = auth.currentUser.displayName;
  
  // User Profile
  const userCollectionRef = collection(db, companyName, uid, "Profile");
  const userDocSnapshot = await getDocs(userCollectionRef);

  userDocSnapshot.forEach((doc) => {
    UserProfile.push(doc.data());
  });
  
  //Intern Data
  const InternCollectionRef = collection(db, companyName);
  const InternDocSnapshot = await getDocs(InternCollectionRef);
  const InternData = [];
  InternDocSnapshot.forEach((doc) => {
    InternData.push({key: doc.id , data: doc.data()});
  });
  Intern.push(InternData);

  //Projects Data
  const ProjectquerySnapshot = await getDocs(collection(db, companyName, "Projects", "NewProjects"));
  const projects = [];
  ProjectquerySnapshot.forEach((doc) => {
      projects.push({key: doc.id , data: doc.data()})
  });
  NewPorjects.push(projects);

   //Submit Projects Data
   const SubmitProjectquerySnapshot = await getDocs(collection(db, companyName, "Projects", "SubmitedProjects"));
   const Submitprojects = [];
   SubmitProjectquerySnapshot.forEach(async (docs) => {
      Submitprojects.push({key: docs.id , data: docs.data()})
   });
    SubmitProjects.push(Submitprojects);
    

    //Intern Project 
    if (!UserProfile.at(0).IsAdmin) {
      const InternProjectquerySnapshot = await getDocs(collection(db, companyName, auth.currentUser.uid, "AcquireProjects"));
      const Internprojects = [];
      InternProjectquerySnapshot.forEach((doc) => {
        Internprojects.push({key: doc.id , data: doc.data()})
      });
      InternProject.push(Internprojects);
    }
    
    //notification
    if (UserProfile.at(0).IsAdmin) {
      const notificationquerySnapshot = await getDocs(collection(db, companyName, "Notification", "Admin"));
        const Notification = [];
        notificationquerySnapshot.forEach((doc) => {
          if (doc.exists) {
            Notification.push({key: doc.id , data: doc.data()})
          }
        });
        UserNotification.push(Notification);
    } else {
      const notificationquerySnapshot = await getDocs(collection(db, companyName, "Notification", "Empolyee"));
        const Notification = [];
        notificationquerySnapshot.forEach((doc) => {
          if (doc.exists) {
            Notification.push({key: doc.id , data: doc.data()})
          }
        });
        UserNotification.push(Notification);
    }

  return UserProfile, Intern, NewPorjects, SubmitProjects, InternProject, UserNotification;
}

//Updata UserProfileData 
export const UpdateUserProfile = async (values, setMessage) => {
  const uid = auth.currentUser.uid;
  const companyName = auth.currentUser.displayName;
    // User Profile
    const userCollectionRef = collection(db, companyName, uid, "Profile");
    const idQuerySanpshots = (await getDocs(userCollectionRef));

    
    idQuerySanpshots.forEach(async (Doc) => {
      await updateDoc(doc(userCollectionRef, Doc.id), {
        FirstName: values.firstName,
        LastName:  values.lastName,
        phoneNumber: values.contact,
        Address: values.address,
        }).then(() => {
          setMessage("Profile Updated!")
        }).catch((e) => {
          setMessage(e.message)
        });
    })
      

}
