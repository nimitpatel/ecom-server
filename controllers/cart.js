const mongoose = require('mongoose')

const Cart = mongoose.model('cart')

const getCartItems = async (req, res) => {
    await Cart.findOne({ uId: req._id }).then(async cart => {
        const items = cart.items

        res.send({ code: 1, data: items })
    }).catch(err => res.send({ code: 0, error: err }))
}

const addToCard = async (req, res) => {
    const { pId, qnt } = req.body
    const uId = req._id

    const cartExists = await Cart.findOne({ uId })
    let productExists

    if (cartExists) {
        for (let i = 0; i < cartExists.items.length; i++) {
            if (cartExists.items[i].pId === parseInt(pId)) {
                productExists = cartExists.items[i]
            }

            if (productExists) {
                var cart = cartExists.items
                cartExists.items = null;
                cart[i].qnt = parseInt(cart[i].qnt) + 1;
                // console.log(cart);
                cartExists.items = [...cart];
                await cartExists.save();

                res.send({ code: 1, message: "item qnt updated successfully" })
            }
        }

        if (!productExists) {
            cartExists.items.addToSet({ pId, qnt })
            cartExists.save()

            res.send({ code: 1, message: "item added successfully" })
        }
    } else {
        await new Cart({
            uId,
            items: [{
                pId,
                qnt
            }]
        }).save()

        res.send({ code: 1, message: "item added successfully" })
    }
}

const deleteFromCart = async (req, res) => {
    try {
        await Cart.updateMany(
            { uId: req._id },
            {
                $pull: { items: { _id: req.params.id } }
            },
            { safe: true }
        )

        res.send({ code: 1, message: "item deleted successfully" })
    } catch (err) {
        res.send({ code: 0, message: err })
    }
}

module.exports = {
    getCartItems,
    addToCard,
    deleteFromCart
}