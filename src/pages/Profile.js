import React from "react";
import { useDispatch } from "react-redux";
import Input from "../components/Input/Input";
import { deleteAvatarOperation, uploadAvatarOperation } from "../store/user";

function Profile() {
  const dispatch = useDispatch();

  const uploadAvatarHandler = (e) => {
    const file = e.target.files[0];
    dispatch(uploadAvatarOperation(file));
  };
  return (
    <div>
      <button
        onClick={() => {
          dispatch(deleteAvatarOperation());
        }}
      >
        delete avatar
      </button>
      <Input
        accept="image/*"
        placeholder="upload avatar"
        type="file"
        onChange={uploadAvatarHandler}
      />
    </div>
  );
}

export default Profile;
