import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/appStore";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../store/UserSlice/userSlice";
import { useDispatch } from "react-redux";
import { photoURL as DEFAULT_PHOTO_URL, LOGO } from "../utils/constant";
import { toggleGptSearch } from "../store/GptSlice/GptSlice";

const Header = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  const handleGptSearch = (): void => {
    dispatch(toggleGptSearch());
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        const { uid, displayName, photoURL, email } = auth.currentUser;
        dispatch(
          addUser({
            uid,
            email: email || "",
            displayName: displayName || "User", // Provide fallback
            photoURL: photoURL || DEFAULT_PHOTO_URL, // Use Firebase photoURL or fallback to constant
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center w-full">
      <img className="w-44" src={LOGO} alt="logo" />
      <div className="flex items-center">
        {user && (
          <>
            <div className="flex items-center mr-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md mr-4 hover:bg-red-700 cursor-pointer transition-all duration-300"
                onClick={handleGptSearch}
              >
                GPT search
              </button>
              <img
                className="w-10 h-10 rounded-full"
                src={user.photoURL}
                alt="avatar"
              />
              <span className="text-white ml-2 font-semibold">
                {user.displayName}
              </span>
            </div>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
