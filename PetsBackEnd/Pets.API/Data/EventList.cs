using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using Pets.API.Models.Entities;

namespace Pets.API.Data
{
    public static class EventList
    {
        /// <summary>
        /// A static list to store Events.
        /// </summary>
        private static readonly List<Event> Events= new List<Event>
        {
            new Event("disaster", "A disaster Occured", new Impact( -5, 5, -10), 5, false),
            new Event("plague", "Oh no! there was a plague", new Impact( -10, 5, -3), 6, false),
            new Event("gift", "You got a Gift", new Impact( 1, 0, 10), 3, true),
            new Event("surprise", "hey there was a surprise at the DOOR", new Impact( 5, 1, 5), 8, true),
            new Event("injury", "You got injured while playing", new Impact( -10, 5, -10), 3, false),
            new Event("fire", "there was a fire in the shelter.", new Impact( -2, 0, -10), 5, false),
            new Event("flood", "Tap was left house got flooded.", new Impact( -5, 10, -10), 5, false),
            new Event("visit", " Your best friend Came to visit you", new Impact( 5, 0, 10), 10, true),
        };

        /// <summary>
        /// From the static list we return a Random event based on Random function.
        /// </summary>
        /// <returns>Event</returns>
        /// <exception cref="Exception"></exception>
        public static Event GetRandomEvent()
        {
            try
            {
                var random = new Random();  
                int index = random.Next(Events.Count);
                return Events[index];
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception("An error Occured.");
            }

        }

    }
}