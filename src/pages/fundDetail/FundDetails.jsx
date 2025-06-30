import { useParams } from "react-router-dom";
import FundOverviewCard from "../../components/FundDetails/FundOverviewCard";
import FundGraph from "../../components/FundDetails/FundGraph";
import FundActionBar from "../../components/FundDetails/FundActionBar";
import FundTransactionTable from "../../components/FundDetails/FundTransactionTable";
import { useEffect } from "react";

function FundDetails() {
  const { id } = useParams();

  useEffect(() => {
      document.title = "Fund Details";
      
    }, []);

  // You'd fetch fund data by ID from API or use mock data here

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
                <FundOverviewCard fundId={id} />
                <FundActionBar fundId={id} />
            </div>
            <div className="flex-1">
                <FundGraph fundId={id} />
            </div>
            </div>

        
        <FundTransactionTable fundId={id} />
      </div>
    </div>
  );
}

export default FundDetails;
