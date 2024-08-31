import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

// Import the useQuery hook from the convex/react library
// Import the generated API from the convex/_generated/api file

// Define a custom hook to fetch the current user data
export const useCurrentUser = () => {
  // Use the useQuery hook to fetch the current user data from the API
  const data = useQuery(api.users.current);

  // Check if the data is still loading
  const isLoading = data === undefined;

  // Return the fetched data and the loading status
  return { data, isLoading };
};
