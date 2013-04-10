import java.awt.*;
/**
 *
 * @author Max Bernstein, Chris Hinstorff, Marco Valente
 * Creates a Unit that has a color and an x and y coordinate
 */
public abstract class Unit {
  protected static Color color;
  protected static int xcoord, ycoord;
  /**
   * Sets the x coordinate of the Unit
   * @param x the new x coordinate
   */
  public void setX(int x) {
    xcoord = x;
  }
  /**
   * Sets the y coordinate of the Unit
   * @param y the new y coordinate
   */
  public void setY(int y) {
    ycoord = y;
  }
  /**
   * Returns the x coordinate of the Unit
   * @return x coordinate
   */
  public int getX() {
    return xcoord;
  }
  /**
   * Returns the y coordinate of the Unit
   * @return y coordinate
   */
  public int getY() {
    return ycoord;
  }
  /**
   * Paints the Unit. Unimplemented.
   * @param g the Graphics object
   */
  public abstract void paint(Graphics g);
}
