export const mockFunds = [
    { id: 'fund1', name: 'Alpha Fund' },
    { id: 'fund2', name: 'Growth Fund' },
    { id: 'fund3', name: 'Value Fund' },
  ];

  export const initialBacktests = [
    {
      id: 101,
      fund: 1,
      strategyId: 1,
      stockSymbol: "RELIANCE",
      validFrom: "2024-01-01",
      validTo: "2024-06-30",
      capitalAllocation: 25,
      status: "completed",
    },
    {
      id: 102,
      fund: 2,
      strategyId: 2,
      stockSymbol: "HDFCBANK",
      validFrom: "2024-02-15",
      validTo: "2024-08-15",
      capitalAllocation: 30,
      status: "not started",
    },
    {
        id: 103,
        fund: 1,
        strategyId: 2,
        stockSymbol: "DBI",
        validFrom: "2024-02-15",
        validTo: "2025-02-15",
        capitalAllocation: 30,
        status: "completed",
      },
  ];
  