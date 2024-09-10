import Navbar from "../../components/reuseable/Navbar/Navbar";
import SidebarContainer from "../../components/reuseable/Sidebar/SidebarContainer";
import totalProductsIcon from "../../assets/pages/DashBoard/totalProductsIcon.svg";
import totalSalesIcon from "../../assets/pages/DashBoard/totalSalesIcon.svg";
import totalStockIcon from "../../assets/pages/DashBoard/totalStockIcon.svg";
import totalSupplierIcon from "../../assets/pages/DashBoard/totalSupplierIcon.svg";
import totalVendorIcon from "../../assets/pages/DashBoard/totalVendorIcon.svg";
import totalUserIcon from "../../assets/pages/DashBoard/totalUserIcon.svg";
import ProductsCard from "../../components/pages/DashBoard/ProductsCard/ProductsCard";
import TotalCard from "../../components/pages/DashBoard/TotalCard/TotalCard";

const DashBoard = () => {
  return (
    <div>
      <SidebarContainer>
        <Navbar />
        <div className="main-content">
          <div className="container">
            <div className="flex flex-col gap-[30px]">
              <div className="grid xl:grid-cols-3 gap-5">
                <ProductsCard
                  icon={totalProductsIcon}
                  backgroundColorForIcon="#FF990033"
                  title="Total Products"
                  value={400}
                />
                <ProductsCard
                  icon={totalSalesIcon}
                  backgroundColorForIcon="#21A36633"
                  title="Sales Today (Products)"
                  value={300}
                />
                <ProductsCard
                  icon={totalStockIcon}
                  backgroundColorForIcon="#80050533"
                  title="Stock Out (Products)"
                  value={10}
                />
              </div>

              <div className="grid xl:grid-cols-3 gap-5">
                <TotalCard
                  icon={totalSupplierIcon}
                  backgroundColor="#FF9900"
                  title="Total Suppliers"
                  value={40}
                />

                <TotalCard
                  icon={totalVendorIcon}
                  backgroundColor="#1B2850"
                  title="Total Vendors"
                  value={4}
                />

                <TotalCard
                  icon={totalUserIcon}
                  backgroundColor="#33C481"
                  title="Total Users"
                  value={20}
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarContainer>
    </div>
  );
};

export default DashBoard;
