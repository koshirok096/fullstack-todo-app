import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import { setCopiedImageUrl, setBackgroundImage } from '../redux/unsplashGetImageSlice';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
}

interface RootState {
  unsplashGetImage: {
    copiedImageUrl: string;
  };
}

const ModalTheme: React.FC<ModalProps> = ({ open, onClose }) => {
  const unsplashAccessToken = process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN;
  const copiedImageUrl = useSelector((state: RootState) => state.unsplashGetImage.copiedImageUrl);
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchImages();
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${unsplashAccessToken}&page=${page}`
      );
      const data = await response.json();
      setImages(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchImages();
  }, [page]);

  const handleCopyImage = (imageUrl: string) => {
    // navigator.clipboard.writeText(imageUrl);
    dispatch(setCopiedImageUrl(imageUrl));
    dispatch(setBackgroundImage(imageUrl)); // 追加
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Select the Theme
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Search Image"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: 'black',
              '&:hover': {
                bgcolor: 'black',
              },
            }}
          >
            Search
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            width: '400px'
          }}
        >
        {images.map((image) => (
          <Box
            key={image.id}
            sx={{
              display: 'inline-block',
              // width: '25%',
              boxSizing: 'border-box',
              textAlign: 'center',
            }}
          >
            <img
              src={image.urls.small}
              alt={image.alt_description}
              width={80}
              height={80}
              onClick={() => handleCopyImage(image.urls.full)}
              style={{ cursor: 'pointer', objectFit:'cover', verticalAlign: 'bottom',  }}
            />
            {copiedImageUrl === image.urls.full && (
              <Typography variant="caption" display="block" sx={{ position:'absolute', marginTop: '-19px', background:'white', px:1}}>
                Changed!
              </Typography>
            )}
          </Box>
        ))}
        </Box>
        {images.length > 0 && (
          <>
            <Button onClick={handlePrevPage} disabled={page === 1}>
              Previous Page
            </Button>
            <Button onClick={handleNextPage} disabled={page === totalPages}>
              Next Page
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ModalTheme;
