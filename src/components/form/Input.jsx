export default ({ reference, id, label, type, value }) => {
  console.log(value);
  const renderInput = (type) => {
    if (type === "textarea") {
      return (
        <textarea
          className="form-control"
          id={id}
          rows="3"
          ref={reference}
          defaultValue={value ?? ""}
        />
      );
    }

    return (
      <input
        ref={reference}
        type={type ?? "text"}
        id={id}
        className="form-control"
        defaultValue={value ?? ""}
      />
    );
  };

  return (
    <div>
      <label className="form-label" htmlFor={id}>
        {label ?? id}
      </label>
      {renderInput(type)}
    </div>
  );
};
