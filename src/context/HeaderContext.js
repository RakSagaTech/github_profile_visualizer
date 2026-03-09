import React from 'react'

const HeaderContext = React.createContext({
  showMenuOptions: false,
  toggleMenuOptions: () => {},
})

export default HeaderContext
