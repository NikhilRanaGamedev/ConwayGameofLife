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
        
        if (this.y - 1 >= 0 && this.y - 1 < list.length)
        {
            if (this.x - 1 >= 0 && this.x - 1 < list[0].length)
                list[this.y - 1][this.x - 1].state == State.ALIVE ? neighbours++ : neighbours; // Top Left

            if (this.x >= 0 && this.x < list[0].length)
                list[this.y - 1][this.x].state == State.ALIVE ? neighbours++ : neighbours; // Top
        
            if (this.x + 1 >= 0 && this.x + 1 < list[0].length)
                list[this.y - 1][this.x + 1].state == State.ALIVE ? neighbours++ : neighbours; // Top Right
        }
            
        if (this.y >= 0 && this.y < list.length)
        {
            if (this.x - 1 >= 0 && this.x - 1 < list[0].length)
                list[this.y][this.x - 1].state == State.ALIVE ? neighbours++ : neighbours; // Left
    
            if (this.x + 1 >= 0 && this.x + 1 < list[0].length)
                list[this.y][this.x + 1].state == State.ALIVE ? neighbours++ : neighbours; // Right
        }

        if (this.y + 1 >= 0 && this.y + 1 < list.length)
        {
            if (this.x - 1 >= 0 && this.x - 1 < list[0].length)
                list[this.y + 1][this.x - 1].state == State.ALIVE ? neighbours++ : neighbours; // Bottom Left
    
            if (this.x >= 0 && this.x < list[0].length)
                list[this.y + 1][this.x].state == State.ALIVE ? neighbours++ : neighbours; // Bottom
    
            if (this.x + 1 >= 0 && this.x + 1 < list[0].length)
                list[this.y + 1][this.x + 1].state == State.ALIVE ? neighbours++ : neighbours; // Bottom Right
        } 

        return neighbours;
    }
}