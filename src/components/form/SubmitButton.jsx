export default ({ onPress, label, loading, noMargin }) => {
  return (
    <div>
      <button
        style={{ marginTop: noMargin ? 0 : 20, minWidth: 150, height: 40 }}
        type="button"
        className="btn btn-primary btn-rounded"
        onClick={onPress}
        disabled={loading ?? false}
      >
        {loading ? (
          <div
            className="spinner-border text-info"
            role="status"
            style={{ height: 20, width: 20 }}
          />
        ) : (
          label
        )}
      </button>
    </div>
  );
};
