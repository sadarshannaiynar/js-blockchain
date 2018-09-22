const generateProof = (previousProof) => {
  let proof = previousProof + 1;
  while (!isProofValid(previousProof, proof)) {
    proof += 1;
  }
  return proof;
};

const isProofValid = (previousProof, currentProof) => {
  if ((currentProof - previousProof) % 5 === 0) {
    return true;
  }
  return false;
};

exports.generateProof = generateProof;
exports.isProofValid = isProofValid;
