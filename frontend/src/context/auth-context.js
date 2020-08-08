import React from 'react'

const authContext = React.createContext({
    userId: null,
    username: null
});

export default  authContext