import { auth,googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";


export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    console.log(auth?.currentUser?.email);

    const signInWithGoogle = async()=>{
      try{
        await signInWithPopup(auth,googleProvider)
      }catch(err){
        console.error(err);
      }
    }

    const signUp = async () => {
        try{
            await createUserWithEmailAndPassword(auth,email,password);
        }catch(err){
            console.error(err);
        }

     };

    const signIn = async () => {
        try{
            await signInWithEmailAndPassword(auth,email,password);    
          }catch(err){
            console.error(err);
        }

     };



    const logOut = async () => {
           try {
              await signOut(auth)
           } catch (err) {
             console.error(err);
           }
     }

    return (
        <div>
            <input
             placeholder="Email...."
             onChange={(e) => setEmail(e.target.value)}
            />
            <input 
             placeholder="Password...."
             type="password"
             onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={signUp}>sign up</button>
            <button onClick={signIn}>sign in</button>
            <button onClick={signInWithGoogle}>sign in with google</button>
            <button onClick={logOut} >log out</button> 

        </div>
    );
};
