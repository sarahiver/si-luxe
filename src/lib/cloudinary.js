// ═══════════════════════════════════════════════════════════════════════════
// CLOUDINARY CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = async (file, folder = 'wedding-photos') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folder);
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

// Generate optimized image URL
export const getOptimizedUrl = (publicId, options = {}) => {
  const {
    width = 'auto',
    height = 'auto',
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
  } = options;
  
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_${crop},w_${width},h_${height},q_${quality},f_${format}/${publicId}`;
};

// Generate thumbnail URL
export const getThumbnailUrl = (publicId, size = 300) => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_thumb,w_${size},h_${size}/${publicId}`;
};
