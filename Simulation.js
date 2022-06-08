const State = {
	DEAD: 0,
	ALIVE: 1
}

let Cells = [];
let Offset = 0;
let CellSize = 5;
let XSize = 360;
let YSize = 165;

let time = 0;
let simulate = false;

function setup()
{
	// createCanvas(XSize * CellSize + (Offset * 2), YSize * CellSize + (Offset * 2));
	createCanvas(5000, 5000);
	background(180);

	Init(XSize, YSize, false);
	DrawInputBoxes();
}

function draw()
{
	time += deltaTime / 1000;

	if (time >= 0)
	{
		time = 0;
		background(180);
		
		DrawCells(XSize, YSize, Offset, CellSize);
	}

	if (!simulate)
	{
		DrawInputsText();
	}
}

function Init(_xSize, _ySize, randomize)
{
	for (let y = 0; y < _ySize; y++)
	{
		Cells[y] = [];

		for (let x = 0; x < _xSize; x++)
		{
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
    let inputXSize = createInput(360, int);
    inputXSize.size(100, 25);
    inputXSize.position(35, 8);

    let inputYSize = createInput(165, int);
    inputYSize.size(100, 25);
    inputYSize.position(200, 8);

    let inputCellSize = createInput(5, int);
    inputCellSize.size(100, 25);
    inputCellSize.position(415, 8);
	
	// Generate the maze on button click.
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

    // Generate the maze on button click.
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
	
	// Generate the maze on button click.
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

function DrawCells(_xSize, _ySize, _offset, _cellSize)
{
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
				fill('white');
				square(x * _cellSize + _offset, y * _cellSize + _offset, _cellSize);
			
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

function mousePressed()
{
	if (!simulate)
	{
		// let x = Math.ceil((mouseX - Offset * 2) / CellSize);
		// let y = Math.ceil((mouseY - Offset * 2) / CellSize);
		
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

function ExpandHorizontally()
{
	for (let y = 0; y < YSize; y++)
	{
		Cells[y][XSize] = new Cell(XSize, y, State.DEAD);
	}

	XSize++;
	// createCanvas(XSize * CellSize + (Offset * 2), YSize * CellSize + (Offset * 2));
}