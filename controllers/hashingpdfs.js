const asynchHandler = require('express-async-handler');
const {hashPdfFunction} = require('../extractPdfs');

const {createMerkleTree} = require("../findMerkleTree");

const hashPdfs = (asynchHandler(async(req,res)=>{
    
const result =  hashPdfFunction((data)=>{

    const merkleTreeAndMerkleRoot = createMerkleTree(data);
    res.status(200).json(merkleTreeAndMerkleRoot);

  },(err)=>{console.log(err)});
}));

module.exports = {
    hashPdfs,
}