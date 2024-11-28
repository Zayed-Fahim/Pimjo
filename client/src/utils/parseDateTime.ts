export const parseDateTime = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const hasTime = dateString.includes("T");

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(hasTime && {
      hour: "2-digit",
      minute: "2-digit",
    }),
    timeZone: "Asia/Dhaka",
  };

  return date.toLocaleString("en-US", options);
};

export const formatDateForInput = (date: string | Date | undefined) => {
  if (!date) return "";
  const taskDueDate = new Date(date);
  taskDueDate.setHours(taskDueDate.getHours() + 6);
  return taskDueDate.toISOString().slice(0, 16) as string;
};
