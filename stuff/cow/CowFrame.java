import java.awt.*;
import javax.swing.JFrame;

public class CowFrame extends JFrame {
   private final Color BISQUE = new Color(0xcdb79e);
   
   public CowFrame () {
      init();
   }
   
   public void init() {
      setSize(700,600);
      setBackground(Color.WHITE);
      repaint();
   }
   
   public void paint(Graphics g) {
      g.setColor(Color.PINK);
      g.fillOval(150, 250, 40, 90);
      g.fillOval(170, 250, 45, 80);
      g.setColor(BISQUE);
      g.fillRect(50, 100, 400, 200);
      g.fillRect(440, 250, 10, 200);
      g.fillRect(420, 250, 10, 180);
      g.fillRect(50, 250, 10, 180);
      g.fillRect(70, 250, 10, 200);
      g.setColor(Color.BLACK);
      g.drawOval(350, 50, 200, 100);
      g.fillOval(80, 160, 90, 45);
      g.fillOval(300, 230, 90, 45);
      g.fillOval(220, 130, 45, 45);
      g.fillOval(500, 80, 20, 20);
      g.setColor(Color.WHITE);
      g.fillOval(510, 80, 13, 13);
      g.setColor(Color.BLACK);
      g.drawOval(500, 80, 20, 20);


   }
}