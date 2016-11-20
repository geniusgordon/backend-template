const wrap = fn => (...args) => fn(...args).catch(args[2]);

export default wrap;

