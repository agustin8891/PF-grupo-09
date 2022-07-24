import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import './servicesView.css'
import Productos from '../../components/Productos';
import Paginado from '../../components/Paginado';
import { useSelector } from 'react-redux';
export default function Services() {

  const packages = useSelector((state) => state.packages)

  const [currentPage, setCurrentPage] = useState(1);
  const [packagesPerPage /*setPackagesPerPage*/] = useState(3); //10 productos por pagina
  const indexOfLastPackage = currentPage * packagesPerPage; // 10
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage; // 0
  const currentPackages = packages.slice(
    indexOfFirstPackage,
    indexOfLastPackage
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (<>
    <div>
      <Navbar setCurrentPage={setCurrentPage} />
    </div>
    <div className='servicesViewContainer'>
      <div>
        <b>Busqueda</b>
      </div>
      <div>calendario</div>
      <div><b>Matching de busqueda</b></div>
      <div>
        <b>Filtrado de paquetes</b>
      </div>
      <div className='services-product-container'>

        <Productos currentPackages={currentPackages} />

      </div>
    </div>
    <div>
      <Paginado
        currentPage={currentPage}
        packagesPerPage={packagesPerPage}
        packages={packages.length}
        paginado={paginado}
      />
      <Footer />
    </div>
  </>
  )
}
