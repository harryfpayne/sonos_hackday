import {FC} from "react";

export const Button: FC = ({children}) => (
  <button className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
    {children}
  </button>
)
