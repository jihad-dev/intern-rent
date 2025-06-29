import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    key: "regular",
    name: "Regular",
    price: 99.99,
    label: "Price for 1-50 unit",
    autoPay: true,
    selected: true,
  },
  {
    key: "platinum",
    name: "Platinum",
    price: 129.99,
    label: "Price for 1-50 unit",
    autoPay: false,
    selected: false,
    oldPrice: 199.99,
  },
  {
    key: "enterprise",
    name: "Enterprize",
    price: 199.99,
    label: "Price for 1-50 unit",
    autoPay: false,
    selected: false,
  },
];

const paymentOptions = [
  {
    id: 1,
    name: "Alex jones(Amex card)",
    card: "******8565",
    selected: true,
  },
  {
    id: 2,
    name: "Alex jones(Amex card)",
    card: "******8565",
    selected: false,
  },
  {
    id: 3,
    name: "Alex jones(Amex card)",
    card: "******8565",
    selected: false,
  },
];

const PlanSelection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-12 py-4 border-b border-[#e0e0e0] bg-white">
        <div className="flex items-center">
         <h2>RentYard Logo</h2>
        </div>
        <Button variant="outline" className="px-6 py-3 rounded-xl font-medium">Save & Exit</Button>
      </header>
      <main className="flex flex-col items-center px-2 py-8">
        <Card className="w-full max-w-6xl border-0 rounded-xl shadow-none bg-[#fafbfc]">
          <CardContent className="p-8">
            <h2 className="font-bold text-xl mb-4">Chose a plan for after 30-days free trial</h2>
            <div className="flex gap-2 mb-6">
              <Button variant="outline" className="rounded-lg px-4 py-2 font-medium text-[#316eed] border-[#316eed] bg-white">Monthly</Button>
              <Button variant="ghost" className="rounded-lg px-4 py-2 font-medium text-gray-500">Annually (save 57%)</Button>
            </div>
            <div className="flex gap-6 mb-8">
              {plans.map((plan) => (
                <div
                  key={plan.key}
                  className={`flex flex-col border ${plan.selected ? "border-[#316eed]" : "border-[#e0e0e0]"} rounded-xl px-8 py-6 bg-white min-w-[260px] relative`}
                >
                  <span className="font-semibold text-lg mb-2">{plan.name}</span>
                  {plan.autoPay && (
                    <span className="absolute top-4 right-4 text-xs bg-[#eaf1ff] text-[#316eed] px-2 py-1 rounded font-medium">Auto Pay</span>
                  )}
                  <div className="flex items-end gap-2 mb-1">
                    {plan.oldPrice && (
                      <span className="text-gray-400 line-through text-lg">${plan.oldPrice}</span>
                    )}
                    <span className="text-3xl font-bold">${plan.price.toFixed(2)}</span>
                    <span className="text-gray-500">/mo</span>
                  </div>
                  <span className="text-xs text-gray-500">{plan.label}</span>
                </div>
              ))}
            </div>
            {/* Payment options */}
            <div className="bg-white rounded-xl border border-[#e0e0e0] p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-base">Payment option</span>
                <Button variant="link" className="text-[#316eed] font-medium p-0 h-auto">Add new card</Button>
              </div>
              <div className="flex flex-col gap-2">
                {paymentOptions.map((opt) => (
                  <div key={opt.id} className="flex items-center justify-between border border-[#e0e0e0] rounded-lg px-4 py-3 bg-white">
                    <span className="text-[#272b35] font-medium">{opt.name} <span className="text-gray-400 ml-2">{opt.card}</span></span>
                    <Button variant={opt.selected ? "default" : "outline"} className="px-6 py-2 rounded-lg font-medium text-sm">Select</Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-12 py-6 bg-white border-t z-10">
        <Button variant="link" className="text-[#272b35] underline p-0 h-auto font-medium" onClick={() => navigate(-1)}>Back</Button>
        <div className="flex items-center gap-6">
          <span className="text-lg font-medium">Total with card charge: <span className="font-bold text-[#316eed]">$970</span></span>
          <Button className="px-8 py-3 rounded-xl bg-[#316eed] text-white font-semibold text-lg">Pay & add property</Button>
        </div>
      </footer>
    </div>
  );
};

export default PlanSelection; 