import { Modal, Card, CardContent, Typography } from "@mui/material";
import getGradient from "../../util/gradients";

function GradientLegend({ name, label }) {
  return (
    <div style={{ display: "flex" }} className="legend-item">
      <span
        style={{
          height: 40,
          width: 40,
          borderRadius: 10,
          marginRight: 10,
          backgroundImage: getGradient(name),
        }}
      ></span>
      <Typography variant="h6" component="div">
        {label}
      </Typography>
    </div>
  );
}

export default ({ isVisible, setVisible }) => {
  return (
    <>
      <Modal
        open={isVisible}
        onClose={() => setVisible(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="detail-modal">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {"Color legned"}
              </Typography>
              <div style={{ height: 20 }} />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <GradientLegend name="old" label="Past event" />
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <GradientLegend name="open" label="Open event" />
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <GradientLegend name="reserved" label="Reserved schedule" />
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Modal>
    </>
  );
};
