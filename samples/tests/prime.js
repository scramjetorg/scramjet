module.exports = (stream) =>
    stream
        //.each((x) => console.log(process.pid, x))
        .filter(num => {
            if (num < 2) return false;
            if (num == 2) return true;
            for(var i = 2; i < num/2; i++) {
              if (num % i === 0) return false;
            }
            return true;
        })
;
