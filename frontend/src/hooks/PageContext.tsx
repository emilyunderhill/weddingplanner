import { createContext, useContext } from "react";

const PageContext = createContext(() => {
  const isMobile = window.matchMedia("(max-width: 600px)").matches

  return {
    isMobile
  }
})

export default PageContext
