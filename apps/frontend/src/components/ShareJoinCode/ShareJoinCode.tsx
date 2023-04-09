import { enqueueSnackbar } from "notistack";
import React from "react";

const ShareJoinCode = (props: {joinCode: string}) => {
  return (
    <div className="mockup-code hover:cursor-copy" onClick={() => {
      navigator.clipboard.writeText(props.joinCode).then(() => {
        enqueueSnackbar("Copied to clipboard", { variant: "success", autoHideDuration: 2000 });
      });
    }}>
      <pre data-prefix="$"><code>{props.joinCode}</code></pre>
    </div>
  )
}

export default ShareJoinCode
