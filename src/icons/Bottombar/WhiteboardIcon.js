import * as React from "react";

const WhiteboardIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    viewBox="0 0 960 960"
    fill="none"
    {...props}
  >
    <path
      d="M120 180h720v540H120V180Zm60 60v420h600V240H180ZM240 750h480v60H240v-60ZM380 870h200v60H380v-60Z"
      fill={props.fillcolor}
    />
  </svg>
);

export default WhiteboardIcon;
