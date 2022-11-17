using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pets.API.Data;
using Pets.API.Models.DTO;
using Pets.API.Models.Entities;

namespace Pets.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetsController : Controller
    {

        private readonly PetsDbContext _petsDbContext;

        public PetsController(PetsDbContext petsDbContext)
        {
            this._petsDbContext = petsDbContext;
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetPet(Guid id)
        {
            return Ok(await _petsDbContext.Pets.FirstOrDefaultAsync(x => x.Id == id));
        }

        [HttpPost]
        public async Task<IActionResult> AddPet(Pet pet)
        {
            pet = new Pet(Guid.NewGuid(), pet.Name);
            
            await _petsDbContext.Pets.AddAsync(pet);
            await _petsDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPet), new { id = pet.Id }, pet);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> TriggerEvent(Guid id, EventDTO eventDto)
        {
            var pet = await _petsDbContext.Pets.FindAsync(id);
            if (pet == null)
            {
                return NotFound();
            }
            
            
            //update based on event.
            pet.Happiness = pet.Happiness--; 
            
            _petsDbContext.SaveChangesAsync();

            return Ok(pet);        }
        
    }
}