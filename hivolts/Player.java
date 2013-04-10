import java.awt.*;
/**
 * Creates a subclass of Unit that can move and has a paint method.
 * @author Max Bernstein, Chris Hinstorff, Marco Valente
 *
 */
public class Player extends Unit {
	/**
	 * Creates a player with an x coordinate x, y coordinate y, and color c
	 * @param x the x coordinate
	 * @param y the y coordinate
	 * @param c the color
	 */
    public Player(int x, int y, Color c) {
        xcoord = x;
        ycoord = y;
        color = c;
    }
    /**
     * Moves the player to the set coordinate
     * @param x the x coordinate
     * @param y the y coordinate
     */
    public void move(int x, int y) {
	setX(x);
	setY(y);
    }
    /**
     * Draws the player, implementing the method in the Unit superclass.
     */
    public void paint(Graphics g) {
        g.setColor(color);
        g.fillOval(xcoord * Globals.GRID_SIZE + (Globals.GRID_SIZE - Globals.UNIT_SIZE) / 2, ycoord * Globals.GRID_SIZE + (Globals.GRID_SIZE - Globals.UNIT_SIZE) / 2, Globals.UNIT_SIZE, Globals.UNIT_SIZE);
    } 
}

