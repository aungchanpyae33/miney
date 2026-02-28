// 2. Map of English terms to Myanmar terms

import { formatDistanceToNowStrict } from "date-fns";
export const outputAgoDate = (date: string) => {
  const agoDate = formatDistanceToNowStrict(new Date(date), {
    addSuffix: true,
  });
  return agoDate.split(" ");
};
