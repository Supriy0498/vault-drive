
export function getFileTypeLabel(mimeType: string, filename = '') {
  const mime = (mimeType || '').toLowerCase().trim();
  const ext = filename ? filename.toLowerCase().split('.').pop() : '';

  const hasExt = (extensions: string[]) => extensions.includes(ext);

  if (mime.startsWith('image/') && !mime.includes('svg')) {
    return 'Image';
  }
  if (mime === 'application/pdf' || ext === 'pdf') {
    return 'PDF';
  }
  if (mime.startsWith('video/')) {
    return 'Video';
  }
  if (mime.startsWith('audio/')) {
    return 'Audio';
  }
  if (
    mime === 'application/ogg' ||
    mime === 'application/x-ogg'
  ) {
    return 'Audio';
  }

  // Documents (MS Office, Google Docs, etc.)
  if (
    mime.startsWith('application/msword') || // .doc
    mime.includes('ms-word') ||
    mime.startsWith('application/vnd.ms-word') ||
    mime.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml') || // .docx
    hasExt(['doc', 'docx', 'rtf'])
  ) {
    return 'Document';
  }

  // Spreadsheets
  if (
    mime.startsWith('application/vnd.ms-excel') ||
    mime.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml') || // .xlsx
    mime.includes('vnd.google-apps.spreadsheet') ||
    hasExt(['xls', 'xlsx', 'csv', 'tsv'])
  ) {
    return 'Spreadsheet';
  }

  // Presentations
  if (
    mime.startsWith('application/vnd.ms-powerpoint') ||
    mime.startsWith('application/vnd.openxmlformats-officedocument.presentationml') || // .pptx
    mime.includes('vnd.google-apps.presentation') ||
    hasExt(['ppt', 'pptx', 'pps', 'key'])
  ) {
    return 'Presentation';
  }

  // Compressed / Archives
  if (
    mime.includes('zip') ||
    mime.includes('x-zip') ||
    mime.includes('x-tar') ||
    mime.includes('x-gzip') ||
    mime.includes('gzip') ||
    mime.includes('x-7z-compressed') ||
    mime.includes('x-rar') ||
    hasExt(['zip', 'tar', 'gz', '7z', 'rar', 'bz2', 'xz'])
  ) {
    return 'Compressed archive';
  }

  // Text
  if (
    mime.startsWith('text/') ||
    hasExt(['txt', 'md', 'markdown', 'log', 'ini', 'conf'])
  ) {
    return 'Text';
  }

  // Code
  if (
    hasExt([
      'js', 'jsx', 'ts', 'tsx', 'html', 'htm', 'css', 'json', 'xml',
      'py', 'java', 'cpp', 'c', 'rb', 'php', 'sh', 'go', 'rs', 'swift',
      'yaml', 'yml', 'toml', 'dockerfile'
    ])
  ) {
    return 'Code';
  }

  // Special cases
  if (mime.includes('svg') || ext === 'svg') {
    return 'SVG Image';
  }
  if (mime === 'application/x-msdownload' || hasExt(['exe', 'dmg', 'bin'])) {
    return 'Executable';
  }
  if (hasExt(['psd'])) {
    return 'Photoshop File';
  }
  if (hasExt(['fig'])) {
    return 'Figma File';
  }
  if (hasExt(['sketch'])) {
    return 'Sketch File';
  }

  // Fallback
  return 'Other';
}

// export const ROOT_FOLDER_ID = '00000000-0000-0000-0000-000000000000'; // reserved UUID