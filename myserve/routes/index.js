var express = require('express');
var router = express.Router();

/* GET home page. */
function sseDemo(req, res) {
  let messageId = 0;

  const intervalId = setInterval(() => {
    res.write(`id: ${messageId}\n`);
    res.write(`data: Test Message -- ${Date.now()}\n\n`);
    messageId += 1;
  }, 1000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
}

router.get('/event-stream', (req, res) => {
  // SSE Setup
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  res.write('\n');

  sseDemo(req, res);
});


module.exports = router;
