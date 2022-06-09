// State for the cells.
const State = {
	DEAD: 0,
	ALIVE: 1
}

let Cells = [];
let CellSize = 5;
let XSize = 360; // Number of cells in X.
let YSize = 165; // Number of cells in Y.

let Time = 0;
let TimeToWait = 0; // Time to wait between generations.
let Simulate = false; // Simulation started.

let Iterations = 0;

// Sets up the simulation.
function setup()
{
	createCanvas(XSize * CellSize, YSize * CellSize); // Create Canvas.
	background(180); // Color background.

	Init(XSize, YSize, false); // Initialize cells.
	DrawInputBoxes(); // Draw the Input boxes to take the inputs.
}

// Draws every frame.
function draw()
{
	// Calculate time.
	Time += deltaTime / 1000;

	// Time until next generation.
	if (Time >= TimeToWait)
	{
		Time = 0; // Reset time.
		background(180); // Recolor background.
		
		DrawCells(XSize, YSize, CellSize); // Draw Cells.

		if (Simulate)
		{
			fill('black');
			textSize(16);
			text('Generations: ' + Iterations, 800, 20);
		}
	}

	// Show the input boxes while simulation has not started.
	if (!Simulate)
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
    text('Y:', 150, 20);
    text('Cell Size:', 300, 20);
    text('Time Interval (sec):', 475, 20);
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
    inputYSize.position(180, 8);

	// Take Cell Size.
    let inputCellSize = createInput(5, int);
    inputCellSize.size(100, 25);
    inputCellSize.position(360, 8);

	// Take Time Interval.
    let inputTime = createInput(0, int);
    inputTime.size(100, 25);
    inputTime.position(590, 8);
	
	// For resizing canvas.
    let resizeButton = createButton('Resize');
    resizeButton.size(100, 32);
    resizeButton.position(725, 8);
    resizeButton.mousePressed(function()
    {
		UpdateInputs();
		createCanvas(XSize * CellSize, YSize * CellSize); // Resize canvas.
    });

	// Simulate using the cells drawn.
    let simulateButton = createButton('Simulate!');
    simulateButton.size(100, 32);
    simulateButton.position(850, 8);
    simulateButton.mousePressed(function()
    {
		UpdateInputs();
        RemoveInputs();
		Simulate = true;
		createCanvas(XSize * CellSize, YSize * CellSize); // Resize canvas.
    });
	
	// Simulate using random cells.
    let randomSimulateButton = createButton('Random Simulate!');
    randomSimulateButton.size(100, 32);
    randomSimulateButton.position(975, 8);
    randomSimulateButton.mousePressed(function()
    {
		Simulate = true;

		UpdateInputs();
        RemoveInputs();
		Init(XSize, YSize, true);
		createCanvas(XSize * CellSize, YSize * CellSize); // Resize canvas.
    });

	function UpdateInputs()
	{
		XSize = Number(inputXSize.value());
        YSize = Number(inputYSize.value());
        CellSize = Number(inputCellSize.value());
		TimeToWait = Number(inputTime.value());
	}

	function RemoveInputs()
	{
		inputXSize.remove();
		inputYSize.remove();
		inputCellSize.remove();
		inputTime.remove();
		resizeButton.remove();
		simulateButton.remove();
		randomSimulateButton.remove();
	}
}

// Draw the cells.
function DrawCells(_xSize, _ySize, _cellSize)
{
	// First loop - Check each cell state. Don't update the states yet.
	for (let y = 0; y < _ySize; y++)
	{
		for (let x = 0; x < _xSize; x++)
		{
			if (Simulate)
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
			if (Simulate)
			{
				Cells[y][x].UpdateState();
			}

			if (Cells[y][x].state == State.ALIVE)
			{
				// Draw a white square if cell is alive.
				fill('white');
				square(x * _cellSize, y * _cellSize, _cellSize);
			}
		}
	}

	Iterations++;
}

// Called when mouse is pressed. Calculates the cell that was clicked and toggles it ON or OFF.
function mousePressed()
{
	if (!Simulate)
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