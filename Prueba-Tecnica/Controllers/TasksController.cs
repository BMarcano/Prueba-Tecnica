using Microsoft.AspNetCore.Mvc;
using TaskModel = Prueba_Tecnica.Models.Task;
using System.Collections.Generic;
using System.Linq;
using System;

namespace Prueba_Tecnica.Controllers
{
    [ApiController]
    [Route("api/tasks")]

    public class TasksController : ControllerBase
    {
        private static List<TaskModel> tasks = new List<TaskModel>();
        private static Guid currentId;


        [HttpGet]
        public ActionResult<IEnumerable<TaskModel>> GetTasks()
        {
            if (tasks.Count == 0)
            {
                return Ok(new { message = "Actualmente no hay tareas." });
            }
            return Ok(tasks);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public ActionResult<TaskModel> GetTaskById(Guid id)
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
            newTask.Id = Guid.NewGuid();
            tasks.Add(newTask);

            return Ok(new { message = "Tarea creada con éxito.", task = newTask });
        }
    }
}
