namespace Pets.API.Models.DTO
{
    
    public class EventDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public ImpactType Impact { get; set; }
    }

    public enum ImpactType
    {
        Health = 0,
        Hunger = 1,
        Happiness = 2
    }
}