const { Router } = require("express");
const {
  TypeUser,
  User,
  Plattform,
  City,
  Activity,
  Business,
  Cart,
  CartDetail,
  Hotel,
  Package,
  package_activity,
  StatusCart,
} = require("../db"); // Asegúrate de importar los modelos adecuados
const dbjson = require("../json/dbjson.json");
const router = Router();

//typeusers- users- plattforms - cities - activities - hotel - buses - packagesfinal - packageActivity - cartstatus - cart - cartdetail

router.get("/", async (req, res) => {
  /*   try { */

  let array = [];
  for (let i = 0; i < dbjson.typeuser.length; i++) {
    const idToSearch = dbjson.typeuser[i].id; // ID que deseas buscar
    const [typeUser, created] = await TypeUser.findOrCreate({
      where: { id: idToSearch },
      defaults: { description: dbjson.typeuser[i].description }, // Valores predeterminados para la creación del usuario
    });

    //console.log(created ? "Usuario creado:" : "Usuario encontrado:", user.id);
  }

  for (let i = 0; i < dbjson.user.length; i++) {
    const idToSearch = dbjson.user[i].id;
    const [user, created] = await User.findOrCreate({
      where: { id: idToSearch },
      defaults: {
        name: dbjson.user[i].name,
        surname: dbjson.user[i].surname,
        mail: dbjson.user[i].mail,
        password: dbjson.user[i].password,
        typeUserId: dbjson.user[i].typeUserId,
        rol: "client",
      },
    });
    //console.log(created ? "Usuario creado:" : "Usuario encontrado:", user.id);
  }

  for (let i = 0; i < dbjson.plattform.length; i++) {
    const currentObject = dbjson.plattform[i];

    const idToSearch = currentObject.id;
    const [plattform, created] = await Plattform.findOrCreate({
      where: { id: idToSearch },
      defaults: {
        terminal: currentObject.terminal,
        address: currentObject.address,
        location: currentObject.location,
      },
    });
  }

  for (let i = 0; i < dbjson.city.length; i++) {
    const currentObject = dbjson.city[i];
    const idToSearch = currentObject.id;
    const [city, created] = await City.findOrCreate({
      where: { id: idToSearch },
      defaults: {
        name: currentObject.name,
        location: currentObject.location,
        image: currentObject.image,
        enabled: currentObject.enabled,
      },
    });
  }

  for (let i = 0; i < dbjson.activity.length; i++) {
    const currentObject = dbjson.activity[i];
    const idToSearch = currentObject.id;
    const [city, created] = await Activity.findOrCreate({
      where: { id: idToSearch },
      defaults: currentObject,
    });
  }

  for (let i = 0; i < dbjson.hotel.length; i++) {
    const currentObject = dbjson.hotel[i];
    const idToSearch = currentObject.id;
    const [city, created] = await Hotel.findOrCreate({
      where: { id: idToSearch },
      defaults: currentObject,
    });
  }

  for (let i = 0; i < dbjson.buses.length; i++) {
    const currentObject = dbjson.buses[i];
    const idToSearch = currentObject.id;
    const [city, created] = await Business.findOrCreate({
      where: { id: idToSearch },
      defaults: currentObject,
    });
  }

  for (let i = 0; i < dbjson.package.length; i++) {
    const currentObject = dbjson.package[i];
    const searchPackageId = currentObject.id;
    const searchActivityId = currentObject.id;
    const newPackage = await Package.findOrCreate({
      where: { id: searchPackageId },
      defaults: {
        name: currentObject.name,
        start_date: new Date(currentObject.start_date),
        end_date: new Date(currentObject.end_date),
        price: currentObject.price,
        discount: currentObject.discount,
        stock: currentObject.stock,
        enabled: currentObject.enabled,
        plattformId: currentObject.plattformId,
        businessId: currentObject.businessId,
        cityId: currentObject.cityId,
        hotelId: currentObject.hotelId,
      },
    });
    
  }

  for (let i = 0; i < dbjson.package_activity.length; i++) {
    const currentObject = dbjson.package_activity[i];
    const idPackageSearch = currentObject.packageId;
    const idActivitySearch = currentObject.activityId;  
    const searchPackage = await Package.findByPk(idPackageSearch);
    const searchActivity = await Activity.findByPk(idActivitySearch);
    await searchActivity.addPackage(searchPackage);
    await searchPackage.addActivity(searchActivity);
  }

  for (let i = 0; i < dbjson.hotel.length; i++) {
    const currentObject = dbjson.hotel[i];
    const idToSearch = currentObject.id;
    const [city, created] = await Hotel.findOrCreate({
      where: { id: idToSearch },
      defaults: currentObject,
    });
  }

  for (let i = 0; i < dbjson.statusCart.length; i++) {
    const currentObject = dbjson.statusCart[i];
    const idToSearch = currentObject.id;
    const [city, created] = await StatusCart.findOrCreate({
      where: { id: idToSearch },
      defaults: currentObject,
    });
  }


  for (let i = 0; i < dbjson.Cart.length; i++) {
    const currentObject = dbjson.Cart[i];
    const idToSearch = currentObject.id;
    const [city, created] = await Cart.findOrCreate({
      where: { id: idToSearch },
      defaults: currentObject,
    });
  }

  for (let i = 0; i < dbjson.cartDetails.length; i++) {
    const currentObject = dbjson.cartDetails[i];
    const idToSearch = currentObject.id;
    const [city, created] = await CartDetail.findOrCreate({
      where: { id: idToSearch },
      defaults: currentObject,
    });
  }

  res.send(array);
  /*   } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error interno del servidor");
  } */
});

module.exports = router;
