import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({});

export default function AuthProvider({children}) {
    
    const [usuario, setUsuario] = useState(AuthContext);

    return (
        <AuthContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </AuthContext.Provider>
    )
}

