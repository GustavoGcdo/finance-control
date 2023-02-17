import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ReactNode } from 'react';

type DialogProps = {
  open: boolean;
  title?: string;
  message?: ReactNode;
  onClose: (confirm: boolean) => void;
};

const ConfirmDialog = ({ open, onClose, ...props }: DialogProps) => {
  const handleClose = () => {
    onClose(false);
  };

  const handleConfirm = () => {
    onClose(true);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{props.title || 'Confirmação'}</DialogTitle>
      <DialogContent>
        <div className="p-5">{props.message || 'Deseja confirmar esta ação?'}</div>
      </DialogContent>
      <DialogActions>
        <div className='flex gap-3 p-3'>
          <Button onClick={handleClose} color="default">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirmar
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
