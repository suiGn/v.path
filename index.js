const fs = require('fs');
const path = require('path');
class TheVault {
  constructor() {
    this.workingDir = process.cwd();
    this.dirSize = this.calculateDirectorySize(this.workingDir);
    this.formattedSize = this.formatSize(this.dirSize);
  }
  calculateDirectorySize(dirPath) {
    let totalSize = 0;
    const traverseDirectory = (dirPath) => {
      const files = fs.readdirSync(dirPath);
      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          totalSize += stats.size;
        } else if (stats.isDirectory()) {
          traverseDirectory(filePath);
        }
      });
    };
    traverseDirectory(dirPath);
    return totalSize;
  }
  formatSize(size) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let formattedSize = size;
    let unitIndex = 0;
    while (formattedSize > 1024 && unitIndex < units.length - 1) {
      formattedSize /= 1024;
      unitIndex++;
    }
    return `${formattedSize.toFixed(2)} ${units[unitIndex]}`;
  }
  getWorkingDir() {
    return this.workingDir;
  }
  getDirSize() {
    return this.dirSize;
  }
  getFormattedSize() {
    return this.formattedSize;
  }
}

module.exports = TheVault;
