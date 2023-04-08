import moment from "moment";
export const timeAgo = (time) => {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "% sec ago",
      s: (number) => number + " sec ago",
      ss: "%d sec ago",
      m: "1 min ago",
      mm: "%d min ago",
      h: "1 hour ago",
      hh: "%d hours ago",
      d: "1 day ago",
      dd: "%d days ago",
      M: "a month ago",
      MM: "%d months ago",
      y: "a year ago",
      yy: "%d years ago",
    },
  });

  let secondsElapsed = moment().diff(time, "seconds");
  let dayStart = moment("2018-01-01").startOf("day").seconds(secondsElapsed);

  if (secondsElapsed > 300) {
    return moment(time).fromNow(true);
  } else if (secondsElapsed < 60) {
    return dayStart.format("s") + " sec ago";
  } else {
    return dayStart.format("m:ss") + " min ago";
  }
};
