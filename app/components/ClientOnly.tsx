'use client'

import React, { useEffect, useState } from 'react'

export const ClientOnly = ({children}: {children: React.ReactNode}) => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, []);

    if(!hasMounted) {
        return null
    }

  return (
    <>
      {children}
    </>
  )
}

// // export default ClientOnly
// // function useStrict(arg0: boolean): [any, any] {
// //     throw new Error('Function not implemented.')
// // }
// 'use client';

// import React, { useState, useEffect } from 'react';

// interface ClientOnlyProps {
//   children: React.ReactNode;
// }

// const ClientOnly: React.FC<ClientOnlyProps> = ({ 
//   children
// }) => {
//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//       setHasMounted(true);
//   }, [])

//   if (!hasMounted) return null;

//   return (
//     <>
//       {children}
//     </>
//   );
// };

// export default ClientOnly;

