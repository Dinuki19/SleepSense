import Swal from "sweetalert2";

export const confirmDelete = async (message) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: message || "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e74c3c",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
  });

  return result.isConfirmed;
};