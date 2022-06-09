class Cell
{
    constructor(x, y, state)
    {
        this.x = x;
        this.y = y;
        this.state = state;
        this.stateToChangeTo = state;
    }

    // Check state of cell and change it if needed.
    CheckState(list)
    {
        // Check all 8 neighbours for this cell.
        let neighbours = this.CheckNeighbours(list);

        if (this.state == State.ALIVE)
        {
            if (neighbours <= 1 || neighbours >= 4) // Suppose the cell dies by isolation or by overpopulation.
            {
                this.stateToChangeTo = State.DEAD;
            }
            else // Suppose the cell survives.
            {
                this.stateToChangeTo = State.ALIVE;
            }
        }
        else if (neighbours == 3) // Suppose the cell is born by reproduction.
        {
            this.stateToChangeTo = State.ALIVE;
        }
    }

    // Update the state of the cell.
    UpdateState()
    {
        this.state = this.stateToChangeTo;
    }
    
    // Check the state of the 8 neighbours of this cell.
    CheckNeighbours(list)
    {
        let neighbours = 0;

        let up = this.y - 1 >= 0 ? this.y - 1 : list.length - 1;
        let down = this.y + 1 < list.length ? this.y + 1 : 0;
        let left = this.x - 1 >= 0 ? this.x - 1 : list[0].length - 1;
        let right = this.x + 1 < list[0].length ? this.x + 1 : 0;
        
        list[up][left].state == State.ALIVE ? neighbours++ : neighbours; // Top Left
        list[up][this.x].state == State.ALIVE ? neighbours++ : neighbours; // Top
        list[up][right].state == State.ALIVE ? neighbours++ : neighbours; // Top Right

        list[this.y][left].state == State.ALIVE ? neighbours++ : neighbours; // Left
        list[this.y][right].state == State.ALIVE ? neighbours++ : neighbours; // Right

        list[down][left].state == State.ALIVE ? neighbours++ : neighbours; // Bottom Left
        list[down][this.x].state == State.ALIVE ? neighbours++ : neighbours; // Bottom
        list[down][right].state == State.ALIVE ? neighbours++ : neighbours; // Bottom Right

        return neighbours;
    }
}