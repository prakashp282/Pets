namespace Pets.API.Models.Entities
{
    public class Event
    {
        //Event title.
        public string Title { get; set; }
        public string Description { get; set; }
        //Type can be positive or a negative event. Default true is positive.
        public bool Type { get; set; }
        public Impact Impact { get; set; }
        //when will the next event occur.
        //Each event comes with a nextEvent value. This integer should be added to the apps current pet day to determine when to make the next event request
        public int NextEvent { get; set; }
        
        public Event(string title, string description, Impact impact, int nextEvent, bool type = true)
        {
            Type = type;
            Title = title;
            Description = description;
            Impact = impact;
            NextEvent = nextEvent;
        }
    }
    
    public class Impact
    {
        public int Health { get; set; }
        public int Hunger { get; set; }
        public int Happiness { get; set; }
        public Impact(int health, int hunger, int happiness)
        {
            Health = health;
            Hunger = hunger;
            Happiness = happiness;
        }
    }
}