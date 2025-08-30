import {
  Check,
  Clock,
  Package,
  Truck,
  CheckCircle,
  X,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderProgressStepperProps {
  currentStatus: string;
  isPaid: boolean;
  isDelivered: boolean;
}

const OrderProgressStepper = ({
  currentStatus,
  isPaid,
  isDelivered,
}: OrderProgressStepperProps) => {
  const steps = [
    {
      id: "order placed",
      label: "Order Placed",
      icon: Clock,
      description: "Your order has been placed",
    },
    {
      id: "confirmed",
      label: "Confirmed",
      icon: CheckCircle,
      description: "Order confirmed by merchant",
    },
    {
      id: "processing",
      label: "Processing",
      icon: Package,
      description: "Preparing your order",
    },
    {
      id: "shipped",
      label: "Shipped",
      icon: Truck,
      description: "Order is on the way",
    },
    {
      id: "delivered",
      label: "Delivered",
      icon: Check,
      description: "Order delivered successfully",
    },
    {
      id: "cancelled",
      label: "Cancelled",
      icon: X,
      description: "Order has been cancelled",
    },
    {
      id: "expired",
      label: "Expired",
      icon: AlertTriangle,
      description: "Order has expired",
    },
  ];

  const getStepStatus = (stepId: string, index: number) => {
    // Handle terminal states (cancelled, expired, delivered)
    if (currentStatus === "cancelled" && stepId === "cancelled")
      return "completed";
    if (currentStatus === "expired" && stepId === "expired") return "completed";
    if (isDelivered && stepId === "delivered") return "completed";

    // If order is cancelled or expired, mark previous steps as completed but don't show future steps
    if (currentStatus === "cancelled" || currentStatus === "expired") {
      const currentIndex = steps.findIndex((step) => step.id === currentStatus);
      if (
        index < currentIndex &&
        stepId !== "cancelled" &&
        stepId !== "expired"
      ) {
        return "completed";
      }
      if (stepId === currentStatus) return "current";
      return "disabled";
    }

    if (stepId === currentStatus) return "current";

    const currentIndex = steps.findIndex((step) => step.id === currentStatus);
    const deliveredIndex = steps.findIndex((step) => step.id === "delivered");

    if (isDelivered && index === deliveredIndex) return "completed";
    if (index < currentIndex) return "completed";

    return "upcoming";
  };

  const getVisibleSteps = () => {
    if (currentStatus === "cancelled") {
      return steps.filter(
        (step) =>
          step.id !== "expired" &&
          (step.id === "cancelled" ||
            steps.findIndex((s) => s.id === currentStatus) >=
              steps.findIndex((s) => s.id === step.id))
      );
    }
    if (currentStatus === "expired") {
      return steps.filter(
        (step) =>
          step.id !== "cancelled" &&
          (step.id === "expired" ||
            steps.findIndex((s) => s.id === currentStatus) >=
              steps.findIndex((s) => s.id === step.id))
      );
    }
    // For normal flow, exclude cancelled and expired
    return steps.filter(
      (step) => step.id !== "cancelled" && step.id !== "expired"
    );
  };

  const visibleSteps = getVisibleSteps();

  return (
    <div className="w-full px-2 sm:px-4">
      {/* Progress Line */}
      <div className="flex items-center justify-between relative overflow-x-auto">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-10">
          <div
            className={cn(
              "h-full transition-all duration-500 ease-in-out",
              currentStatus === "cancelled"
                ? "bg-red-500"
                : currentStatus === "expired"
                ? "bg-orange-500"
                : "bg-primary"
            )}
            style={{
              width: `${
                (visibleSteps.findIndex((step) => step.id === currentStatus) /
                  (visibleSteps.length - 1)) *
                100
              }%`,
            }}
          />
        </div>
        {visibleSteps.map((step, index) => {
          const status = getStepStatus(step.id, index);
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative min-w-0 flex-1"
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 flex-shrink-0",
                  status === "completed" &&
                    step.id === "cancelled" &&
                    "bg-red-500 border-red-500 text-white",
                  status === "completed" &&
                    step.id === "expired" &&
                    "bg-orange-500 border-orange-500 text-white",
                  status === "current" &&
                    step.id === "cancelled" &&
                    "bg-red-500 border-red-500 text-white animate-pulse",
                  status === "current" &&
                    step.id === "expired" &&
                    "bg-orange-500 border-orange-500 text-white animate-pulse",
                  status === "completed" &&
                    step.id !== "cancelled" &&
                    step.id !== "expired" &&
                    "dark:bg-secondary bg-primary border-primary text-white",
                  status === "current" &&
                    step.id !== "cancelled" &&
                    step.id !== "expired" &&
                    "dark:bg-secondary bg-primary border-primary text-white animate-pulse",
                  status === "upcoming" &&
                    "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400",
                  status === "disabled" &&
                    "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-300"
                )}
              >
                {status === "completed" ? (
                  <Check className="w-3 h-3 sm:w-5 sm:h-5" />
                ) : (
                  <Icon className="w-3 h-3 sm:w-5 sm:h-5" />
                )}
              </div>

              {/* Step Content */}
              <div className="mt-2 sm:mt-3 text-center px-1">
                <p
                  className={cn(
                    "text-xs sm:text-sm font-medium transition-colors leading-tight",
                    status === "completed" &&
                      step.id === "cancelled" &&
                      "text-red-600",
                    status === "completed" &&
                      step.id === "expired" &&
                      "text-orange-600",
                    status === "current" &&
                      step.id === "cancelled" &&
                      "text-red-600",
                    status === "current" &&
                      step.id === "expired" &&
                      "text-orange-600",
                    (status === "completed" || status === "current") &&
                      step.id !== "cancelled" &&
                      step.id !== "expired"
                      ? "text-primary"
                      : status === "disabled"
                      ? "text-gray-300 dark:text-gray-600"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {step.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 hidden md:block leading-tight">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Summary */}
      <div className="mt-4 p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-gray-600 dark:text-gray-300">
              Status:{" "}
              <span
                className={cn(
                  "font-medium capitalize",
                  currentStatus === "cancelled"
                    ? "text-red-600"
                    : currentStatus === "expired"
                    ? "text-orange-600"
                    : "text-primary"
                )}
              >
                {currentStatus}
              </span>
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              Estimated Delivery:{" "}
              <span
                className={cn(
                  "font-medium",
                  isPaid ? "text-green-600" : "text-orange-600"
                )}
              >
                7 days
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isDelivered &&
              currentStatus !== "cancelled" &&
              currentStatus !== "expired" && (
                <div className="flex items-center gap-1 text-green-600">
                  <Check className="w-4 h-4" />
                  <span className="font-medium">Delivered</span>
                </div>
              )}
            {currentStatus === "cancelled" && (
              <div className="flex items-center gap-1 text-red-600">
                <X className="w-4 h-4" />
                <span className="font-medium">Cancelled</span>
              </div>
            )}
            {currentStatus === "expired" && (
              <div className="flex items-center gap-1 text-orange-600">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium">Expired</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProgressStepper;
