import React, { useState } from "react";
import style from "./Popup.module.css";
import { observer } from "mobx-react-lite";
import { createContext } from "react";
import Loading from "./Loading";
import Error from "./Error";
import Success from "./Success";

interface IPopUp {
  children: React.ReactNode;
}
interface IPopUpContext {
  showLoading: boolean;
  showError: boolean;
  showSuccess: boolean;
  setShowLoading: (value: boolean) => void;
  setShowSuccess: (value: boolean) => void;
  setShowError: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
  setSuccessMessage: (value: string) => void;
  setSuccessLink: (value: string) => void;
}
export const PopUpContext = createContext<IPopUpContext>(
  undefined as unknown as IPopUpContext
);

const PopUpProvider = ({ children }: IPopUp) => {
  const [showLoading, setShowLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showErrorPopUp, setShowErrorPopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successLink, setSuccessLink] = useState("");

  return (
    <PopUpContext.Provider
      value={{
        showLoading: showLoading,
        showSuccess: showSuccess,
        showError: showErrorPopUp,
        setShowError: setShowErrorPopUp,
        setShowLoading: setShowLoading,
        setShowSuccess: setShowSuccess,
        setErrorMessage,
        setSuccessMessage,
        setSuccessLink,
      }}
    >
      {showLoading && <Loading />}
      {showErrorPopUp && (
        <Error errorMessage={errorMessage} onClick={setShowErrorPopUp} />
      )}
      {showSuccess && (
        <Success
          setShowSuccess={setShowSuccess}
          successMessage={successMessage}
          navigate={successLink}
        />
      )}
      {children}
    </PopUpContext.Provider>
  );
};

export default PopUpProvider;
