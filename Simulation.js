// State for the cells.
const State = {
	DEAD: 0,
	ALIVE: 1
}

let Cells = [];
let CellSize = 5;
let XSize = 360; // Number of cells in X.
let YSize = 165; // Number of cells in Y.

let time = 0; // Time between generations.
let simulate = false; // Simulation started.

// Sets up the simulation.
function setup()
{
	createCanvas(5000, 5000); // Create big enough canvas to fit all cells in future.
	background(180); // Color background.

	Init(XSize, YSize, false); // Initialize cells.
	DrawInputBoxes(); // Draw the Input boxes to take the inputs.
}

// Draws every frame.
function draw()
{
	// Calculate time.
	time += deltaTime / 1000;

	// Time until next generation.
	if (time >= 0)
	{
		time = 0; // Reset time.
		background(180); // Recolor background.
		
		DrawCells(XSize, YSize, CellSize); // Draw Cells.
	}

	// Show the input boxes while simulation has not started.
	if (!simulate)
	{
		DrawInputsText();
	}
}

// Initialize cells.
function Init(_xSize, _ySize, randomize)
{
	for (let y = 0; y < _ySize; y++)
	{
		Cells[y] = [];

		for (let x = 0; x < _xSize; x++)
		{
			// Either make the state random for each cell or keep it dead.
			if (!randomize)
				Cells[y][x] = new Cell(x, y, State.DEAD);
			else
				Cells[y][x] = new Cell(x, y, Math.floor(Math.random() * 2));
		}
	}
}

// Draws the text for the input boxes.
function DrawInputsText()
{
    text('X:', 10, 20);
    text('Y:', 175, 20);
    text('Cell Size:', 350, 20);
}

// Draws the input boxes.
function DrawInputBoxes()
{
	// Take X Size.
    let inputXSize = createInput(360, int);
    inputXSize.size(100, 25);
    inputXSize.position(35, 8);

	// Take Y Size.
    let inputYSize = createInput(165, int);
    inputYSize.size(100, 25);
    inputYSize.position(200, 8);

	// Take Cell Size.
    let inputCellSize = createInput(5, int);
    inputCellSize.size(100, 25);
    inputCellSize.position(415, 8);
	
	// For resizing canvas.
    let resizeButton = createButton('Resize');
    resizeButton.size(100, 32);
    resizeButton.position(550, 8);
    resizeButton.mousePressed(function()
    {
        XSize = Number(inputXSize.value());
        YSize = Number(inputYSize.value());
        CellSize = Number(inputCellSize.value());
        
		createCanvas(XSize * CellSize + (Offset * 2), YSize * CellSize + (Offset * 2));
		background(180);
    });

	// Simulate using the cells drawn.
    let simulateButton = createButton('Simulate!');
    simulateButton.size(100, 32);
    simulateButton.position(675, 8);
    simulateButton.mousePressed(function()
    {
        XSize = Number(inputXSize.value());
        YSize = Number(inputYSize.value());
        CellSize = Number(inputCellSize.value());
        
        // clear();
		inputXSize.remove();
		inputYSize.remove();
		inputCellSize.remove();
		resizeButton.remove();
		simulateButton.remove();
		randomSimulateButton.remove();

		simulate = true;
		// createCanvas(XSize * CellSize + (Offset * 2), YSize * CellSize + (Offset * 2));
    });
	
	// Simulate using random cells.
    let randomSimulateButton = createButton('Random Simulate!');
    randomSimulateButton.size(100, 32);
    randomSimulateButton.position(800, 8);
    randomSimulateButton.mousePressed(function()
    {
        XSize = Number(inputXSize.value());
        YSize = Number(inputYSize.value());
        CellSize = Number(inputCellSize.value());
        
        // clear();
		inputXSize.remove();
		inputYSize.remove();
		inputCellSize.remove();
		resizeButton.remove();
		simulateButton.remove();
		randomSimulateButton.remove();

		simulate = true;
		// createCanvas(XSize * CellSize + (Offset * 2), YSize * CellSize + (Offset * 2));
		Init(XSize, YSize, true);
    });
}

// Draw the cells.
function DrawCells(_xSize, _ySize, _cellSize)
{
	// First loop - Check each cell state. Don't update the states yet.
	for (let y = 0; y < _ySize; y++)
	{
		for (let x = 0; x < _xSize; x++)
		{
			if (simulate)
			{
				Cells[y][x].CheckState(Cells);
			}
		}
	}

	// Second loop - Update the cell states.
	for (let y = 0; y < _ySize; y++)
	{
		for (let x = 0; x < _xSize; x++)
		{
			if (simulate)
			{
				Cells[y][x].UpdateState();
			}

			if (Cells[y][x].state == State.ALIVE)
			{
				// Draw a white square if cell is alive.
				fill('white');
				square(x * _cellSize, y * _cellSize, _cellSize);
			
				// Expand in X or Y when any cell reaches the edge for the first time. This makes the grid unlimited in X and Y.
				if (y == YSize - 1)
				{
					ExpandVertically();
				}

				if (x == XSize - 1)
				{
					ExpandHorizontally();
				}
			}
		}
	}
}

// Called when mouse is pressed. Calculates the cell that was clicked and toggles it ON or OFF.
function mousePressed()
{
	if (!simulate)
	{
		let x = Math.floor(mouseX / CellSize);
		let y = Math.floor(mouseY / CellSize);
	
		if (y >= 0 && y < Cells.length && x >= 0 && x < Cells[0].length)
		{
			if (Cells[y][x].state == State.ALIVE)
			{
				Cells[y][x].state = State.DEAD;
			}
			else
			{
				Cells[y][x].state = State.ALIVE;
			}
		}
	}
}

// Expand the grid vertically.
function ExpandVertically()
{
	Cells[YSize] = [];

	for (let x = 0; x < XSize; x++)
	{
		Cells[YSize][x] = new Cell(x, YSize, State.DEAD);
	}

	YSize++;
	// createCanvas(XSize * CellSize + (Offset * 2), YSize * CellSize + (Offset * 2));
}

// Expand the grid horizontally.
function ExpandHorizontally()
{
	for (let y = 0; y < YSize; y++)
	{
		Cells[y][XSize] = new Cell(XSize, y, State.DEAD);
	}

	XSize++;
	// createCanvas(XSize * CellSize + (Offset * 2), YSize * CellSize + (Offset * 2));
}