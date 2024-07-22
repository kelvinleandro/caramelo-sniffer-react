import React from "react";
import { formatPayload } from "@/lib/utils";

const PayloadDisplay = ({ payload }: { payload: Uint8Array }) => {
  const formattedPayload = formatPayload(payload);

  return <div className="w-full overflow-y-auto scrollbar max-h-72"><p>{formattedPayload}</p></div>;
};

export default PayloadDisplay;
