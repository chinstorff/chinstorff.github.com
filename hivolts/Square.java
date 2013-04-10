import java.awt.*;
/**
 * Creates a square with an x coordinate, y coordinate and integer value
 * @author Max Bernstein, Chris Hinstorff, Marco Valente
 *
 */
public class Square {
    private int xcoord, ycoord, value;
    /**
     * Creates a square at (x,y)
     * @param x the x coordinate
     * @param y the y coordinate
     */
    public Square(int x, int y) {
        xcoord = x;
        ycoord = y;
        value = 0;
    }
    /**
     * Sets the squares value
     * @param v the value
     */
    public void setValue(int v) {
        value = v;
    }
    /**
     * Returns the squares value
     * @return value of the square
     */
    public int getValue() {
        return value;
    }
    /**
     * Returns the x coordinate
     * @return x coordinate
     */
    public int getX() {
        return xcoord;
    }
    /**
     * Returns the y coordinate
     * @return y coordinate
     */
    public int getY() {
        return ycoord;
    }
    /**
     * Paints the square
     * @param g the Graphics Object
     */
    public void paint(Graphics g) {
        if(value == 0) {
        }
        else if(value == 1) {
            You you = new You(xcoord, ycoord);
            you.paint(g);
        }
        else if(value == 2) {
            Mho mho = new Mho(xcoord, ycoord);
            mho.paint(g);
        }
        else if(value == 3) {
            Fence fence = new Fence(xcoord, ycoord);
            fence.paint(g);
        }
    }
}
