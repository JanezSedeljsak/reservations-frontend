export default ({ onPress, label, loading }) => {
  return (
    <button
      style={{ marginTop: 20, minWidth: 150 }}
      type="button"
      className="btn btn-primary btn-rounded"
      onClick={onPress}
      disabled={loading ?? false}
    >
      {loading ? '...' : label}
    </button>
  );
};
