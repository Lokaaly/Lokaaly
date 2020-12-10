function generateRandomCode(count) {
  const chars = '0123456789'.split('');
  let result = '';
  for(var i=0; i<count; i++){
    let x = Math.floor(Math.random() * chars.length);
    result += chars[x];
  }
  return result;
}

module.exports = {
	generateRandomCode,
};