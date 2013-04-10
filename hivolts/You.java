import java.awt.*;
/**
 * Creates a subclass of Player that has a default and custom
 * constructor that are both blue in color.
 * @author Max Bernstein, Chris Hinstorff, Marco Valente
 *
 */
public class You extends Player {
	/**
	 * Creates a blue You at the coordinate (0,0)
	 */
    public You() {
        super(0, 0, Color.BLUE);
    }
    /**
     * Creates a blue You at the coordinate (x,y)
     * @param x the x coordinate
     * @param y the y coordinate
     */
    public You(int x, int y) {
        super(x, y, Color.BLUE);
    }
}
