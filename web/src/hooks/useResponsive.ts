import { useEffect, useState } from 'react';

export function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    const isMatch = window.outerWidth <= 800;
    setIsMobile(isMatch);
  };

  useEffect(() => {
    checkIsMobile();

    const handleResize = () => {
      checkIsMobile();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {      
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile };
}
