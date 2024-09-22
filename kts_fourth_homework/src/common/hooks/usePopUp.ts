import React, { useContext, useEffect } from "react";
import { PopUpContext } from "../components/PopUpProvider/PopUpProvider";
const usePopUp = <TRequest, TResponse>(
  action: (request: TRequest) => Promise<TResponse>, // action: (request: TRequest, messages)
  successMessage: string,
  errorMessage: string,
  navigate: string
) => {
  const {
    showError,
    showLoading,
    showSuccess,
    setShowError,
    setShowSuccess,
    setShowLoading,
    setErrorMessage,
    setSuccessMessage,
    setSuccessLink,
  } = useContext(PopUpContext);

  useEffect(() => {
    setErrorMessage(errorMessage);
    setSuccessMessage(successMessage);
    setSuccessLink(navigate);
    return () => {
      setShowError(false);
      setShowSuccess(false);
      setShowLoading(false);
    };
  }, []);
  return {
    decoratedAction(request: TRequest) {
      setShowLoading(true);
      return action(request)
        .then(() => setShowSuccess(true))
        .catch(() => setShowError(true))
        .finally(() => setShowLoading(false));
    },
  };
};

export default usePopUp;
