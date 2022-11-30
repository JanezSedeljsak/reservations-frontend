export default ({ reference, id, label, type }) => {
  return (
    <div>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        ref={reference}
        type={type ?? "text"}
        id={id}
        className="form-control"
      />
    </div>
  );
};