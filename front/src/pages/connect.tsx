import React, { useRef } from "react";
import { ContextProvider } from '@/socketContext';
import UserAera from '@/components/user-area';





const Connect = () => {

  


  return (

    
    <ContextProvider>
      
      <UserAera />
 
    </ContextProvider>
    
  );


};

export default Connect;