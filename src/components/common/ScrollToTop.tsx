import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const headerElement = document.querySelector('header');
          const headerHeight = headerElement ? headerElement.getBoundingClientRect().height : 120;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = Math.max(0, elementPosition - headerHeight - 14);

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 160);
      return () => clearTimeout(timer);
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }, [pathname, hash]);

  return null;
}
