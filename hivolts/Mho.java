import java.awt.*;
/**
 * Creates a subclass of Player that has a default and custom
 * constructor that are both red in color. 
 * @author Max Bernstein, Chris Hinstorff, Marco Valente
 *
 */
public class Mho extends Player {
	/**
	 * Creates a red Mho at coordinates (0,0)
	 */
    public Mho() {
        super(0, 0, Color.RED);
    }
    /**
     * Creates a red Mho at coordinates (x,y)
     * @param x the x coordinate
     * @param y the y coordinate
     */
    public Mho(int x, int y) {
        super(x, y, Color.RED);
    }
}
