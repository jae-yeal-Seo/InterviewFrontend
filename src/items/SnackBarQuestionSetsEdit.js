import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';

export default function SimpleSnackbar({questionSetEdit,questionsets}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if(questionsets.length === 0){
        setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <CreateIcon onClick={()=>{
        handleClick()
        questionSetEdit()
      }} className='mb-3'/>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="질문세트를 먼저 작성해주세요"
        action={action}
      />
    </div>
  );
}
