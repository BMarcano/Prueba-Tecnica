using Microsoft.AspNetCore.Mvc;
using TaskModel = Prueba_Tecnica.Models.Task;
using System.Collections.Generic;
using System.Linq;

namespace Prueba_Tecnica.Controllers
{
    [ApiController]
    [Route("api/tasks")]

    public class TasksController : ControllerBase
    {
        private static List<TaskModel> tasks = new List<TaskModel>();
        private static int currentId = 1;

        [HttpGet]
        public ActionResult<IEnumerable<TaskModel>> GetTasks()
        {
            if (tasks.Count == 0)
            {
                return BadRequest(new {message="Actualmente no hay tareas."});
            }
            return tasks;
        }

        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<TaskModel> GetTaskById(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPost]
        public ActionResult<TaskModel> CreateTask(TaskModel newTask)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            newTask.Description = newTask.Description.Trim();
            newTask.IsCompleted = false;
            newTask.Id = currentId++;
            tasks.Add(newTask);

            return Ok(new { message = "Tarea creada con éxito.", task = newTask });
        }
    }
}
