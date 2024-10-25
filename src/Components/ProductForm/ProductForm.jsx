/* eslint-disable react/prop-types */

const ProductForm = ({
  productData,
  setProductData,
  onUpload,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="edit-form">
      <input
        type="text"
        value={productData.title}
        onChange={(e) =>
          setProductData({ ...productData, title: e.target.value })
        }
        className="edit-input"
        placeholder="Product Title"
      />
      <textarea
        value={productData.description}
        onChange={(e) =>
          setProductData({ ...productData, description: e.target.value })
        }
        className="edit-input"
        placeholder="Product Description"
      />
      <input
        type="number"
        value={productData.price}
        onChange={(e) =>
          setProductData({ ...productData, price: Number(e.target.value) })
        }
        className="edit-input"
        placeholder="Price"
      />
      <input
        type="number"
        value={productData.stock}
        onChange={(e) =>
          setProductData({ ...productData, stock: Number(e.target.value) })
        }
        className="edit-input"
        placeholder="Stock"
      />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={onUpload}
        className="upload-input"
      />

      <button type="submit" className="save-button">
        Save
      </button>
      <button type="button" className="cancel-button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default ProductForm;
