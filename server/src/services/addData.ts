const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  let count = 10;
  for (let i = 51; i <= 1000; i++) {
    if (i > count) {
      await sleep(1000 * 60);
      count += 10;
    } else {
      try {
        await fetch(`http://localhost:3310/api/tokens/${i}`, {
          method: "POST",
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
})();
