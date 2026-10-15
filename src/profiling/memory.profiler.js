const v8 = require("v8");
const process = require("process");
const { timeStamp } = require("console");
const { arrayBuffer } = require("stream/consumers");

const getMemoryProfilingData = () => {
    const memoryUsage = process.memoryUsage();
    const heapStatistics = v8.getHeapStatistics();

    return {
        timeStamp: new Date().toISOString(),
            rssMB: (memoryUsage.rss / 1024 / 1024).toFixed(2),
            heapTotalMB: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2),
            heapUsedMB: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
         externalMB: (memoryUsage.external / 1024 / 1024).toFixed(2),
         arrayBuffersMB: (memoryUsage.arrayBuffers / 1024 / 1024).toFixed(2),
         totalHeapSizeMB: (heapStatistics.total_heap_size / 1024 / 1024).toFixed(2),
         totalHeapSizeExecutableMB: (heapStatistics.total_heap_size_executable / 1024 / 1024).toFixed(2),
    };
    
}

module.exports = {
    getMemoryProfilingData
};