import validator from "validator";
import classNames from "classnames";
import { Fragment, useState } from "react";

import { Text } from "~/types";
import LoadingIcon from "./loading-icon";

interface EntryProps {
  content: Text;
}

function convertUTCToLocalDateTime(utcTimestamp: string) {
  const utcDate = new Date(utcTimestamp);
  const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = new Date(
    utcDate.toLocaleString("en-US", {
      timeZone: browserTimeZone,
    })
  );

  return localDate.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Entry(props: EntryProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="rounded-xl p-3 bg-gray-100 border border-gray-200">
      <p className="text-sm text-gray-500 mb-2">
        {convertUTCToLocalDateTime(props.content.timestamp)}
      </p>
      {validator.isURL(props.content.message_body) ? (
        <Fragment>
          {imageLoading && <LoadingIcon />}
          <img
            src={props.content.message_body}
            onLoad={() => setImageLoading(false)}
            className={`rounded-xl overflow-hidden ${
              imageLoading ? "hidden" : "block"
            }`}
          />
        </Fragment>
      ) : (
        <p className="text-base text-gray-800">{props.content.message_body}</p>
      )}
    </div>
  );
}
