var express = require("express");
var router = express.Router();
const hash = require("hash.js");

const conversation1 = require("../messages-1.json");
const conversation2 = require("../messages-2.json");

router.get("/", function (req, res) {
  const conversation = req.query.conversation;
  const limit = req.query.limit;

  const messages = conversation == 1 ? conversation1 : conversation2;

  // for each item in the list find its parent
  function findParent(arr) {
    const arrWithParent = [];

    for (let i = 0; i < arr.length; i++) {
      let curr = arr[i];
      let currId = curr.id;
      const hashOfBody = hash.sha256().update(curr.encrypted).digest("hex");

      for (n = 1; n < arr.length; n++) {
        const prev = arr[n];
        const prevId = prev.id;
        const h = hash
          .sha256()
          .update(prevId + hashOfBody)
          .digest("hex");

        if (h == currId) {
          arrWithParent.push({
            ...curr,
            parent: prevId,
          });

          break;
        } else if (n == arr.length - 1) {
          arrWithParent.push({
            ...curr,
            parent: null,
          });
        }
      }

      if (i == arr.length - 1) {
        return arrWithParent;
      }
    }
  }

  const withParent = findParent(messages);

  // sort the above result by parent - children should come directly below their parents
  function sortByParent(arr) {
    const obj = {};
    arr.forEach((item) => {
      if (!obj[item.parent]) {
        obj[item.parent] = [];
      }
      obj[item.parent].push(item);
    });

    const result = [];
    const run = (key) => {
      if (obj[key]) {
        obj[key].forEach((item) => {
          result.push(item);
          run(item.id);
        });
      }
    };

    run("");

    return result;
  }

  //
  const input = withParent.map((r) => {
    return {
      id: r.id,
      parent: r.parent || "",
      encrypted: r.encrypted,
    };
  });

  const result = sortByParent(input);

  // send the last m messages in the conversation thread
  const response = result.slice(-limit);

  res.json(response);
});

module.exports = router;
