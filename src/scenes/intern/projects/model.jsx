import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UpdateProjectStatus } from "../../../functions/intern/function"
import { updateCacheWithNewRows } from '@mui/x-data-grid/hooks/features/rows/gridRowsUtils';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AccptModal() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  const Accept = () => {
    UpdateProjectStatus();
    handleClose()
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Are your Sure to Accept this Project.
            </Typography>
            <br />
            <Button color="success" onClick={Accept}>Yes</Button>
            <Button color="error" onClick={handleClose}>No</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}