import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { SubmitButton, Input, Select, CheckBox } from "../form";
import {
  updateManagementCourt,
  createManagementCourt,
} from "../../actions/management";
import { getCourtDetail } from "../../actions/common";

export default function ({
  isVisible,
  setVisible,
  courtId,
  locationId,
  search,
}) {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.management.loading || state.common.loading
  );

  const inProgress = useSelector(
    (state) => state?.management?.actionInProgress ?? false
  );
  const courtTypes = useSelector((state) => state.common.courtTypes);
  const court = useSelector((state) => state?.common?.courtDetail ?? {});
  const isCreate = courtId === null;

  const nameRef = useRef();
  const typeRef = useRef();
  const isOutSideRef = useRef();

  function prepareData() {
    const courtData = {
      name: nameRef.current.value,
      court_types: [typeRef.current.value],
      is_outside: isOutSideRef.current.value,
      locationId,
    };

    return courtData;
  }

  useEffect(() => {
    if (!isCreate && isVisible) {
      dispatch(getCourtDetail(courtId));
    }
  }, [courtId, isVisible]);

  function handleLocationUpdate(event) {
    event.preventDefault();
    const data = prepareData();
    dispatch(updateManagementCourt({ ...data, id: courtId }, { search }));
  }

  function handleLocationCreate(event) {
    event.preventDefault();
    const data = prepareData();
    dispatch(createManagementCourt(data, { search }));
  }

  if (!isVisible) {
    return null;
  }

  function renderForm() {
    if (loading) {
      return <CircularProgress />;
    }

    return (
      <>
        <Input
          reference={nameRef}
          id={"name"}
          value={!isCreate ? court.name : ""}
        />
        <Select
          reference={typeRef}
          id={"type"}
          label={"type"}
          value={!isCreate ? court?.court_types?.[0]?.id : courtTypes?.[0]?.id ?? -1}
          options={courtTypes}
        />
        <CheckBox
          id={"is_outside"}
          label="Is outside"
          value={false}
          reference={isOutSideRef}
        />
        <SubmitButton
          onPress={isCreate ? handleLocationCreate : handleLocationUpdate}
          label={isCreate ? "Create court" : "Update court"}
          loading={inProgress}
        />
      </>
    );
  }

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={isVisible}
      onClose={() => setVisible(false)}
      onOpen={() => setVisible(true)}
      disableSwipeToOpen={true}
    >
      <Box sx={{ width: 700, m: 2 }} role="presentation">
        <h5>Court form</h5>
        {renderForm()}
      </Box>
    </SwipeableDrawer>
  );
}
