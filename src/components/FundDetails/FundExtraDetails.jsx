// FundExtraDetails.jsx

import React, { useEffect, useState } from "react";
import { getFundById } from "../../api/viewfundApi";

function FundExtraDetails({ fundId }) {
  const [fund, setFund] = useState(null);

  useEffect(() => {
    if (!fundId) return;

    getFundById(fundId).then((res) => {
      setFund(res.data);
    });
  }, [fundId]);

  if (!fund) return null;

  const {
    aum,
    expenseRatio,
    exitLoad,
    lockInPeriod,
    minInvestment,
    minSipAmount,
    objective,
    launchDate,
  } = fund;

  return (
    <div className="bg-white bg-white shadow-xl rounded-2xl p-5 text-sm grid grid-cols-2 gap-4 mt-5">
      <p><strong>AUM:</strong> ₹{aum?.toLocaleString()}</p>
      <p><strong>Expense Ratio:</strong> {expenseRatio}%</p>
      <p><strong>Exit Load:</strong> {exitLoad}%</p>
      <p><strong>Lock-in:</strong> {lockInPeriod} yrs</p>
      <p><strong>Min Investment:</strong> ₹{minInvestment}</p>
      <p><strong>Min SIP:</strong> ₹{minSipAmount}</p>
      <p className="col-span-2"><strong>Objective:</strong> {objective}</p>
      <p><strong>Launch Date:</strong> {new Date(launchDate).toLocaleDateString()}</p>
    </div>
  );
}

export default FundExtraDetails;
