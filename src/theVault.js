import fs from 'fs';
import path from 'path';

/**
 * Class representing a vault for directory handling.
 */
class TheVault {
  /**
   * Create a TheVault instance.
   */
  constructor() {
    this.workingDir = process.cwd();
    this.dirSize = this.calculateDirectorySize(this.workingDir);
    this.formattedSize = this.formatSize(this.dirSize);
  }

  /**
   * Calculate the size of a directory and its contents.
   * @param {string} dirPath - The path to the directory.
   * @returns {number} The total size of the directory in bytes.
   */
  calculateDirectorySize(dirPath) {
    let totalSize = 0;
    const traverseDirectory = (dirPath) => {
      try {
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
      } catch (err) {
        console.error(`Error while traversing directory: ${dirPath}`, err);
      }
    };

    traverseDirectory(dirPath);
    return totalSize;
  }

  /**
   * Format the size from bytes to a more readable format.
   * @param {number} size - The size in bytes.
   * @returns {string} The size formatted as a string with appropriate units.
   */
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

  /**
   * Get the working directory of the instance.
   * @returns {string} The current working directory.
   */
  getWorkingDir() {
    return this.workingDir;
  }

  /**
   * Get the size of the working directory.
   * @returns {number} The size of the directory in bytes.
   */
  getDirSize() {
    return this.dirSize;
  }

  /**
   * Get the formatted size of the working directory.
   * @returns {string} The formatted size of the directory.
   */
  getFormattedSize() {
    return this.formattedSize;
  }
}

export default TheVault;
