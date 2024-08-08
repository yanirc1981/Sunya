import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './uploadimage.css';

const UpLoadImage = () => {
  const [media, setMedia] = useState('');
  const [loading, setLoading] = useState(false);

  const upLoadMedia = async (e) => {
    const files = e.target.files;
    console.log(files);
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'ozbamt8e');
    setLoading(true);
    
    const isImage = files[0].type.startsWith('image/');
    const cloudinaryUrl = isImage 
      ? 'https://api.cloudinary.com/v1_1/djkq5h1et/image/upload' 
      : 'https://api.cloudinary.com/v1_1/djkq5h1et/video/upload';
    
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: data,
    });
    
    const file = await response.json();
    setMedia(file.secure_url);
    console.log(file.secure_url);
    
    setLoading(false);
  };

  return (
    <div className="container_upLoadImage">
      <Form>
        <Form.Group controlId="formFileDisabled" className="mb-4">
          <Form.Label>Subir imagen o video</Form.Label>
          <Form.Control
            type="file"
            name="file"
            accept="image/*,video/mp4"
            onChange={upLoadMedia}
            placeholder="Sube tu imagen o video aquí"
          />
          {loading ? (
            <h1>Cargando...</h1>
          ) : (
            media && (
              <>
                {media.endsWith('.mp4') ? (
                  <video
                    src={media}
                    style={{ width: '150px', marginTop: '15px' }}
                    controls
                  />
                ) : (
                  <img
                    src={media}
                    style={{ width: '150px', marginTop: '15px' }}
                    alt="Uploaded media"
                  />
                )}
              </>
            )
          )}
        </Form.Group>
      </Form>
    </div>
  );
};

export default UpLoadImage;
