import { Text } from "~/types";

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
  return (
    <div className="rounded-lg px-3 py-2 bg-gray-100 border border-gray-200">
      <p className="text-sm text-gray-500">
        {convertUTCToLocalDateTime(props.content.timestamp)}
      </p>
      {props.content.message_body}
    </div>
  );
}
