# Conway's Game of Life
The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.

# Conway's Rules
Conway's universe consists of 4 rules -

1. A live cell with 1 or 0 neighbours dies, as if by isolation or loneliness.<br>
![Isolated](https://user-images.githubusercontent.com/38834548/172580671-99c514e6-0fa6-49ac-8e14-1bcc2a8d79f1.png)

2. A live cell with 4 or more neighbours dies, as if by overpopulation.<br>
![Overpopulation](https://user-images.githubusercontent.com/38834548/172580911-b01d61dd-772c-4c7a-9c6a-db3e26f6e72f.png)

3. A live cell with 2 or 3 neighbours survives, as if by forming a family.<br>
![Survive](https://user-images.githubusercontent.com/38834548/172580974-f00688b7-c40f-4755-b29b-591e96bbaf90.png)

4. A dead cell with 3 neighbours becomes alive, as if by reproduction.<br>
![Revive](https://user-images.githubusercontent.com/38834548/172581316-ba0e5ce9-adf0-435d-b818-6370fde4b7a6.png)

# Simulation
Using the above four rules, a no player game can be started where Conway's universe can be observed. The simulation is basically setup on on its starting pattern.

# Code
1. We take a grid and randomly assign each cell as either ALIVE or DEAD.
2. Loop through the cells and cast the 4 rules upon them.
3. Update the cells state.
4. Rinse and Repeat Step 2 and 3.

NOTE: The rules are casted upon each cell at each generation (each loop). So first check the state a cell should change to. Store it. And once all the cells have been checked, then update them.
