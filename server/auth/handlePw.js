const { hashSync, compare, genSaltSync } = require("bcryptjs");

const hashPw = (pw) => {
  const salt = genSaltSync(10);
  return hashSync(pw, salt);
};

const comparePw = async (raw, pw) => await compare(raw, pw);

module.exports = { hashPw, comparePw };
