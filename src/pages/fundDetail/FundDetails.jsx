import { useParams } from "react-router-dom";
import FundOverviewCard from "../../components/FundDetails/FundOverviewCard";
import FundGraph from "../../components/FundDetails/FundGraph";
import FundActionBar from "../../components/FundDetails/FundActionBar";
import FundTransactionTable from "../../components/FundDetails/FundTransactionTable";
import FundExtraDetails from "../../components/FundDetails/FundExtraDetails";
import { useEffect } from "react";

function FundDetails() {
  const { id } = useParams();
 // console.log(id);

  useEffect(() => {
      document.title = "Fund Details";
      
    }, []);

  // You'd fetch fund data by ID from API or use mock data here

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
  <div className="max-w-5xl mx-auto space-y-6">

    <div className="flex flex-col lg:flex-row gap-6">
      
      {/* Left: Summary Card (compact) */}
      <div className="w-full lg:w-1/3">
        <FundOverviewCard fundId={id} />
        <FundActionBar fundId={id} />
        <FundGraph fundId={id} />
        
      </div>

      {/* Right: Actions + Graph */}
      <div className="w-full lg:w-2/3 space-y-4">
       <FundExtraDetails fundId={id} /> {/* <- Move extra info here */}
        <FundTransactionTable fundId={id} />
        
       
      </div>

    </div>

    {/* Below: Transactions */}
   

  </div>
</div>

  );
}

export default FundDetails;
