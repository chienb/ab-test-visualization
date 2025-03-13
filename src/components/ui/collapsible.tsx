import React, { createContext, useContext, useState } from "react";

interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
}

const CollapsibleContext = createContext<CollapsibleContextValue | undefined>(undefined);

interface CollapsibleProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
  className = "",
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  
  const toggle = () => {
    if (isControlled) {
      onOpenChange?.(!open);
    } else {
      setUncontrolledOpen(!open);
    }
  };

  return (
    <CollapsibleContext.Provider value={{ open, toggle }}>
      <div className={className}>{children}</div>
    </CollapsibleContext.Provider>
  );
};

// Define a more specific props interface for components that might have onClick
interface ElementWithOnClick {
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;
}

interface CollapsibleTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const CollapsibleTrigger: React.FC<CollapsibleTriggerProps> = ({ 
  children,
  asChild = false
}) => {
  const context = useContext(CollapsibleContext);
  
  if (!context) {
    throw new Error("CollapsibleTrigger must be used within a Collapsible");
  }
  
  // Type-safe handling for asChild pattern
  if (asChild && React.isValidElement(children)) {
    // Create a new element with all the original props plus our click handler
    const childElement = children as React.ReactElement<ElementWithOnClick>;
    const originalOnClick = childElement.props.onClick;
    
    return React.cloneElement(childElement, {
      onClick: (e: React.MouseEvent) => {
        // Call the original onClick if it exists
        if (originalOnClick) {
          originalOnClick(e);
        }
        context.toggle();
      },
    });
  }
  
  return (
    <button type="button" onClick={context.toggle}>
      {children}
    </button>
  );
};

interface CollapsibleContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CollapsibleContent: React.FC<CollapsibleContentProps> = ({ 
  children,
  className = ""
}) => {
  const context = useContext(CollapsibleContext);
  
  if (!context) {
    throw new Error("CollapsibleContent must be used within a Collapsible");
  }
  
  if (!context.open) {
    return null;
  }
  
  return <div className={className}>{children}</div>;
};
