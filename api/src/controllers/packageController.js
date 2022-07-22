const { Package, Activity, Bus, Plattform, City, Hotel } = require("../db");
const { filterPackage, sortPackage } = require('./packageFiltersController')
const { Op } = require("sequelize");

const getPackages = async (req, res, next) => {
  try {
    const {destination, start, end, price, stock} = req.query;

    const destinationWhere = destination? {name: {[Op.iLike]: `%${destination}%`}} : {};
    const dateWhere = start && end ? {start_date: start, end_date: end} : {}
    const priceOrder = price ? ['price', price.toUpperCase()] : ['price', 'NULLS FIRST']
    const stockOrder = stock ? ['stock', stock.toUpperCase()] : []
  
    const allPackages = await Package.findAll({
      order: [priceOrder, stockOrder],
      where: dateWhere,
      include: [
        {
          model: Activity,
          through: {
            attributes: [],
          },
        },
        {
          model: Bus,
          attributes: ["patent"],
        },
        {
          model: Plattform,
          attributes: ["terminal"],
        },
        {
          model: City,
          where: destinationWhere,
          attributes: ["name"],
        },
        {
          model: Hotel,
          attributes: ["name"],
        },
      ],
    });

    // all = allPackages.getDataValues()
    // console.log(all)
    
    // if(priceOrder) { return res.status(200).json(await sortPackage(priceOrder)) }
    // if(destination && start && end){
    //   return res.status(200).json(await filterPackage(destination, start, end, stock))
    // }
    // if(stock && !destination && !start && !end) { return res.status(200).json(await sortPackage(stock)) }
    return res.status(200).json(allPackages);

  } catch (error) {
    res.status(404).json({
      msg: "There are no packages to show",
      error: error,
    });
  }
};


const getPackageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const packageById = id && (await Package.findByPk(Number(id), 
      {include: [
       { 
        model: Activity,

          through: {
            attributes: [],
          }
        },
        {
          model: Bus,
          attributes: ["patent"],
        },
        {
          model: Plattform,
          attributes: ["terminal"],
        },
        {
          model: City,
          attributes: ["name"],
        },
        {
          model: Hotel,
          attributes: ["name"],
        },
      ],}
    ));
    res.status(200).json(packageById)
  } catch (error) {
    res.status(404).json({
      msg: "Error getPackageById(packageController.js)",
      error: error,
    });
  }
};

const postPackage = async (req, res, next) => {
  try {
    const {
      name,
      start_date,
      end_date,
      price,
      discount,
      activity,
      busId,
      plattformId,
      cityId,
      hotelId,
      stock,
    } = req.body;
    if (
      !name ||
      !start_date ||
      !end_date ||
      !price ||
      !discount ||
      !activity ||
      !busId ||
      !plattformId ||
      !cityId ||
      !hotelId ||
      !stock
    ) {
      return res.status(404).json({
        msg: "All fields are required",
      });
    }
    if (
      busId < 1 ||
      plattformId < 1 ||
      cityId < 1 ||
      hotelId < 1 ||
      stock < 1
    ) {
      return res.status(404).json({
        msg: "Negative numbers are not allowed",
      });
    }
    if (typeof name !== "string") {
      return res.status(404).json({
        msg: "Only letters are allowed in the name field",
      });
    }
    const newPackage = await Package.create({
      name,
      start_date,
      end_date,
      price,
      discount,
      busId,
      plattformId,
      cityId,
      hotelId,
      stock,
    });
    const activities = await Activity.findAll({
      where: {
        name: activity,
      },
    });

    await newPackage.addActivities(activities);

    res.status(201).send("Package created successfully");
  } catch (error) {
    res.json({
      msg: "Couldn't create package",
      error: error.parent.detail,
    });
  }
};
const deletePackagesById = async (req, res) => {
  const { id } = req.params;
  try {
    const findbyid = await Package.findByPk(id);
    if (findbyid) {
      const deletePackages = await Package.destroy({
        where: { id: id },
      });
      return res.status(201).json({
        msg: "The package has been removed successfully",
        deletePackages,
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: "The package cannot be removed because the id does not exist",
    });
  }
};

const updatePackage = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    start_date,
    end_date,
    price,
    discount,
    activity,
    busId,
    plattformId,
    cityId,
    hotelId,
    stock,
  } = req.body;
  try {
    const a = Package.update(
      {
        name,
        start_date,
        end_date,
        price,
        discount,
        activity,
        busId,
        plattformId,
        cityId,
        hotelId,
        stock,
      },
      { where: { id: id } }
    );
    return res.status(201).json({
      msg: "The package has been update successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPackages,
  getPackageById,
  postPackage,
  deletePackagesById,
  updatePackage,
};
