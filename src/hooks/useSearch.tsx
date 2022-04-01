import { useState } from "react";

import { useAsyncAbortable } from "react-async-hook";
import useConstant from "use-constant";
import AwesomeDebouncePromise from "awesome-debounce-promise";

export const useSearch = (searchFn: (searchFilter: string) => void) => {
  // Handle the input text state
  const [inputSearch, setInputSearch] = useState("");

  // Debounce the original search async function
  const debouncedSearchNotifications = useConstant(() =>
    AwesomeDebouncePromise(searchFn, 500)
  );

  const { loading, result } = useAsyncAbortable(
    async (_, text) => {
      // If the input is empty, return nothing immediately (without the debouncing delay!)
      if (text.length === 0) {
        return [];
      }
      // Else we use the debounced api
      return debouncedSearchNotifications(text);
    },
    // Ensure a new request is made everytime the text changes (even if it's debounced)
    [inputSearch]
  );

  // Return everything needed for the hook consumer
  return {
    inputSearch,
    setInputSearch,
    loading,
    result,
  };
};
