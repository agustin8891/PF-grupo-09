const { Hotel, City } = require("../db");

const getHotels = async () => {
  try {
    let allHotels = await Hotel.findAll({
      include: {
        model: City,
        attributes: ["name"],
      },
    });

    return allHotels;
  } catch (err) {
    return {
      msg: "Error getHotels(hotelsController.js)",
      error: err,
    };
  }
};

const getHotel = async (id) => {
  try {
    let allHotels = await Hotel.findByPk(id, {
      include: {
        model: City,
        attributes: ["name"],
      },
    });

    return allHotels;
  } catch (err) {
    return {
      msg: "Error getHotel(hotelsController.js)",
      error: err,
    };
  }
};
const createHotel = async (
  name,
  location,
  stars,
  phone,
  price,
  pool,
  wifi,
  gym,
  urlImage,
  cityId,
  score,
  comments
) => {
  try {
    // if (
    //   !name ||
    //   !location ||
    //   !stars ||
    //   !phone ||
    //   !price ||
    //   !urlImage ||
    //   !cityId ||
    //   !score
    // ) {
    //   return "All fields are required";
    // }
    if (typeof name !== "string") {
      return "Only letters are allowed in the name field";
    }
    const hotelCreate = await Hotel.create({
      name,
      location,
      stars,
      phone,
      price,
      pool,
      wifi,
      gym,
      urlImage,
      cityId,
      score,
      comments
    });

    return "Hotel created successfully";
  } catch (err) {
    return {
      msg: "Error createhotel(hotelController.js)",
      error: err,
    };
  }
};
const deleteHotelById = async (id) => {
  try {
    const deleteHotel = await Hotel.destroy({
      where: { id: id },
    });

    if (deleteHotel) {
      return { msg: "The hotel has been deleted successfully", valor: true };
    }
    return { msg: "Id hotel not found" };
  } catch (error) {
    return {
      msg: "Error deleteHotelById(hotelsController.js)",
      error: error,
    };
  }
};
const updateHotelById = async (
  id,
  name,
  location,
  stars,
  phone,
  price,
  pool,
  wifi,
  gym,
  urlImage,
  cityId,
  comments,
  score
) => {
  try {
    if (
      !name ||
      !location ||
      !stars ||
      !phone ||
      !price ||
      !urlImage ||
      !cityId
    ) {
      return "All fields are required";
    }
    if (typeof name !== "string") {
      return "Only letters are allowed in the name field";
    }
    const a = await Hotel.update(
      {
        name,
        location,
        stars,
        phone,
        price,
        pool,
        wifi,
        gym,
        urlImage,
        cityId,
        comments,
        score
      },
      { where: { id: id } }
    );
    if (a[0]) {
      return { msg: "The hotel has been update successfully", valor: true };
    }
    return { msg: "Id hotel not found" };
  } catch (error) {
    return {
      msg: "Error updateHotelById(hotelsController.js)",
      error: error,
    };
  }
};

module.exports = {
  getHotels,
  createHotel,
  getHotel,
  deleteHotelById,
  updateHotelById,
};
