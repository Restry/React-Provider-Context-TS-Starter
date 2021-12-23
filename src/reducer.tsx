import React from "react";

// 全局状态
const AppContext = React.createContext();

interface AppStateType {
  name: string;
  siteTitle: string;
  visited: 0;
  theme: string;
}
interface ReducerActionType {
  type: string;
  payload: any;
}

const defaultState: AppStateType = {
  name: "Restry",
  siteTitle: "我的网站",
  visited: 0,
  theme: "light"
};

function appReducer(state: AppStateType, action: ReducerActionType) {
  switch (action.type) {
    case "INCREMENT": {
      return { ...state, visited: state.visited + 1 };
    }
    case "changeTheme": {
      return { ...state, theme: action.payload };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

export function AppProvider(props) {
  const [state, dispatch] = React.useReducer(appReducer, defaultState);
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <AppContext.Provider value={value} {...props} />;
}

export function useAppReducer() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error(`useapp must be used within a appProvider`);
  }
  const [state, dispatch] = context;

  const increment = () => dispatch({ type: "INCREMENT" });
  return {
    state,
    dispatch,
    increment
  };
}
