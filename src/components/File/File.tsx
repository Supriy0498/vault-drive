import React from 'react';
import './File.css';
import { FileEntity } from "@/types/db/file";

interface FileProps {
  file: FileEntity;
  onClick?: () => void;
}

const File: React.FC<FileProps> = ({ file, onClick }) => {
  return (
    <div className="gdrive-file-card" onClick={onClick} title={file.name}>
      <div className="gdrive-file-icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="6" fill="#E8F0FE"/>
          <path d="M10 8C10 6.89543 10.8954 6 12 6H20C21.1046 6 22 6.89543 22 8V24C22 25.1046 21.1046 26 20 26H12C10.8954 26 10 25.1046 10 24V8Z" fill="#4285F4"/>
          <rect x="13" y="12" width="6" height="1.5" rx="0.75" fill="white"/>
          <rect x="13" y="15" width="6" height="1.5" rx="0.75" fill="white"/>
          <rect x="13" y="18" width="4" height="1.5" rx="0.75" fill="white"/>
        </svg>
      </div>
      <div className="gdrive-file-info">
        <div className="gdrive-file-name">{file.name}</div>
        <div className="gdrive-file-meta">
          <span className="gdrive-file-date">{file.updated_at}</span>
          <span className="gdrive-file-size">{(file.size / 1024).toFixed(1)} KB</span>
        </div>
      </div>
      <div className="gdrive-file-actions">
        <svg width="20" height="20" fill="none"><circle cx="10" cy="4" r="1.5" fill="#5F6368"/><circle cx="10" cy="10" r="1.5" fill="#5F6368"/><circle cx="10" cy="16" r="1.5" fill="#5F6368"/></svg>
      </div>
    </div>
  );
};

export default File;