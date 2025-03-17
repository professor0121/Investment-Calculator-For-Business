import React from 'react';
import { Calculator, LineChart as ChartLine, Home, Info, Table } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

interface TabProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
      }`}
  >
    {icon}
    <span className="ml-2 font-medium">{label}</span>
  </button>
);

interface AmortizationRowProps {
  year: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

const AmortizationRow: React.FC<AmortizationRowProps> = ({
  year,
  payment,
  principal,
  interest,
  balance,
}) => (
  <tr className="hover:bg-gray-50">
    <td className="px-4 py-2 text-center">{year}</td>
    <td className="px-4 py-2 text-right">{formatCurrency(payment)}</td>
    <td className="px-4 py-2 text-right">{formatCurrency(principal)}</td>
    <td className="px-4 py-2 text-right">{formatCurrency(interest)}</td>
    <td className="px-4 py-2 text-right">{formatCurrency(balance)}</td>
  </tr>
);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const formatPercent = (value: number) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value) + '%';

// interface CalculatorInputProps {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   prefix?: string;
//   suffix?: string;
//   info?: string;
//   disabled?: boolean;
// }

// const CalculatorInput: React.FC<CalculatorInputProps> = ({
//   label,
//   value,
//   onChange,
//   disabled,
//   prefix,
//   suffix,
//   info,
// }) => (
//   <div className="mb-4">
//     <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
//       {label}
//       {info && (
//         <div className="group relative ml-2">
//           <Info className="w-4 h-4 text-gray-400" />
//           <div className="invisible group-hover:visible absolute z-10 w-64 px-4 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg -top-2 left-6">
//             {info}
//           </div>
//         </div>
//       )}
//     </label>
//     <div className="relative rounded-md shadow-sm">
//       {prefix && (
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <span className="text-gray-500 sm:text-sm">{prefix}</span>
//         </div>
//       )}
//       <input
//         type="text"
//         value={value}
//         disabled={disabled}
//         onChange={(e) => onChange(e.target.value)}
//         className={`block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${disabled ? 'bg-gray-50' : ''} ${prefix ? 'pl-7' : 'pl-3'
//           } ${suffix ? 'pr-12' : 'pr-3'}`}
//       />
//       {suffix && (
//         <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//           <span className="text-gray-500 sm:text-sm">{suffix}</span>
//         </div>
//       )}
//     </div>
//   </div>
// );



interface CalculatorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  prefix?: string;
  suffix?: string;
  info?: string;
  disabled?: boolean;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({
  label,
  value,
  onChange,
  onBlur,
  disabled,
  prefix,
  suffix,
  info,
}) => (
  <div className="mb-4">
    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
      {label}
      {info && (
        <div className="group relative ml-2">
          <Info className="w-4 h-4 text-gray-400" />
          <div className="invisible group-hover:visible absolute z-10 w-64 px-4 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg -top-2 left-6">
            {info}
          </div>
        </div>
      )}
    </label>
    <div className="relative rounded-md shadow-sm">
      {prefix && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{prefix}</span>
        </div>
      )}
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${disabled ? 'bg-gray-50' : ''
          } ${prefix ? 'pl-7' : 'pl-3'} ${suffix ? 'pr-12' : 'pr-3'}`}
      />
      {suffix && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{suffix}</span>
        </div>
      )}
    </div>
  </div>
);


const ResultCard: React.FC<{ label: string; value: string | React.ReactNode }> = ({ label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-sm font-medium text-gray-500">{label}</h3>
    <div className="mt-1 text-xl font-semibold text-gray-900">{value}</div>
  </div>
);



function App() {
  const [propertyPrice, setPropertyPrice] = React.useState('730000');
  const [downPaymentPercent, setDownPaymentPercent] = React.useState('');
  const [downPaymentAmount, setDownPaymentAmount] = React.useState('0');
  const [closingCostPercent, setClosingCostPercent] = React.useState('4');
  const [closingCostAmount, setClosingCostAmount] = React.useState('36500');
  const [repairCost, setRepairCost] = React.useState('3000');
  const [totalCapitalRequired, setTotalCapitalRequired] = React.useState('39500');
  const [interestRate, setInterestRate] = React.useState('6.39');
  const [loanTerm, setLoanTerm] = React.useState('30');
  const [monthlyRent, setMonthlyRent] = React.useState('2500');
  const [propertyTax, setPropertyTax] = React.useState('6000');
  const [insurance, setInsurance] = React.useState('2400');
  const [maintenance, setMaintenance] = React.useState('10');
  const [propertyManagement, setPropertyManagement] = React.useState('8');
  const [activeTab, setActiveTab] = React.useState(0);
  const [appreciationRate, setAppreciationRate] = React.useState('4');
  const [propertyUnit1, setPropertyUnit1] = React.useState('1480');
  const [propertyUnit2, setPropertyUnit2] = React.useState('1480');
  const [cashOnCashReturn, setCashOnCashReturn] = React.useState('');
  const [propertyUnit3, setPropertyUnit3] = React.useState('');
  const [propertyUnit4, setPropertyUnit4] = React.useState('');
  const [propertyUnit5, setPropertyUnit5] = React.useState('');
  const [propertyUnit6, setPropertyUnit6] = React.useState('');
  const [propertyUnit7, setPropertyUnit7] = React.useState('');
  const [propertyUnit8, setPropertyUnit8] = React.useState('');
  const [propertyUnit9, setPropertyUnit9] = React.useState('');
  const [propertyUnit10, setPropertyUnit10] = React.useState('');
  const [otherIncome, setOtherIncome] = React.useState('');
  const [taxRate, setTaxRate] = React.useState(2.2);
  const [monthlyExpensesMaintenance, setMonthlyExpensesMaintenance] = React.useState(0);
  const [utilities, setUtilities] = React.useState(0);
  const [waterRate, setWaterRate] = React.useState(1.4);
  const [insuranceRate, setInsuranceRate] = React.useState(3.4);
  const [cleaningRate, setCleaningRate] = React.useState(0);
  const [otherRate, setOtherRate] = React.useState(0);
  const [propertyManagementRate, setPropertyManagementRate] = React.useState(2.2);
  const [mounthlyExpence, setMounthlyExpence] = React.useState(272);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [mortgageAmount, setMortgageAmount] = React.useState(
    String(Number(propertyPrice) - Number(downPaymentAmount))
  );


  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList };
  }

  const handleFileChange = (e: FileChangeEvent) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary URL for the file
      setPreview(URL.createObjectURL(file));
    }
  };



  const handlePropertyManagementRateChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // Convert the input value to a number (or handle invalid entries as needed)
    setPropertyManagementRate((parseFloat(e.target.value) / calculateGrossMonthlyIncome()) * 100);
  };
  const handleotherRateChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // Convert the input value to a number (or handle invalid entries as needed)
    setOtherRate((parseFloat(e.target.value) / calculateGrossMonthlyIncome()) * 100);
  };
  const handlecleaningRateChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // Convert the input value to a number (or handle invalid entries as needed)
    setCleaningRate((parseFloat(e.target.value) / calculateGrossMonthlyIncome()) * 100);
  };
  const handleinsuranceRateChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // Convert the input value to a number (or handle invalid entries as needed)
    setInsuranceRate((parseFloat(e.target.value) / calculateGrossMonthlyIncome()) * 100);
  };
  const handlewaterRateChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // Convert the input value to a number (or handle invalid entries as needed)
    setWaterRate((parseFloat(e.target.value) / calculateGrossMonthlyIncome()) * 100);
  };
  const handleUtilitiesChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // Convert the input value to a number (or handle invalid entries as needed)
    setUtilities((parseFloat(e.target.value) / calculateGrossMonthlyIncome()) * 100);
  };
  const handleMaintenanceChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // Convert the input value to a number (or handle invalid entries as needed)
    setMonthlyExpensesMaintenance(((parseFloat(e.target.value) / calculateGrossMonthlyIncome()) * 100));
  };
  const handleTaxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // Convert the input value to a number (or handle invalid entries as needed)
    setTaxRate((parseFloat(e.target.value) / calculateGrossMonthlyIncome()) * 100);
  };

  // for the bar calculation



  function handleMounthlyExpence() {
    const total = taxRate + monthlyExpensesMaintenance + utilities + waterRate + insuranceRate + cleaningRate + otherRate + propertyManagementRate;
    const valueofexpence = Math.round((total * calculateGrossMonthlyIncome()) / 100);
    return valueofexpence;
  }
  React.useEffect(() => {
    const price = Number(propertyPrice);
    if (!isNaN(price)) {
      const dpPercent = Number(downPaymentPercent);
      if (!isNaN(dpPercent)) {
        setDownPaymentAmount(String((price * dpPercent) / 100));
      }
      const ccPercent = Number(closingCostPercent);
      if (!isNaN(ccPercent)) {
        setClosingCostAmount(String((price * ccPercent) / 100));
      }
    }
  }, [propertyPrice, downPaymentPercent, closingCostPercent]);

  React.useEffect(() => {
    const dp = Number(downPaymentAmount);
    const cc = Number(closingCostAmount);
    const repairs = Number(repairCost);
    setTotalCapitalRequired(String(dp + cc + repairs));
  }, [downPaymentAmount, closingCostAmount, repairCost]);

  const calculateMortgage = () => {
    const principal = Number(mortgageAmount) - Number(downPaymentAmount);
    const monthlyRate = Number(interestRate) / 100 / 12;
    const numberOfPayments = Number(loanTerm) * 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return isNaN(monthlyPayment) ? 0 : monthlyPayment;
  };

  const calculateNOI = () => {
    const annualRent = calculateGrossMonthlyIncome() * 12;
    const annualMaintenance = (annualRent * Number(maintenance)) / 100;
    const annualManagement = (annualRent * Number(propertyManagement)) / 100;
    const annualExpenses = annualMaintenance + annualManagement + Number(propertyTax) + Number(insurance);
    const annualMortgage = calculateMortgage() * 12;
    return annualRent - annualExpenses - annualMortgage;
  };

  const calculateTotalMonthlyRent = () => {
    const units = [
      propertyUnit1, propertyUnit2, propertyUnit3, propertyUnit4, propertyUnit5,
      propertyUnit6, propertyUnit7, propertyUnit8, propertyUnit9, propertyUnit10
    ];
    return units.reduce((sum, unit) => sum + (Number(unit) || 0), 0);
  };

  const calculateGrossMonthlyIncome = () => {
    return calculateTotalMonthlyRent() + (Number(otherIncome) || 0);
  };

  const calculateYearlyIncome = () => {
    return calculateGrossMonthlyIncome() * 12;
  };

  const calculateCapRate = () => {
    const annualRent = calculateGrossMonthlyIncome() * 12;
    const annualMaintenance = (annualRent * Number(maintenance)) / 100;
    const annualManagement = (annualRent * Number(propertyManagement)) / 100;
    const annualExpenses = annualMaintenance + annualManagement + Number(propertyTax) + Number(insurance);
    const operatingIncome = annualRent - annualExpenses;
    return (operatingIncome / Number(propertyPrice)) * 100;
  };

  const calculateCashOnCashReturn = () => {
    const annualMortgagePayments = calculateMortgage() * 12;
    const closingCosts = Number(closingCostAmount);
    const noi = calculateNOI();
    const totalInvestment = Number(downPaymentAmount) + closingCosts;
    return ((noi - annualMortgagePayments) / totalInvestment) * 100;
  };

  const calculateMonthlyCashFlow = () => {
    const monthlyNOI = calculateNOI() / 12;
    const monthlyMortgage = calculateMortgage();
    return monthlyNOI - monthlyMortgage;
  };

  const checkOnePercentRule = () => {
    return Number(monthlyRent) >= Number(propertyPrice) * 0.01;
  };

  const checkFiftyPercentRule = () => {
    const monthlyIncome = calculateGrossMonthlyIncome();
    const monthlyExpenses = Number(propertyTax) / 12 +
      Number(insurance) / 12 +
      (Number(monthlyRent) * Number(maintenance)) / 100 +
      (Number(monthlyRent) * Number(propertyManagement)) / 100;
    return monthlyExpenses <= monthlyIncome * 0.5;
  };

  const calculateAmortizationSchedule = () => {
    const monthlyPayment = calculateMortgage();
    const principal = Number(mortgageAmount) - Number(downPaymentAmount);
    const monthlyRate = Number(interestRate) / 100 / 12;
    const years = Number(loanTerm);

    let balance = principal;
    const yearlySchedule: AmortizationRowProps[] = [];
    const monthlySchedule: Array<{
      period: number;
      payment: number;
      principal: number;
      interest: number;
      balance: number;
    }> = [];

    for (let year = 1; year <= years; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;

      for (let month = 1; month <= 12; month++) {
        const interest = balance * monthlyRate;
        const principalPayment = monthlyPayment - interest;

        monthlySchedule.push({
          period: (year - 1) * 12 + month,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interest,
          balance: Math.max(0, balance - principalPayment)
        });

        yearlyPrincipal += principalPayment;
        yearlyInterest += interest;
        balance -= principalPayment;
      }

      yearlySchedule.push({
        year,
        payment: monthlyPayment * 12,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        balance: Math.max(0, balance),
      });
    }

    return { yearlySchedule, monthlySchedule };
  };
  interface EquityProjection {
    year: number;
    propertyValue: number;
    totalEquity: number;
    equityFromAppreciation: number;
    equityFromPaydown: number;
  }


  const calculateEquityProjections = () => {
    const price = Number(propertyPrice);
    const initialEquity = Number(downPaymentAmount) || 0;
    const appreciation = Number(appreciationRate) / 100 || 0.04; // Default to 4% if not set
    const mortgagePayment = calculateMortgage();
    const loanAmount = price - initialEquity;
    const monthlyRate = Number(interestRate) / 100 / 12;

    // Calculate loan balance for each year
    const calculateLoanBalance = (year: number) => {
      let balance = loanAmount;
      const totalPayments = year * 12;

      for (let i = 0; i < totalPayments; i++) {
        const interest = balance * monthlyRate;
        const principal = mortgagePayment - interest;
        balance = Math.max(0, balance - principal);
      }

      return balance;
    };

    return Array.from({ length: 30 }, (_, i) => {
      const year = i;
      const propertyValue = price * Math.pow(1 + appreciation, year);
      const remainingLoan = calculateLoanBalance(year);
      const totalEquity = propertyValue - remainingLoan;
      const equityFromAppreciation = propertyValue - price;
      const equityFromPaydown = initialEquity + (price - remainingLoan);

      return {
        year,
        propertyValue,
        totalEquity,
        equityFromAppreciation,
        equityFromPaydown,
      };
    });
  };
  // Example: find the larger of the two
  const yearlyIncome = calculateYearlyIncome();
  const yearlyExpenses = handleMounthlyExpence() * 12 + Number(calculateMortgage().toFixed(2)) * 12;
  const rawMax = Math.max(yearlyIncome, yearlyExpenses);

  // OPTIONAL: create a function to round up to the nearest 50k (or any step you want)
  function getNiceMaxValue(value: number) {
    const roundingFactor = 50000; // round up to the nearest 50k
    return Math.ceil(value / roundingFactor) * roundingFactor;
  }

  // Now compute the final max.  Add a bit of headroom if you want:
  const dynamicMax = getNiceMaxValue(rawMax * 1.1); // 10% buffer

  const monthlyMaintenanceCost = (monthlyExpensesMaintenance * calculateGrossMonthlyIncome()) / 100;
  const monthlyTaxCost = (taxRate * calculateGrossMonthlyIncome()) / 100;
  const monthlyUtilitiesCost = (utilities * calculateGrossMonthlyIncome()) / 100;
  const monthlyWaterCost = (waterRate * calculateGrossMonthlyIncome()) / 100;
  const monthlyInsuranceCost = (insuranceRate * calculateGrossMonthlyIncome()) / 100;
  const monthlyCleaningCost = (cleaningRate * calculateGrossMonthlyIncome()) / 100;
  const monthlyOtherCost = (otherRate * calculateGrossMonthlyIncome()) / 100;
  const monthlyPropertyMgmtCost = (propertyManagementRate * calculateGrossMonthlyIncome()) / 100;


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Home className="w-12 h-12 text-blue-600" />
            <Calculator className="w-8 h-8 text-blue-400 -ml-4" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Real Estate Investment Calculator</h1>
          <p className="text-lg text-gray-600">
            Calculate key metrics for your real estate investment
          </p>
        </div>

        <div className="flex space-x-4 mb-8">
          <Tab
            icon={<Calculator className="w-5 h-5" />}
            label="Investment Analysis"
            isActive={activeTab === 0}
            onClick={() => setActiveTab(0)}
          />
          <Tab
            icon={<Table className="w-5 h-5" />}
            label="Amortization Schedule"
            isActive={activeTab === 1}
            onClick={() => setActiveTab(1)}
          />
          <Tab
            icon={<ChartLine className="w-5 h-5" />}
            label="Equity Projections"
            isActive={activeTab === 2}
            onClick={() => setActiveTab(2)}
          />
        </div>

        {activeTab === 0 && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Purchase Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CalculatorInput
                      label="Purchase Price of Property"
                      value={propertyPrice}
                      onChange={setPropertyPrice}
                      prefix="$"
                    />
                    <CalculatorInput
                      label="Downpayment / Deposit %"
                      value={downPaymentPercent}
                      onChange={(value) => {
                        setDownPaymentPercent(value);
                        const percent = Number(value);
                        if (!isNaN(percent)) {
                          setDownPaymentAmount(String((Number(propertyPrice) * percent) / 100));
                        }
                      }}
                      suffix="%"
                    />
                    {/* <CalculatorInput
                      label="Downpayment / Deposit"
                      value={downPaymentAmount}
                      onChange={(value) => {
                        setDownPaymentAmount(value);
                        const amount = Number(value);
                        if (!isNaN(amount)) {
                          setDownPaymentPercent(String((amount / Number(propertyPrice)) * 100));
                        }
                      }}
                      prefix="$"
                    /> */}
                    <CalculatorInput
                      label="Downpayment / Deposit"
                      value={downPaymentAmount}
                      onChange={(value) => {
                        // Update the downpayment amount immediately
                        setDownPaymentAmount(value);
                      }}
                      onBlur={() => {
                        // When the user leaves the field, calculate the percentage based on the current value
                        const amount = Number(downPaymentAmount);
                        if (!isNaN(amount) && Number(propertyPrice) > 0) {
                          // Use 100 as the multiplier for a proper percentage
                          setDownPaymentPercent(String((amount / Number(propertyPrice)) * 100));
                        }
                      }}
                      prefix="$"
                    />
                    <CalculatorInput
                      label="Closing Costs %"
                      value={closingCostPercent}
                      onChange={(value) => {
                        setClosingCostPercent(value);
                        const percent = Number(value);
                        if (!isNaN(percent)) {
                          setClosingCostAmount(String((Number(propertyPrice) * percent) / 100));
                        }
                      }}
                      suffix="%"
                    />
                    <CalculatorInput
                      label="Closing Costs"
                      value={closingCostAmount}
                      onChange={(value) => {
                        setClosingCostAmount(value);
                        const amount = Number(value);
                        if (!isNaN(amount)) {
                          setClosingCostPercent(String((amount / Number(propertyPrice)) * 100));
                        }
                      }}
                      prefix="$"
                    />
                    <CalculatorInput
                      label="Estimated cost of Repairs"
                      value={repairCost}
                      onChange={setRepairCost}
                      prefix="$"
                    />
                    <CalculatorInput
                      label="Total Capital Required"
                      value={totalCapitalRequired}
                      onChange={() => { }}
                      prefix="$"
                      disabled
                    />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Loan Structure</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CalculatorInput
                      label="Mortgage Amount"
                      value={mortgageAmount}
                      onChange={(value) => setMortgageAmount(value)}
                      prefix="$"
                      // Remove the "disabled" attribute so it's editable
                      info="Total loan amount (Purchase Price - Down Payment)"
                    />

                    <CalculatorInput
                      label="Interest Rate"
                      value={interestRate}
                      onChange={setInterestRate}
                      suffix="%"
                      info="Annual interest rate for the mortgage"
                    />
                    <CalculatorInput
                      label="Loan Term"
                      value={loanTerm}
                      onChange={setLoanTerm}
                      suffix="years"
                      info="Length of the mortgage in years"
                    />
                    {/* <CalculatorInput
                      label="Monthly Mortgage Payment"
                      value={String(calculateMortgage().toFixed(2))}
                      onChange={() => { }}
                      prefix="$"
                      disabled
                      info="Principal + Interest payment per month"
                    /> */}
                    <CalculatorInput
                      label="Monthly Mortgage Payment"
                      // value={String(calculateMortgage().toFixed(2))}
                      value={String(calculateMortgage().toFixed(2))}
                      onChange={() => { }}
                      prefix="$"
                      disabled
                      info="Principal + Interest payment per month"
                    />
                    <CalculatorInput
                      label="Loan to Value Ratio (LVR)"
                      value={((Number(mortgageAmount) / Number(propertyPrice)) * 100).toFixed(1)}
                      // value={String(((Number(propertyPrice) - Number(downPaymentAmount)) / Number(propertyPrice) * 100).toFixed(1))}
                      onChange={() => { }}
                      suffix="%"
                      disabled
                      info="Loan amount as a percentage of property value"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Income</h2>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Monthly Rental from Property</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CalculatorInput
                      label="Property/Unit #1"
                      value={propertyUnit1}
                      onChange={setPropertyUnit1}
                      prefix="$"
                    />
                    <CalculatorInput
                      label="Property/Unit #2"
                      value={propertyUnit2}
                      onChange={setPropertyUnit2}
                      prefix="$"
                    />
                    <CalculatorInput
                      label="Property/Unit #3"
                      value={propertyUnit3}
                      onChange={setPropertyUnit3}
                      prefix="$"
                    />
                    <CalculatorInput
                      label="Property/Unit #4"
                      value={propertyUnit4}
                      onChange={setPropertyUnit4}
                      prefix="$"
                    />
                    <CalculatorInput
                      label="Property/Unit #5"
                      value={propertyUnit5}
                      onChange={setPropertyUnit5}
                      prefix="$"
                    />
                    <CalculatorInput
                      label="Property/Unit #6"
                      value={propertyUnit6}
                      onChange={setPropertyUnit6}
                      prefix="$"
                    />
                    <CalculatorInput
                      label="Property/Unit #7"
                      value={propertyUnit7}
                      onChange={setPropertyUnit7}
                      prefix="$"
                    />
                    <CalculatorInput
                      label="Property/Unit #8"
                      value={propertyUnit8}
                      onChange={setPropertyUnit8}
                      prefix="$"
                    />
                    <CalculatorInput
                      label="Property/Unit #9"
                      value={propertyUnit9}
                      onChange={setPropertyUnit9}
                      prefix="$"
                    />
                    <CalculatorInput
                      label="Property/Unit #10"
                      value={propertyUnit10}
                      onChange={setPropertyUnit10}
                      prefix="$"
                    />
                    <CalculatorInput
                      label="Total Rent per month"
                      value={String(calculateTotalMonthlyRent())}
                      onChange={() => { }}
                      prefix="$"
                      disabled
                    />
                    <CalculatorInput
                      label="Other Income from Property"
                      value={otherIncome}
                      onChange={setOtherIncome}
                      prefix="$"
                    />
                    <CalculatorInput
                      label="GROSS Monthly Income"
                      value={String(calculateGrossMonthlyIncome())}
                      onChange={() => { }}
                      prefix="$"
                      disabled
                    />
                    <CalculatorInput
                      label="YEARLY Income"
                      value={String(calculateYearlyIncome())}
                      onChange={() => { }}
                      prefix="$"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* <div className="bg-white rounded-xl pl-[20px] pt-[40px] pb-[20px] shadow-lg pl-1 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly Expenses Overview</h2>
                  <Pie
                    data={{
                      labels: [
                        'Maintenance',
                        'Taxes / Council Rates',
                        'Utilities',
                        'Water Rates',
                        'Insurance',
                        'Cleaning',
                        'Other',
                        'Property Management'
                      ],
                      datasets: [{
                        data: [
                          (Number(monthlyRent) * Number(maintenance)) / 100,
                          Number(propertyTax) / 12,
                          0, // Utilities
                          42, // Water Rates
                          Number(insurance) / 12,
                          0, // Cleaning
                          0, // Other
                          (Number(monthlyRent) * Number(propertyManagement)) / 100
                        ],
                        backgroundColor: [
                          '#FF6384',
                          '#36A2EB',
                          '#FFCE56',
                          '#4BC0C0',
                          '#9966FF',
                          '#FF9F40',
                          '#EA80FC',
                          '#00E676'
                        ]
                      }]
                    }}
                    options={{
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            usePointStyle: true,
                            padding: 20
                          }
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              const value = context.raw as number;
                              return `${context.label}: ${formatCurrency(value)}`;
                            }
                          }
                        }
                      }
                    }}
                  />
                </div> */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl pl-[20px] pt-[40px] pb-[20px] shadow-lg pl-1 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Monthly Expenses Overview
                    </h2>

                    <Pie
                      data={{
                        labels: [
                          'Maintenance',
                          'Taxes / Council Rates',
                          'Utilities',
                          'Water Rates',
                          'Insurance',
                          'Cleaning',
                          'Other',
                          'Property Management'
                        ],
                        datasets: [
                          {
                            data: [
                              monthlyMaintenanceCost,
                              monthlyTaxCost,
                              monthlyUtilitiesCost,
                              monthlyWaterCost,
                              monthlyInsuranceCost,
                              monthlyCleaningCost,
                              monthlyOtherCost,
                              monthlyPropertyMgmtCost
                            ],
                            backgroundColor: [
                              '#FF6384',
                              '#36A2EB',
                              '#FFCE56',
                              '#4BC0C0',
                              '#9966FF',
                              '#FF9F40',
                              '#EA80FC',
                              '#00E676'
                            ]
                          }
                        ]
                      }}
                      options={{
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              usePointStyle: true,
                              padding: 20
                            }
                          },
                          tooltip: {
                            callbacks: {
                              label: (context) => {
                                const value = context.raw as number;
                                return `${context.label}: ${formatCurrency(value)}`;
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>

                  {/* ...rest of your code: the Bar chart, file upload, etc... */}
                </div>

                {/* <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Yearly Income vs Expenses</h2>
                <Bar
                  // height={100} // Set the desired height (in pixels)

                  data={{
                    labels: ['Yearly Comparison'],
                    datasets: [
                      {
                        label: 'Income',
                        data: [calculateYearlyIncome()],
                        backgroundColor: '#4ade80',
                      },
                      {
                        label: 'Expenses (inc. Mortgage)',
                        data: [handleMounthlyExpence() * 12 + (Number(calculateMortgage().toFixed(2)) * 12)], // Using the yearly expenses including mortgage
                        backgroundColor: '#f87171',
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => formatCurrency(Number(value))
                        }
                      }
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const value = context.raw as number;
                            return `${context.dataset.label}: ${formatCurrency(value)}`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div> */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Yearly Income vs Expenses (inc Mortgage)
                  </h2>

                  <div className="w-64 h-[500px] mx-auto">
                    <Bar
                      data={{
                        labels: ['Yearly Comparison'],
                        datasets: [
                          {
                            label: 'Income',
                            data: [calculateYearlyIncome()],
                            backgroundColor: '#4ade80',
                          },
                          {
                            label: 'Expenses (inc. Mortgage)',
                            data: [
                              handleMounthlyExpence() * 12 +
                              Number(calculateMortgage().toFixed(2)) * 12
                            ],
                            backgroundColor: '#facc15',
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            // Dynamic max logic:
                            max: dynamicMax, // see the calculation above
                            ticks: {
                              callback: (value) => formatCurrency(Number(value)),
                            },
                          },
                        },
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                          tooltip: {
                            callbacks: {
                              label: (context) => {
                                const value = context.raw as number;
                                return `${context.dataset.label}: ${formatCurrency(value)}`;
                              },
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>


                {/* <div className="bg-white rounded-xl shadow-lg p-6 flex justify-center items-center">
                <label className="flex flex-col items-center px-6 py-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20L28 8z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path d="M28 8v8h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="mt-2 text-base text-gray-600">Select a file</span>
                  <input type="file" className="hidden" />
                </label>
              </div> */}

                <>
                  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6 justify-center items-center">
                    <h1 className="text-xl font-semibold text-gray-900 mb-6">Insert Property Image Here </h1>
                    <label className="flex flex-col items-center px-6 py-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20L28 8z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M28 8v8h8"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <span className="mt-2 text-base text-gray-600">Select a file</span>
                      <input type="file" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>

                  {/* Image preview */}
                  {preview && (
                    <div className="mt-4 flex justify-center">
                      <img
                        src={preview}
                        alt="Selected Preview"
                        className="max-w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </>

              </div>

              <div className="lg:sticky lg:top-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Metrics</h2>
                  <div className="space-y-4">
                    <ResultCard
                      label="Meet the 50% Rule?"
                      value={checkFiftyPercentRule() ? '✅ Yes' : '❌ No'}
                    />
                    <ResultCard
                      label="Meet the 1% Rule?"
                      value={checkOnePercentRule() ? '✅ Passes' : '❌ Does not pass'}
                    />
                    <h3 className="text-lg font-medium text-gray-700 mt-6 mb-4">Summary</h3>
                    <ResultCard
                      label="Monthly Net Operating Income (NOI)"
                      // value={formatCurrency((calculateGrossMonthlyIncome() * 12 - 
                      //   ((calculateGrossMonthlyIncome() * 12 * Number(maintenance)) / 100) -
                      //   ((calculateGrossMonthlyIncome() * 12 * Number(propertyManagement)) / 100) -
                      //   Number(propertyTax) - Number(insurance)) / 12)}
                      value={
                        calculateGrossMonthlyIncome() - handleMounthlyExpence()
                      }
                    />
                    <ResultCard
                      label="Yearly NOI"
                      // value={formatCurrency(calculateGrossMonthlyIncome() * 12 - 
                      //   ((calculateGrossMonthlyIncome() * 12 * Number(maintenance)) / 100) -
                      //   ((calculateGrossMonthlyIncome() * 12 * Number(propertyManagement)) / 100) -
                      //   Number(propertyTax) - Number(insurance))}
                      value={
                        calculateYearlyIncome() - (handleMounthlyExpence() * 12 + (Number(calculateMortgage().toFixed(2)) * 12))
                      }
                    />
                    <ResultCard
                      label="Cap Rate / GROSS Rental Yield"
                      // value={formatPercent(calculateCapRate())}
                      value={
                        (((calculateYearlyIncome() / Number(propertyPrice)) * 100).toFixed(2)) + '%'
                      }
                    />
                    <ResultCard
                      label="Cash on Cash Return (Yr 1)"
                      value={
                        <input
                          type="text"
                          value={cashOnCashReturn}
                          onChange={(e) => setCashOnCashReturn(e.target.value)}
                          className="w-full bg-transparent text-xl font-semibold text-gray-900 focus:outline-none"
                        />
                      }
                    />
                    {/* <ResultCard
                    label="Downpayment / Deposit"
                    value={formatCurrency(Number(downPaymentAmount))}
                  />
                  <ResultCard
                    label="Closing Costs"
                    value={formatCurrency(Number(closingCostAmount))}
                  />
                  <ResultCard
                    label="Estimated cost of Repairs"
                    value={formatCurrency(Number(repairCost))}
                  />
                  <ResultCard
                    label="Monthly Mortgage Payment"
                    value={formatCurrency(calculateMortgage())}
                  />
                  <ResultCard
                    label="Monthly Cash Flow"
                    value={formatCurrency(calculateMonthlyCashFlow())}
                  />
                  <ResultCard
                    label="Net Operating Income (NOI)"
                    value={formatCurrency(calculateNOI())}
                  />
                  <ResultCard
                    label="Capitalization Rate"
                    value={formatPercent(calculateCapRate())}
                  />
                  <ResultCard
                    label="Cash on Cash Return"
                    value={formatPercent(calculateCashOnCashReturn())}
                  /> */}
                    <ResultCard
                      label=""
                      value={<div className="text-lg font-medium text-gray-700">Cash Flow Analysis</div>}
                    />
                    <ResultCard
                      label="TOTAL Cashflow per month"
                      value={(calculateGrossMonthlyIncome() - (calculateMortgage() + handleMounthlyExpence())).toFixed(2)}
                    />
                    <ResultCard
                      label="TOTAL Cashflow per year"
                      value={calculateYearlyIncome() - (handleMounthlyExpence() * 12 + (Number(calculateMortgage().toFixed(2)) * 12))}
                    />
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-700 mb-4">Monthly Expenses</h3>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="font-medium text-gray-600">Item</div>
                        <div className="text-right font-medium text-gray-600">Percentage</div>
                        <div className="text-right font-medium text-gray-600">Amount</div>

                        <div>Maintenance</div>
                        <div className="text-right">{monthlyExpensesMaintenance}%</div>
                        <input type="number" defaultValue={0} className="text-right" onChange={handleMaintenanceChange} />

                        <div>Taxes / Council Rates</div>
                        <div className="text-right">{taxRate}%</div>
                        <input type="number" defaultValue={65} className="text-right" onChange={handleTaxChange} />

                        <div>Utilities</div>
                        <div className="text-right">{utilities}%</div>
                        <input type="number" defaultValue={0} className="text-right" onChange={handleUtilitiesChange} />

                        <div>Water Rates</div>
                        <div className="text-right">{waterRate}%</div>
                        <input type="number" defaultValue={42} className="text-right" onChange={handlewaterRateChange} />

                        <div>Insurance</div>
                        <div className="text-right">{insuranceRate}%</div>
                        <input type="number" defaultValue={100} className="text-right" onChange={handleinsuranceRateChange} />

                        <div>Cleaning</div>
                        <div className="text-right">{cleaningRate}%</div>
                        <input type="number" defaultValue={0} className="text-right" onChange={handlecleaningRateChange} />

                        <div>Other</div>
                        <div className="text-right">{otherRate}%</div>
                        <input type="number" defaultValue={0} className="text-right" onChange={handleotherRateChange} />

                        <div>Property Management</div>
                        <div className="text-right">{propertyManagementRate}%</div>
                        <input type="number" defaultValue={65} className="text-right" onChange={handlePropertyManagementRateChange} />


                        <div className="border-t pt-2 font-medium">Expenses % of Income</div>
                        <div className="border-t pt-2 text-right font-medium">{(((handleMounthlyExpence() * 12) / calculateYearlyIncome()) * 100)}</div>
                        <div className="border-t pt-2 text-right font-medium">{ }</div>

                        <div>Monthly Expenses</div>
                        <div className="text-right"></div>
                        <div className="text-right">{handleMounthlyExpence()}</div>

                        <div>Yearly Expenses</div>
                        <div className="text-right"></div>
                        <div className="text-right">{handleMounthlyExpence() * 12}</div>
                      </div>
                    </div>

                    {/* <div className="mt-6 space-y-4">
                    <ResultCard
                      label="MONTHLY Expenses Excluding Mortgage"
                      value={handleMounthlyExpence()}
                    />
                    <ResultCard
                      label="YEARLY Expenses Excluding Mortgage"
                      value={handleMounthlyExpence() * 12}
                    />
                    <ResultCard
                      label="MONTHLY Expenses Inc Mortgage"
                      value={(calculateMortgage() + handleMounthlyExpence()).toFixed(2)}
                    />
                    <ResultCard
                      label="YEARLY Expenses Inc Mortgage"
                      value={handleMounthlyExpence() * 12 + (Number(calculateMortgage().toFixed(2)) * 12)}
                    />
                  </div>
                  <ResultCard
                    label="Total Monthly Expenses"
                    value={formatCurrency(
                      Number(propertyTax) / 12 +
                      Number(insurance) / 12 +
                      (Number(monthlyRent) * Number(maintenance)) / 100 +
                      (Number(monthlyRent) * Number(propertyManagement)) / 100
                    )}
                  /> */}
                  </div>

                </div>

              </div>

            </div>
            <div className="mt-6 flex justify-between bg-white px-6 py-6 rounded-xl ">
              <ResultCard
                label="MONTHLY Expenses Excluding Mortgage"
                value={handleMounthlyExpence()}

              />
              <ResultCard
                label="YEARLY Expenses Excluding Mortgage"
                value={handleMounthlyExpence() * 12}
              />
              <ResultCard
                label="MONTHLY Expenses Inc Mortgage"
                value={(calculateMortgage() + handleMounthlyExpence()).toFixed(2)}
              />
              <ResultCard
                label="YEARLY Expenses Inc Mortgage"
                value={handleMounthlyExpence() * 12 + (Number(calculateMortgage().toFixed(2)) * 12)}
              />
            </div>
            {/* <ResultCard
                    label="Total Monthly Expenses"
                    value={formatCurrency(
                      Number(propertyTax) / 12 +
                      Number(insurance) / 12 +
                      (Number(monthlyRent) * Number(maintenance)) / 100 +
                      (Number(monthlyRent) * Number(propertyManagement)) / 100
                    )}
                  /> */}
          </div>

        )}

        {activeTab === 1 && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Purchase Information</h2>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Loan Structure</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-gray-700 font-medium border border-gray-200">Loan Structure</th>
                          <th className="px-4 py-2 text-right text-gray-700 font-medium border border-gray-200">25 years</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border border-gray-200">Mortgage</td>
                          <td className="px-4 py-2 text-right border border-gray-200">{formatCurrency(Number(mortgageAmount))}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border border-gray-200">Loan Term</td>
                          <td className="px-4 py-2 text-right border border-gray-200">25</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border border-gray-200">Annual Interest Rate</td>
                          <td className="px-4 py-2 text-right border border-gray-200">{interestRate}%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border border-gray-200">Payment Periods per yr</td>
                          <td className="px-4 py-2 text-right border border-gray-200">12</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-gray-700 font-medium border border-gray-200">Loan Structure</th>
                          <th className="px-4 py-2 text-right text-gray-700 font-medium border border-gray-200">30 years</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border border-gray-200">Mortgage</td>
                          <td className="px-4 py-2 text-right border border-gray-200">{formatCurrency(Number(mortgageAmount))}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border border-gray-200">Loan Term</td>
                          <td className="px-4 py-2 text-right border border-gray-200">{loanTerm}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border border-gray-200">Annual Interest Rate</td>
                          <td className="px-4 py-2 text-right border border-gray-200">{interestRate}%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border border-gray-200">Payment Periods per yr</td>
                          <td className="px-4 py-2 text-right border border-gray-200">12</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Amortization Schedule (25 Years)</h3>
                    <div className="flex gap-6">
                      <div className="flex-1 overflow-y-auto max-h-[640px]">
                        <table className="w-full">
                          <thead className="bg-white sticky top-0">
                            <tr>
                              <th className="px-4 py-2 text-sm font-medium text-gray-500">Period</th>
                              <th className="px-4 py-2 text-sm font-medium text-gray-500">Payment</th>
                              <th className="px-4 py-2 text-sm font-medium text-gray-500">Principal</th>
                              <th className="px-4 py-2 text-sm font-medium text-gray-500">Interest</th>
                              <th className="px-4 py-2 text-sm font-medium text-gray-500">Balance</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {(() => {
                              // const numberOfPayments = 360; // 30 years * 12 months
                              const numberOfPayments = 300; // 25 years * 12 months
                              const loanAmount = Number(mortgageAmount) - Number(downPaymentAmount);
                              const monthlyRate = Number(interestRate) / 100 / 12;
                              const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
                              let balance = loanAmount;
                              const rows = [];

                              for (let period = 1; period <= numberOfPayments; period++) {
                                const interest = balance * monthlyRate;
                                const principal = monthlyPayment - interest;
                                balance = Math.max(0, balance - principal);

                                rows.push(
                                  <tr key={period} className="hover:bg-white/50">
                                    <td className="px-4 py-2 text-center">{period}</td>
                                    <td className="px-4 py-2 text-right">{formatCurrency(monthlyPayment)}</td>
                                    <td className="px-4 py-2 text-right">{formatCurrency(principal)}</td>
                                    <td className="px-4 py-2 text-right">{formatCurrency(interest)}</td>
                                    <td className="px-4 py-2 text-right">{formatCurrency(balance)}</td>
                                  </tr>
                                );
                              }

                              return rows;
                            })()}
                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Amortization Schedule (25 Years)</h3>
                    <div className="flex gap-6">

                      <div className="w-full bg-white p-4 rounded-lg flex flex-col justify-between">
                        <h4 className="text-base font-medium text-gray-700 mb-4">Principal vs Interest Distribution (25 Years)</h4>
                        {(() => {
                          const numberOfPayments = 300; // 25 years * 12 months
                          const loanAmount = Number(mortgageAmount) - Number(downPaymentAmount);
                          const monthlyRate = Number(interestRate) / 100 / 12;
                          const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
                          let totalPrincipal = 0;
                          let totalInterest = 0;
                          let balance = loanAmount;

                          for (let period = 1; period <= numberOfPayments; period++) {
                            const interest = balance * monthlyRate;
                            const principal = monthlyPayment - interest;
                            totalPrincipal += principal;
                            totalInterest += interest;
                            balance = Math.max(0, balance - principal);
                          }

                          return (
                            <div>
                              <Pie
                                data={{
                                  labels: ['Principal', 'Interest'],
                                  datasets: [{
                                    data: [totalPrincipal, totalInterest],
                                    backgroundColor: ['#4ade80', '#f87171'],
                                    borderColor: ['#22c55e', '#ef4444'],
                                    borderWidth: 1
                                  }]
                                }}
                                options={{
                                  plugins: {
                                    legend: {
                                      position: 'bottom'
                                    },
                                    tooltip: {
                                      callbacks: {
                                        label: (context) => {
                                          const value = context.raw as number;
                                          return `${context.label}: ${formatCurrency(value)}`;
                                        }
                                      }
                                    }
                                  }
                                }}
                              />
                              <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="text-center whitespace-nowrap">
                                  <div className="text-sm text-gray-500">Total Principal</div>
                                  <div className="font-semibold text-green-600">{formatCurrency(totalPrincipal)}</div>
                                </div>
                                <div className="text-center whitespace-nowrap">
                                  <div className="text-sm text-gray-500">Total Interest</div>
                                  <div className="font-semibold text-red-600">{formatCurrency(totalInterest)}</div>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Amortization Schedule 30 years</h3>
                    <div className="flex gap-6">
                      <div className="flex-1 overflow-y-auto max-h-[640px]">
                        <table className="w-full">
                          <thead className="bg-white sticky top-0">
                            <tr>
                              <th className="px-4 py-2 text-sm font-medium text-gray-500">Period</th>
                              <th className="px-4 py-2 text-sm font-medium text-gray-500">Payment</th>
                              <th className="px-4 py-2 text-sm font-medium text-gray-500">Principal</th>
                              <th className="px-4 py-2 text-sm font-medium text-gray-500">Interest</th>
                              <th className="px-4 py-2 text-sm font-medium text-gray-500">Balance</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {calculateAmortizationSchedule().monthlySchedule.map((row) => (
                              <tr key={row.period} className="hover:bg-white/50">
                                <td className="px-4 py-2 text-center">{row.period}</td>
                                <td className="px-4 py-2 text-right">{formatCurrency(row.payment)}</td>
                                <td className="px-4 py-2 text-right">{formatCurrency(row.principal)}</td>
                                <td className="px-4 py-2 text-right">{formatCurrency(row.interest)}</td>
                                <td className="px-4 py-2 text-right">{formatCurrency(row.balance)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Amortization Schedule 30 years</h3>
                    <div className="flex gap-6">

                      <div className="w-full bg-white p-4 rounded-lg flex flex-col justify-between">
                        <h4 className="text-base font-medium text-gray-700 mb-4">Principal vs Interest Distribution (30 Years)</h4>
                        {(() => {
                          const numberOfPayments = 360; // 30 years * 12 months
                          const loanAmount = Number(mortgageAmount) - Number(downPaymentAmount);
                          const monthlyRate = Number(interestRate) / 100 / 12;
                          const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
                          let totalPrincipal = 0;
                          let totalInterest = 0;
                          let balance = loanAmount;

                          for (let period = 1; period <= numberOfPayments; period++) {
                            const interest = balance * monthlyRate;
                            const principal = monthlyPayment - interest;
                            totalPrincipal += principal;
                            totalInterest += interest;
                            balance = Math.max(0, balance - principal);
                          }

                          return (
                            <div>
                              <Pie
                                data={{
                                  labels: ['Principal', 'Interest'],
                                  datasets: [{
                                    data: [totalPrincipal, totalInterest],
                                    backgroundColor: ['#4ade80', '#f87171'],
                                    borderColor: ['#22c55e', '#ef4444'],
                                    borderWidth: 1
                                  }]
                                }}
                                options={{
                                  plugins: {
                                    legend: {
                                      position: 'bottom'
                                    },
                                    tooltip: {
                                      callbacks: {
                                        label: (context) => {
                                          const value = context.raw as number;
                                          return `${context.label}: ${formatCurrency(value)}`;
                                        }
                                      }
                                    }
                                  }
                                }}
                              />
                              <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="text-center whitespace-nowrap">
                                  <div className="text-sm text-gray-500">Total Principal</div>
                                  <div className="font-semibold text-green-600">{formatCurrency(totalPrincipal)}</div>
                                </div>
                                <div className="text-center whitespace-nowrap">
                                  <div className="text-sm text-gray-500">Total Interest</div>
                                  <div className="font-semibold text-red-600">{formatCurrency(totalInterest)}</div>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900">Amortization Schedule</h2>
                <p className="text-sm text-gray-500 mt-1">Year-by-year breakdown of your mortgage payments</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Year</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Payment</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Principal</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Interest</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {calculateAmortizationSchedule().yearlySchedule.map((row) => (
                    <AmortizationRow key={row.year} {...row} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div>
            <div className="grid grid-cols-3 gap-6">
              {/* First Column - Property Basics */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Basics</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Purchase Price:</span>
                      <span className="font-medium">{formatCurrency(Number(propertyPrice))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Equity at Purchase:</span>
                      <span className="font-medium">{formatCurrency(Number(propertyPrice) - Number(mortgageAmount))}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Mortgage Calculations</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate:</span>
                      <span className="font-medium">{interestRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Downpayment / Deposit:</span>
                      <span className="font-medium">{formatCurrency(Number(downPaymentAmount))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan term (Fixed):</span>
                      <span className="font-medium">{loanTerm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan Amount:</span>
                      <span className="font-medium">{formatCurrency(Number(mortgageAmount))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Payment:</span>
                      <span className="font-medium">{formatCurrency(calculateMortgage())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Payment:</span>
                      <span className="font-medium">{formatCurrency(calculateMortgage() * 12)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Capital Appreciation Summary</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capital Appreciation after 1YR:</span>
                      <span className="font-medium">{formatCurrency(Number(propertyPrice) * Math.pow(1 + Number(appreciationRate) / 100, 1) - Number(propertyPrice))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capital Appreciation 5YR:</span>
                      <span className="font-medium">{formatCurrency(Number(propertyPrice) * Math.pow(1 + Number(appreciationRate) / 100, 5) - Number(propertyPrice))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capital Appreciation 10YR:</span>
                      <span className="font-medium">{formatCurrency(Number(propertyPrice) * Math.pow(1 + Number(appreciationRate) / 100, 10) - Number(propertyPrice))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capital Appreciation 15YR:</span>
                      <span className="font-medium">{formatCurrency(Number(propertyPrice) * Math.pow(1 + Number(appreciationRate) / 100, 15) - Number(propertyPrice))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capital Appreciation 20YR:</span>
                      <span className="font-medium">{formatCurrency(Number(propertyPrice) * Math.pow(1 + Number(appreciationRate) / 100, 20) - Number(propertyPrice))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capital Appreciation 25YR:</span>
                      <span className="font-medium">{formatCurrency(Number(propertyPrice) * Math.pow(1 + Number(appreciationRate) / 100, 25) - Number(propertyPrice))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capital Appreciation 30YR:</span>
                      <span className="font-medium">{formatCurrency(Number(propertyPrice) * Math.pow(1 + Number(appreciationRate) / 100, 30) - Number(propertyPrice))}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Column - Capital Appreciation & Equity Summary */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Capital Appreciation % Annual</h2>
                  <div className="relative w-full max-w-[200px] mx-auto mb-4">
                    <input
                      type="text"
                      value={appreciationRate}
                      onChange={(e) => setAppreciationRate(e.target.value)}
                      className="block w-full text-3xl font-bold text-center text-blue-600 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none py-2"
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl font-bold text-blue-600">%</div>
                  </div>
                  <div className="mt- h-[18rem]">
                    <label className="block text-sm font-medium text-gray-700 mb-2 ">Notes</label>
                    <textarea
                      className="w-full h-32 px-3 py-2 border h-[16rem] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add your notes here..."
                    ></textarea>
                  </div>
                </div>
                <table className="min-w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700 font-medium border border-gray-200">Year</th>
                    <th className="px-4 py-2 text-right text-gray-700 font-medium border border-gray-200">Equity</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 5, 10, 15, 20, 25, 30].map((year) => {
                    // Find the equity projection for this year
                    const eqRow = calculateEquityProjections().find((row) => row.year === year-1);

                    // If no projection is found for this year, skip rendering
                    if (!eqRow) return null;

                    // Get the matching yearly amortization row for the same year
                    const amortizationRow = calculateAmortizationSchedule().yearlySchedule.find(
                      (amRow) => amRow.year === year
                    );

                    // For Year 1, override the property value to the original purchase price
                    const computedPropertyValue =
                      year === 1 ? Number(propertyPrice) : eqRow.propertyValue;

                    // Calculate equity: property value - remaining loan balance
                    const equity =
                      amortizationRow !== undefined
                        ? computedPropertyValue - amortizationRow.balance
                        : 0;

                    return (
                      <tr key={`eq-${year}`} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border border-gray-200 text-center">
                          {`Year ${year}`}
                        </td>
                        <td className="px-4 py-2 border border-gray-200 text-right">
                          {amortizationRow ? formatCurrency(equity) : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              </div>

              {/* Third Column - Graph */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Capital | Equity | Loan Summary</h2>
                <div className="h-[600px]">
                  <Line
                    data={{
                      labels: ['Purchase Date', 'Year 2', 'Year 4', 'Year 6', 'Year 8', 'Year 10', 'Year 12', 'Year 14', 'Year 16', 'Year 18', 'Year 20', 'Year 22', 'Year 24', 'Year 26', 'Year 28', 'Year 30'],
                      datasets: [
                        {
                          label: 'Property Value',
                          data: [73000, 78840, 85147, 91959, 99316, 107261, 115842, 125110, 135119, 145928, 157602, 170211, 183828, 198534, 214417, 236768],
                          borderColor: 'rgb(75, 192, 192)',
                          backgroundColor: 'rgba(75, 192, 192, 0.2)',
                          fill: true
                        },
                        {
                          label: 'Total Loan Amount',
                          data: [73000, 71247, 69273, 67047, 64536, 61703, 58506, 54902, 50842, 46274, 41137, 35360, 28865, 21562, 13347, 0],
                          borderColor: 'rgb(255, 99, 132)',
                          backgroundColor: 'rgba(255, 99, 132, 0.2)',
                          fill: true
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: (value) => '$' + value.toLocaleString()
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Fourth Comom  */}
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Capital Appreciation Summary
              </h2>
              <table className="min-w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700 font-medium border border-gray-200">Year</th>
                    <th className="px-4 py-2 text-right text-gray-700 font-medium border border-gray-200">Property Value</th>
                    <th className="px-4 py-2 text-right text-gray-700 font-medium border border-gray-200">Total Loan Amount</th>
                    <th className="px-4 py-2 text-right text-gray-700 font-medium border border-gray-200">Equity</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Purchase Date Row */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-200 text-center">Purchase Date</td>
                    <td className="px-4 py-2 border border-gray-200 text-right">
                      {formatCurrency(Number(propertyPrice))}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-right">
                      {formatCurrency(Number(mortgageAmount) - Number(downPaymentAmount))}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-right">
                      {formatCurrency(0)}
                    </td>
                  </tr>

                  {calculateEquityProjections().map((eqRow) => {
                    // Get the matching yearly amortization row for the same year
                    const amortizationRow = calculateAmortizationSchedule().yearlySchedule.find(
                      (amRow) => amRow.year === eqRow.year+1
                    );

                    // Override property value for Year 1 to be the original purchase price
                    const computedPropertyValue =
                      eqRow.year === 1 ? Number(propertyPrice) : eqRow.propertyValue;

                    // Calculate equity: computed property value - remaining loan balance
                    const equity =
                      amortizationRow !== undefined
                        ? computedPropertyValue - amortizationRow.balance
                        : 0;

                    return (
                      <tr key={`eq-${eqRow.year+1}`} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border border-gray-200 text-center">{`Year ${eqRow.year+1}`}</td>
                        <td className="px-4 py-2 border border-gray-200 text-right">
                          {formatCurrency(computedPropertyValue)}
                        </td>
                        <td className="px-4 py-2 border border-gray-200 text-right">
                          {amortizationRow ? formatCurrency(amortizationRow.balance) : '-'}
                        </td>
                        <td className="px-4 py-2 border border-gray-200 text-right">
                          {amortizationRow ? formatCurrency(equity) : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              

            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;


