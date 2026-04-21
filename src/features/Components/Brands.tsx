type ImageItem = {
  Brandimage: string;
  alt: string;
};

type Props = {
  images: ImageItem[];
};

export const ImageGallery = ({ images }: Props) => {
  return (
    <div className="BrandImages">  
      {images.map((img, index) => (
        <div key={index} aria-label={img.alt} className="BrandImages">
          
          <img src={img.Brandimage} alt="" />

        </div>
      ))}
    </div>
  );
};