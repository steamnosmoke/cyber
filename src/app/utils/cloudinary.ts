const CLOUD_NAME = "ddl6fo8fw";

export const getImageUrl = (publicId: string, width = 800) => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${publicId}.png`;
};
