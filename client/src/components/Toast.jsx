import { useEffect, useState } from 'react';

export default function Toast({ msg }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="toast" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.3s' }}>
      {msg}
    </div>
  );
}
