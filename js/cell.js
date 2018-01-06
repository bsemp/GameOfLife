export class Cell {
  constructor(x, y, status) {
    this.x = x;
    this.y = y;
    this.status = status;
  }
	
  isAlive(grid) {
    let livingNeighbors = 0;
    // Check Neighbors status
    for (let i=-1; i<=1; i++) {
      for (let j=-1; j<=1; j++) {
        let x = ((this.x+i)+grid.length) % grid.length; // wrap neighbor (consider opposite edge if cell is on edge)
        let y = ((this.y+j)+grid[x].length) % grid[x].length; // wrap neighbor (consider opposite edge if cell is on edge)
        // Ignore self
        if (grid[x][y] === this) {
          continue;
        }
        // Count number of living neighbors
        if (grid[x][y].status) {
          livingNeighbors++;
        }
      }
    }
    if (livingNeighbors === 3) {
      return true; // 3 neighbors => a new cell appears
    } else if (livingNeighbors < 2 || livingNeighbors > 3) {
      return false; // < 2 neighbors => dies by underpopulation, > 3 neighbors => dies by overpopulation
    } else {
      return !!this.status; // cells keep its status
    }
  }	
}
