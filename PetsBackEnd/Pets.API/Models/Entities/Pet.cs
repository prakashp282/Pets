using System;

namespace Pets.API.Models.Entities
{
    public class Pet
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        public int Health { get; set; }

        public int Hunger { get; set; }

        public int Happiness { get; set; }

        //active or inactive status of pet true is active
        public bool status { get; set; }

        public Pet(Guid id, string name, int age = 0, int health = 100, int hunger = 0, int happiness = 100,
            bool status = true)
        {
            Id = id;
            Name = name;
            Age = age;
            Health = health;
            Hunger = hunger;
            Happiness = happiness;
            this.status = status;
        }
    }
}