import React from 'react';

// Responsive Container
export const Container = ({ 
  children, 
  maxWidth = '7xl', 
  className = '',
  padding = true 
}) => {
  const maxWidthClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    'full': 'max-w-full'
  };

  const paddingClasses = padding ? 'px-4 sm:px-6 lg:px-8' : '';

  return (
    <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses} ${className}`}>
      {children}
    </div>
  );
};

// Responsive Grid
export const Grid = ({ 
  children, 
  cols = 1, 
  gap = 4, 
  responsive = {}, 
  className = '' 
}) => {
  const baseColClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2', 
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    12: 'grid-cols-12'
  };

  const gapClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8'
  };

  const responsiveClasses = Object.entries(responsive)
    .map(([breakpoint, colCount]) => {
      const prefix = breakpoint === 'base' ? '' : `${breakpoint}:`;
      return `${prefix}${baseColClasses[colCount]}`;
    })
    .join(' ');

  return (
    <div className={`grid ${baseColClasses[cols]} ${gapClasses[gap]} ${responsiveClasses} ${className}`}>
      {children}
    </div>
  );
};

// Responsive Flex
export const Flex = ({ 
  children, 
  direction = 'row', 
  align = 'start', 
  justify = 'start', 
  wrap = false,
  gap = 0,
  responsive = {},
  className = '' 
}) => {
  const directionClasses = {
    row: 'flex-row',
    'row-reverse': 'flex-row-reverse',
    col: 'flex-col',
    'col-reverse': 'flex-col-reverse'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };

  const gapClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8'
  };

  const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';

  const responsiveClasses = Object.entries(responsive)
    .map(([breakpoint, config]) => {
      const prefix = breakpoint === 'base' ? '' : `${breakpoint}:`;
      const classes = [];
      
      if (config.direction) classes.push(`${prefix}${directionClasses[config.direction]}`);
      if (config.align) classes.push(`${prefix}${alignClasses[config.align]}`);
      if (config.justify) classes.push(`${prefix}${justifyClasses[config.justify]}`);
      if (config.gap !== undefined) classes.push(`${prefix}${gapClasses[config.gap]}`);
      
      return classes.join(' ');
    })
    .join(' ');

  return (
    <div className={`flex ${directionClasses[direction]} ${alignClasses[align]} ${justifyClasses[justify]} ${wrapClass} ${gapClasses[gap]} ${responsiveClasses} ${className}`}>
      {children}
    </div>
  );
};

// Responsive Stack
export const Stack = ({ 
  children, 
  spacing = 4, 
  divider, 
  className = '' 
}) => {
  const spacingClasses = {
    0: 'space-y-0',
    1: 'space-y-1',
    2: 'space-y-2',
    3: 'space-y-3',
    4: 'space-y-4',
    6: 'space-y-6',
    8: 'space-y-8'
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div className={`${spacingClasses[spacing]} ${className}`}>
      {divider ? (
        childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < childrenArray.length - 1 && divider}
          </React.Fragment>
        ))
      ) : (
        children
      )}
    </div>
  );
};

// Responsive Show/Hide
export const Show = ({ 
  above, 
  below, 
  only, 
  children 
}) => {
  const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl'];
  
  let classes = [];

  if (above) {
    classes.push('hidden');
    const index = breakpoints.indexOf(above);
    if (index !== -1) {
      classes.push(`${above}:block`);
    }
  }

  if (below) {
    const index = breakpoints.indexOf(below);
    if (index !== -1) {
      classes.push('block');
      classes.push(`${below}:hidden`);
    }
  }

  if (only) {
    classes.push('hidden');
    if (Array.isArray(only)) {
      only.forEach(bp => classes.push(`${bp}:block`));
    } else {
      classes.push(`${only}:block`);
    }
  }

  return (
    <div className={classes.join(' ')}>
      {children}
    </div>
  );
};

// Responsive AspectRatio
export const AspectRatio = ({ 
  ratio = '16/9', 
  children, 
  className = '' 
}) => {
  const ratioClasses = {
    '1/1': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '3/2': 'aspect-[3/2]',
    '2/1': 'aspect-[2/1]'
  };

  return (
    <div className={`relative ${ratioClasses[ratio] || `aspect-[${ratio}]`} ${className}`}>
      {children}
    </div>
  );
};

// Responsive Spacer
export const Spacer = ({ 
  size = 4, 
  axis = 'y', 
  responsive = {} 
}) => {
  const sizeClasses = {
    y: {
      1: 'h-1',
      2: 'h-2',
      3: 'h-3',
      4: 'h-4',
      6: 'h-6',
      8: 'h-8',
      12: 'h-12',
      16: 'h-16',
      20: 'h-20'
    },
    x: {
      1: 'w-1',
      2: 'w-2',
      3: 'w-3',
      4: 'w-4',
      6: 'w-6',
      8: 'w-8',
      12: 'w-12',
      16: 'w-16',
      20: 'w-20'
    }
  };

  const responsiveClasses = Object.entries(responsive)
    .map(([breakpoint, sizeValue]) => {
      const prefix = breakpoint === 'base' ? '' : `${breakpoint}:`;
      return `${prefix}${sizeClasses[axis][sizeValue]}`;
    })
    .join(' ');

  return (
    <div className={`${sizeClasses[axis][size]} ${responsiveClasses}`} />
  );
};

export default {
  Container,
  Grid,
  Flex,
  Stack,
  Show,
  AspectRatio,
  Spacer
};
