import React from 'react';

const Message = ({ title, desc, type = 'default' }) => {
  const baseClass = 'rounded-md px-4 py-3 shadow-md border-l-4 text-sm';
  const styles = {
    success: 'bg-white text-[rgb(var(--primary))] border-[rgb(var(--primary))]',
    error: 'bg-red-50 text-red-800 border-red-600',
    default: 'bg-[rgb(var(--background))] text-[rgb(var(--text))] border-[rgb(var(--primary))]',
  };

  return (
    <div className={`${baseClass} ${styles[type] || styles.default}`}>
      <p className="font-semibold">{title}</p>
      {desc && <p className="mt-1 opacity-80">{desc}</p>}
    </div>
  );
};

export default Message;
