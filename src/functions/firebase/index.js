import {functions, db, auth} from './config';
import corsLib from 'cors';

const cors = corsLib({ origin: true });


export const createSubAccount = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Must be an administrative user to create sub-accounts.');
  }

  const { email, password, username, dept, desig } = data;

  try {
    // Create the new user account
    const userRecord = await auth.createUser({
      email,
      password,
    });

    // Reference to the document to be created in Firestore
    const userDocRef = db.collection('admins').doc(context.auth.uid).collection('Interns').doc(userRecord.uid);

    // Set user data in Firestore
    await userDocRef.set({
      uid: userRecord.uid,
      username,
      email,
      password,
      Department: dept,
      Designation: desig,
      IsAdmin: false,
      emailVerified: userRecord.emailVerified,
      accountStatus: 0,
    });

    // Return success response
    return { success: true };
  } catch (error) {
    throw new functions.https.HttpsError('unknown', error.message, error);
  }
});
