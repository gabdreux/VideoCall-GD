import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface ChatModalontextProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isGptOpen: boolean;
  openGpt: () => void;
  closeGpt: () => void;

}

export const ChatModal = createContext<ChatModalontextProps | undefined>(undefined);




export function ChatModalProvider({ children }: { children: ReactNode }) {

      const [isOpen, setIsOpen] = useState<boolean>(false);
      const [isGptOpen, setIsGptOpen] = useState<boolean>(false);

      

      const openModal = () => {
        setIsOpen(true);
      };

      const closeModal = () => {
        setIsOpen(false);
      };


      const openGpt = () => {
        setIsGptOpen(true);
      };

      const closeGpt = () => {
        setIsGptOpen(false);
      };




    return (
      <ChatModal.Provider value={{ isOpen, openModal, closeModal, isGptOpen, openGpt, closeGpt }}>
        {children}
      </ChatModal.Provider>
    );



}





export function useModal() {

  const context = useContext(ChatModal);
  if (context === undefined) {
    throw new Error('useModal must be used within a ChatModalProvider');
  }

  return context;

}
