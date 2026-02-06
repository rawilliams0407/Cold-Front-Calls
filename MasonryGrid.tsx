import * as React from 'react';
import { motion } from 'framer-motion';

// Simple utility to merge class names without external dependencies
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The number of columns to display.
   * If omitted, use Tailwind 'columns-*' classes in className for responsiveness.
   */
  columns?: number;
  /**
   * The gap between items in the grid, corresponding to Tailwind's spacing scale.
   * @default 4
   */
  gap?: number;
}

const MasonryGrid = React.forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ className, columns, gap = 4, children, ...props }, ref) => {
    
    const style: React.CSSProperties = {
      columnGap: `${gap * 0.25}rem`, // Converts gap unit to rem
    };

    // Only apply inline column count if explicitly provided (overrides CSS classes)
    if (columns) {
      style.columnCount = columns;
    }

    // Animation variants for child elements
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };

    return (
      <div ref={ref} style={style} className={cn('w-full', className)} {...props}>
        {React.Children.map(children, (child) => (
          <motion.div
            className="mb-4 break-inside-avoid" // Prevents items from breaking across columns
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Animate when 20% of the item is visible
          >
            {child}
          </motion.div>
        ))}
      </div>
    );
  }
);

MasonryGrid.displayName = 'MasonryGrid';

export { MasonryGrid };
