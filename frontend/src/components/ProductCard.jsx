import { EditIcon, TrashIcon, DollarSignIcon } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useAuthStore } from "../store/useAuthStore"; 
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; 

function ProductCard({ product }) {
  const { deleteProduct, fetchProduct, setFormData } = useProductStore();
  const { user, isAuthenticated } = useAuthStore(); 

  const handleDelete = async () => {
    
    if (!isAuthenticated || user?.role !== "admin") {
      toast.error("Admin access required");
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(product.id);
    }
  };

  const handleEdit = async () => {
    
    if (!isAuthenticated || user?.role !== "admin") {
      toast.error("Admin access required");
      return;
    }

    await fetchProduct(product.id);
    document.getElementById("edit_product_modal").showModal();
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
      <figure className="px-6 pt-6">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </figure>
      
      <div className="card-body">
        <h2 className="card-title text-lg font-bold line-clamp-2">
          {product.name}
        </h2>
        
        <div className="flex items-center gap-1 text-primary font-semibold text-xl">
          <DollarSignIcon className="size-5" />
          {product.price}
        </div>
        
        <div className="card-actions justify-between items-center mt-4">
          <Link 
            to={`/product/${product.id}`}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>
          
          {/* ADMIN CONTROLS - MODIFY THIS */}
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="btn btn-ghost btn-sm text-blue-600 hover:bg-blue-50"
              title="Edit Product"
            >
              <EditIcon className="size-4" />
            </button>
            
            <button
              onClick={handleDelete}
              className="btn btn-ghost btn-sm text-red-600 hover:bg-red-50"
              title="Delete Product"
            >
              <TrashIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
