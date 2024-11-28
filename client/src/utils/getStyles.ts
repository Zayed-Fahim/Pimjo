export const getStatusStyle = (status: string) => {
  switch (status) {
    case "Pending":
      return "text-orange-500 font-bold";
    case "In Progress":
      return "text-blue-500 font-bold";
    case "Completed":
      return "text-green-500 font-bold";
    default:
      return "";
  }
};

export const getPriorityStyle = (priority: string) => {
  switch (priority) {
    case "Low":
      return "text-gray-500";
    case "Medium":
      return "text-yellow-500";
    case "High":
      return "text-red-500";
    default:
      return "";
  }
};
