using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pets.API.Data;

namespace Pets.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetsController : Controller
    {
        //Stage 1 : Just the Event triggers.
        /// <summary>
        /// An Api which return random Events.
        /// first request is sent after 5 pet days to fetch events.we also return next event days to trigger next event.
        /// </summary>
        /// <returns>Event</returns>
        [HttpGet]
        [Route("/event")]
        public async Task<IActionResult> TriggerEvent()
        {
            try
            {
                //Idea is to store different kind of event in a list and then use random to return a random event.
                return Ok(EventList.GetRandomEvent());
            }
            catch (Exception ex)
            {
                return Problem(ex.ToString());
            }
        }
        
        
        
        //Stage 2 : Save pets sessions make it available for different sessions. 
        // Post discussion this isn't required in MVP so dropping idea for now.
        
        // private readonly PetsDbContext _petsDbContext;
        // private PetsService.PetsService _petsService;
        // public PetsController(PetsDbContext petsDbContext)
        // {
        //     this._petsDbContext = petsDbContext;
        // }
        //
        // [HttpGet]
        // [Route("{id:Guid}")]
        // public async Task<IActionResult> GetPet(Guid id)
        // {
        //     return Ok(await _petsDbContext.Pets.FirstOrDefaultAsync(x => x.Id == id));
        // }
        //
        // [HttpPost]
        // public async Task<IActionResult> AddPet(Pet pet)
        // {
        //     pet = new Pet(Guid.NewGuid(), pet.Name);
        //
        //     await _petsDbContext.Pets.AddAsync(pet);
        //     await _petsDbContext.SaveChangesAsync();
        //     return CreatedAtAction(nameof(GetPet), new { id = pet.Id }, pet);
        // }
    }
}