import { useEffect, useRef } from 'react';

const useDocumentTitle = (title: string) => {
  // 老的title
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    // 新的title
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      document.title = oldTitle;
    };
  }, [oldTitle]);
};

export default useDocumentTitle;
