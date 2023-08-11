using System.ComponentModel.DataAnnotations;

namespace Prueba_Tecnica.Models
{
    public class Task
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "La descripción no puede exceder los 100 caracteres.")]
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
    }
}
