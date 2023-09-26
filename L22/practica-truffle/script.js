const ProductManagement = artifacts.require("ProductManagement");
const ChangeOwnership = artifacts.require("ChangeOwnership");

module.exports = async function(callback) {
    var _ProductManagement = await ProductManagement.deployed();
    var _ChangeOwnership = await ChangeOwnership.deployed();

    // console.log(_ProductManagement.address);
    // console.log(_ChangeOwnership.address);

    // CONSTRUIR PARTE
    // await _ProductManagement.buildPart("SKU-1", "Rueda", "2023-06-08");
    var sku_1 = '0x3064105b51cbfda761421b5902b72aa73f3d4306769ccfe64c14adeaa2cc3ef7'; // *
    var sku_2 = '0x41b31854527dd2bf7ce6b17246e93f7e69651709da802b3eb3336d6861467503';
    var sku_3 = '0x83006a37c99c87cf9a15ce15d7762db6a9c3c8a42442a2484608b7ca9521ea10';
    var sku_4 = '0x542ec02a1ee620948ef071a252f87dee350f6b603e21bcac1c97b9605260a43e';
    var sku_5 = '0x9ce10bc8120cb0f4792190c7f75c59d900ee2e5cf0eee9c937756c1d2edd1286';
    var sku_6 = '0x77a32a812f902890b858ef86b90b7d042d535f2b319fa72a17b9ed9db74f0027';

    // ASIGNAR FABRICANTE
    // var part_owner = await _ChangeOwnership.addOwnership(0, sku_1)
    // console.log(part_owner);

    // DETALLE DE LA PARTE
    // var part = await _ProductManagement.parts(sku_1);
    // console.log(part);

    // await _ProductManagement.buildPart("SKU-2", "Puerta", "2023-06-08");
    // await _ProductManagement.buildPart("SKU-3", "Retrovisor", "2023-06-08");
    // await _ProductManagement.buildPart("SKU-4", "Asiento", "2023-06-08");
    // await _ProductManagement.buildPart("SKU-5", "Volante", "2023-06-08");
    // await _ProductManagement.buildPart("SKU-6", "Motor", "2023-06-08");

    /*/ ASIGNAR PARTES
    var part_owner = await _ChangeOwnership.addOwnership(0, sku_2)
    var part_owner = await _ChangeOwnership.addOwnership(0, sku_3)
    var part_owner = await _ChangeOwnership.addOwnership(0, sku_4)
    var part_owner = await _ChangeOwnership.addOwnership(0, sku_5)
    var part_owner = await _ChangeOwnership.addOwnership(0, sku_6)

    var part = await _ProductManagement.parts(sku_2);
    console.log(part);

    var part = await _ProductManagement.parts(sku_3);
    console.log(part);

    var part = await _ProductManagement.parts(sku_4);
    console.log(part);

    var part = await _ProductManagement.parts(sku_5);
    console.log(part);

    var part = await _ProductManagement.parts(sku_6);
    console.log(part); */

    /* await _ProductManagement.buildProduct('2828-MTR', 'Peugeot 2008', '2023-06-08', [
        sku_1, sku_2, sku_3, sku_4, sku_5, sku_6
    ]); */

    var product_hash = '0x90a6a15bdc3834690492c76222e431b3faab0f0d2b25fe718ad816da4347631d';
    var product_owner = await _ChangeOwnership.addOwnership(1, product_hash);

    console.log(product_owner);
}