/* eslint-disable react/prop-types */
const ImagePreview = ({ images, thumbnail, onDelete, onSelect }) => {
  return (
    <div className="image-preview">
      {images.map((image, index) => (
        <div
          key={index}
          className={`image-container ${
            image === thumbnail ? "selected-thumbnail" : ""
          }`}
          onClick={() => onSelect(image)}
        >
          <img
            src={image}
            alt={`Product Image ${index}`}
            className="image-thumb"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(index);
            }}
            className="delete-button"
          >
            &times;
          </button>
          {image === thumbnail && (
            <span className="thumbnail-label">Thumbnail</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;
