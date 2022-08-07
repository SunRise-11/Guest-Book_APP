import React from "react";
import { default as TimeAgoComponent, Formatter } from "react-timeago";
import dateFormat from "dateformat";

const formatter: Formatter = (
  value,
  unit,
  suffix,
  epochMilliseconds,
  nextFormatter
) => {
  switch (unit) {
    case "second":
      return value >= 10 ? <>{value}s</> : <>Just Now</>;
    case "minute":
      return <>{value}m</>;
    case "hour":
      return <>{value}h</>;
    case "day":
      return value === 1 ? (
        <>Yesterday</>
      ) : (
        <>{dateFormat(new Date(epochMilliseconds), "mmm. d")}</>
      );
    default:
      return <>{dateFormat(new Date(epochMilliseconds), "mmm d, yy")}</>;
  }
};

const TimeAgo: React.FC<{ date: Date }> = ({ date }) => {
  return <TimeAgoComponent date={date} formatter={formatter} />;
};

export default TimeAgo;
