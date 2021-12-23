import "./styles.css";
import MouseTrackGround from "./MouseTrackGround";
import { useThemeState } from "./theme-context";
import { useAppReducer } from "./reducer";
import React from "react";

function withMouseTracker(Component: any) {
  return (props: any) => (
    <MouseTrackGround
      {...props}
      render={(mouse) => <Component mouse={mouse} />}
    />
  );
}

const DogTracker = withMouseTracker((mouse: Object) => {
  return <h4>dog is here {JSON.stringify(mouse)}</h4>;
});
const CatTracker = withMouseTracker((mouse) => {
  return <h4>cat is here {JSON.stringify(mouse)}</h4>;
});

export default function App() {
  const theme = useThemeState();
  const { state, dispatch, increment } = useAppReducer();
  return (
    <div
      style={{
        backgroundColor: theme?.background,
        color: theme?.foreground
      }}
      className="App"
    >
      <h1> {state.siteTitle}</h1>
      <h2>
        Hello: {state.name}, visited: {state.visited}
      </h2>
      <div>
        ACTION:
        <input
          type="button"
          onClick={() => increment()}
          value="ADD Visit"
        ></input>
        <input
          type="button"
          onClick={() => dispatch({ type: "changeTheme", payload: "dark" })}
          value="Change Dark Theme"
        ></input>
        <input
          type="button"
          onClick={() => dispatch({ type: "changeTheme", payload: "light" })}
          value="Change Light Theme"
        ></input>
      </div>
      <pre>
        theme context: <code>{JSON.stringify(theme)}</code>
      </pre>
      <DogTracker other={99} color="green" />
      <hr />
      <CatTracker other={88} color="yellow" />
      <hr />

      <MouseTrackGround color="green" />
    </div>
  );
}
