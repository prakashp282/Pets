# Pets - A Virtual Pets Simulation Game http://prakashp282.github.io/Pets/PetsUI/

 A friendly pet blob with a which shows stats panel health/hunger/happiness and has a set of interaction buttons feed/clean/play which Implement more advanced logic on pet stats (Health/Hunger/Happiness) and uses the Backend Fetch, process, and display events from Events API - https://pets-beta.vercel.app/event

- A detailed requirement was posted on https://github.com/chingu-voyages/soloproject-tier3-virtualpet. 
![image](https://user-images.githubusercontent.com/41587867/206858374-30d6c73d-0aa0-404f-91cc-c9cccb52c0ce.png)

Please note :
- the spirte doesn't have any expression as of now.
- and the events returned from API are random and may not make sense.

## Functionality

    At every X (i.e. 1000ms, updatable via speed control) interval, the 'pet day' increases by 1

Every pet day:

    Age should update showing the pet day
    Health should decrease
    Hunger should increase
    Happiness should decrease

When Health gets to zero the game should end.
        As the pet gets hungry:
            The interaction to increase happiness should become less effective
            Happiness should decrease faster each day
        As the pet becomes less happy:
            The interaction to decrease hunger should become less effective
            Hunger should increase faster each day
        Hunger and Happinenss should make:
            The interaction to increase health should become less effective
            Health should decrease faster each day

## API Provides

    Type- binary true for positive impact.
    Title, to summarize the event
    Description, using the type and title to explain the event
    Impact, on pets Health/Hunger/Happiness


---
## Requirements
Front End is basic HTML, JavaScript and little bit of CSS, haven't used any liberaries.
This uses Sprits from  - https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacter.png THANKS TO @DrewConley for the resource.
For development and tinkering backend, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.
    $ npm install npm -g
## Install
    $ git clone https://github.com/prakashp282/Pets
    $ cd Pets/PetsBackEnd
    $ npm install

## Running the project
    $ npm start
    

## Simple build for production
    $ npm build
