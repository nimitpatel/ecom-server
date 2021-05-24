const mongoose = require('mongoose')

const ProductList = mongoose.model('productlist')
const ProductDetails = mongoose.model('productdetail')


const productList = async (req, res) => {
    await ProductList.find().then(async list => {
        const productList = list.map(l => ({
            url: l.image,
            category: l.category,
            id: l.pId,
            name: l.pName,
            stock: l.inStock
        }));
        
        res.send({
            code: 1,
            data: productList
        });
    }).catch(err => res.send({ code: 0, error: err }));
}

const productDetails = async (req, res) => {
    const id = parseInt(req.params.id)
    
    await ProductDetails.findOne({ pId: id }).then(async detail => {
        await res.send({
            code: 1,
            data: detail
        });
    }).catch(err => res.send({ code: 0, error: err }))
}

module.exports = {
    productList,
    productDetails
}