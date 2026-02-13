import { createContext, useContext } from 'hono/jsx'

export const BasePathContext = createContext<string>("")
export const useBasePath = () => useContext(BasePathContext)