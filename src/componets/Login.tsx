import { useRef, useState } from "react";
import Header from "./Header";
import validateData from "../utils/validate";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import type { AuthError } from "firebase/auth";
import { auth } from "../utils/firebase";
import Errormsg from "../utils/Errormsg";
import { photoURL, BACKGROUND_IMAGE } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const EmailRef = useRef<HTMLInputElement>(null);
  const FullNameRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setError(null);
    setSuccessMessage(null);
  };
  const handleSubmit = async () => {
    setError(null);
    setSuccessMessage(null);

    const validationError = validateData(
      EmailRef.current?.value || "",
      PasswordRef.current?.value || ""
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      if (isSignInForm) {
        await signInWithEmailAndPassword(
          auth,
          EmailRef.current?.value || "",
          PasswordRef.current?.value || ""
        );
        setSuccessMessage("Successfully signed in!");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          EmailRef.current?.value || "",
          PasswordRef.current?.value || ""
        );

        // Update profile and wait for it to complete
        await updateProfile(userCredential.user, {
          displayName: FullNameRef.current?.value || "",
          photoURL: photoURL,
        });

        // Reload the user to get updated profile data
        await userCredential.user.reload();

        setSuccessMessage("Account created successfully!");
      }
    } catch (error) {
      const authError = error as AuthError;
      const errorMessage = Errormsg(authError);

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BACKGROUND_IMAGE} alt="background" />
      </div>
      <form
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
            ref={FullNameRef}
          />
        )}

        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
          ref={EmailRef}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
          ref={PasswordRef}
        />

        {error && <p className="text-red-500 py-2">{error}</p>}
        {successMessage && (
          <p className="text-green-500 py-2">{successMessage}</p>
        )}

        <button
          className={`p-4 my-6 w-full rounded-lg ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-700 hover:bg-red-800"
          }`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {isSignInForm ? "Signing In..." : "Signing Up..."}
            </div>
          ) : isSignInForm ? (
            "Sign In"
          ) : (
            "Sign Up"
          )}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};
export default Login;
