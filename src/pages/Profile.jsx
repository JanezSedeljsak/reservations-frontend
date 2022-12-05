import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isUserCompany, updateProfile } from "../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { Input, SubmitButton } from "../components/form";

export default function () {
  const loading = useSelector((state) => state.user.loading);
  const profile = useSelector((state) => state.user.profile);
  const isCompany = useSelector(isUserCompany);
  const dispatch = useDispatch();

  const phoneRef = useRef(null);
  const bioRef = useRef(null);
  const locationRef = useRef(null);
  const birthDateRef = useRef(null);

  function handleProfileUpdate() {
    const data = {
      id: profile?.id,
      phone: phoneRef.current.value,
      bio: bioRef.current.value,
      location: locationRef.current.value,
      birth_date: birthDateRef.current.value,
    };

    dispatch(updateProfile(data));
  }

  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div className="card main-container">
        <h4 className="card-header">Edit profile - {profile?.full_name}</h4>
        <div className="card-body">
          <Input reference={phoneRef} id={"phone"} value={profile?.phone} />
          <Input
            reference={locationRef}
            id={"location"}
            value={profile?.location}
          />
          <Input
            reference={birthDateRef}
            id={"birth_date"}
            label={isCompany ? "founded" : "birth date"}
            value={profile?.birth_date}
          />
          <Input
            reference={bioRef}
            id={"bio"}
            type={"textarea"}
            value={profile?.bio}
          />

          <SubmitButton
            onPress={handleProfileUpdate}
            label={"Update profile"}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
