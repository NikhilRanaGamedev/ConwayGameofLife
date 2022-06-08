class Cell
{
    constructor(x, y, state)
    {
        this.x = x;
        this.y = y;
        this.state = state;
        this.changeTo = state;
    }

    CheckState(list)
    {
        let neighbours = this.CheckNeighbours(list);

        if (this.state == State.ALIVE)
        {
            if (neighbours <= 1 || neighbours >= 4)
            {
                this.changeTo = State.DEAD;
            }
            else
            {
                this.changeTo = State.ALIVE;
            }
        }
        else if (neighbours == 3)
        {
            this.changeTo = State.ALIVE;
        }
    }

    UpdateState()
    {
        this.state = this.changeTo;
    }

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