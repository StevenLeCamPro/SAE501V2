import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const FlashMessageContext = createContext();

export const FlashMessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const [type, setType] = useState(null);
    const location = useLocation();

    const addFlashMessage = (messageText, messageType) => {
        setMessage(messageText);
        setType(messageType);

        // Bloquer le scroll
        document.body.classList.add("overflow-hidden");

        // Fermer après un délai
        setTimeout(() => {
            setMessage(null);
            setType(null);
            document.body.classList.remove("overflow-hidden"); // Rétablir le scroll
        }, 3000);
    };

    // Effacer le message au changement de page
    useEffect(() => {
        setMessage(null);
        setType(null);
        document.body.classList.remove("overflow-hidden"); // Sécurité supplémentaire
    }, [location.pathname]);

    return (
        <FlashMessageContext.Provider value={{ message, type, addFlashMessage }}>
            {children}
        </FlashMessageContext.Provider>
    );
};

export const useFlashMessage = () => useContext(FlashMessageContext);
