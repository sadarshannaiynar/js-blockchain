const crypto = require('crypto');

const generateProof = (previousProof) => {
  let proof = Math.random() * 10000000001;
  while (!isProofValid(previousProof, proof)) {
    proof = Math.random() * 10000000001;
  }
  return proof;
};

const isProofValid = (previousProof, currentProof) => {
  const difference = currentProof - previousProof;
  const proofString = `difference-${difference}`;
  const hashFunction = crypto.createHash('sha256');
  hashFunction.update(proofString);
  const hexString = hashFunction.digest('hex');
  if (hexString.includes('0000000')) {
    return true;
  }
  return false;
};

exports.generateProof = generateProof;
exports.isProofValid = isProofValid;
