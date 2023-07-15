import axios from 'axios';
import { ChangeEvent } from 'react';
import { toast } from 'react-hot-toast';

const uploadImg = async (
  e: ChangeEvent<HTMLInputElement>,
): Promise<string | null> => {
  const formData = new FormData();

  const [image] = e.target.files || [];

  try {
    formData.append('file', image);
    formData.append(
      'upload_preset',
      import.meta.env.VITE_cloudinaryUploadPreset,
    );
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_cloudinaryCloudName
      }/image/upload`,
      formData,
    );
    toast.success('Image uploaded successfully!');
    return res.data.url;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Image upload failed!');
    }
    return null;
  }
};

export default uploadImg;
