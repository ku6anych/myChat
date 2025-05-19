import { useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

interface Props {
  name: string;
  label: string;
  onGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({ name, label, onGetFile }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState('');

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
    onGetFile(e);
  };

  return (
    <div>
      <input type="file" ref={inputRef} name={name} onChange={onFileChange} style={{ display: 'none' }} />
      <Grid container alignItems={'center'} justifyContent="space-between">
        <Grid>
          <TextField disabled variant="outlined" label={label} value={fileName} onClick={activateInput} />
        </Grid>
        <Grid>
          <Button variant="contained" color="success" onClick={activateInput}>
            Select Image
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default FileInput;
