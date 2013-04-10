/*
  This is the Fence class. It allows us to s
*/

import java.awt.*;
/**
 * Creates a Fence subclass of Unit
 * @author Max Bernstein, Chris Hinstorff, Marco Valente
 *
 */
public class Fence extends Unit {
	/**
	 * Creates a fence at the specified coordinates
	 * @param x the x coordinate
	 * @param y the y coordinate
	 */
  public Fence(int x, int y) {
    xcoord = x;
    ycoord = y;
    color = Color.ORANGE;
  }
  /**
   * Paints the fence
   * @param g Graphics Object g
   */
  public void paint(Graphics g) {
    g.setColor(color);
    g.fillRect(xcoord * Globals.GRID_SIZE + (Globals.GRID_SIZE - Globals.UNIT_SIZE) / 2, ycoord * Globals.GRID_SIZE + (Globals.GRID_SIZE - Globals.UNIT_SIZE) / 2, Globals.UNIT_SIZE, Globals.UNIT_SIZE);
  }
}
