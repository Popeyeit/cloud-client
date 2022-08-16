import { useState } from "react";
import { useDispatch } from "react-redux";
import { getFilesOperation, searchFileOperation } from "../store/file";
import { setLoader } from "../store/loader";
import useInput from "./useInput";

function useSearchFile() {
  const dispatch = useDispatch();
  const { value, onChange } = useInput();
  const [searchTimeout, setSearchTimeout] = useState(false);

  const requestSearchHandler = (e) => {
    onChange(e);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }
    dispatch(setLoader(true));

    setSearchTimeout(
      setTimeout(
        (value) => {
          dispatch(searchFileOperation(value));
        },
        500,
        e.target.value
      )
    );
  };

  return { value, onChange: requestSearchHandler };
}

export default useSearchFile;
