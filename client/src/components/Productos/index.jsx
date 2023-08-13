import React from "react";
import "./productos.css";
import { Link } from "react-router-dom";

export default function Productos(props) {
  const { currentPackages } = props;
  const packages = currentPackages;

  return (
    <div class="row container-cards">
      {packages.map((e) => {
        return (
          <div class="col-12 col-sm-6" >
            <Link to={"/details/" + e.id}>
              <div key={e.id} class="card cardservices">
                <img src={e.city.image} class="card-img-top" alt="..." />
                <div class="">
                  <h5 class="titleservices">{e.name}</h5>
                  <h5 class="titleservicess">{e.city.name}</h5>
                  <div className="fechasservices">
                    <p class="">
                      Salida{" "}
                      <h5 class="titleservicess">
                        {new Date(e.start_date).toLocaleString("es-ES")}
                      </h5>
                    </p>
                    <p class="">
                      Llegada{" "}
                      <h5 class="titleservicess">
                        {new Date(e.end_date).toLocaleString("es-ES")}
                      </h5>
                    </p>
                  </div>
                  <div className="priceservices">
                    <h5 class="">${e.price}</h5>

                    <p>
                      Stock <h5 class="">{e.stock}</h5>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
